import { Injectable, signal } from '@angular/core';
import { Observable, catchError, map, of } from 'rxjs';

import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Token } from '../models/token.model';
import { Usuario } from '../models/usuario.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly localStorageKey = 'usuario_logado';
  private usuarioSignal = signal<Usuario | null>(null);
  private baseUrl = 'http://localhost:3000/users';

  constructor(private http: HttpClient, private router: Router) {
    const localData = localStorage.getItem(this.localStorageKey);

    if (localData) {
      try {
        this.usuarioSignal.set(JSON.parse(localData));
      } catch {
        this.usuarioSignal.set(null);
      }
    }
  }

  setUsuario(usuario: Usuario) {
    this.usuarioSignal.set(usuario);
    localStorage.setItem(this.localStorageKey, JSON.stringify(usuario));
  }

  getUsuario() {
    return this.usuarioSignal.asReadonly();
  }

  login(email: string, senha: string): Observable<{ erro?: string }> {
    return this.http
      .get<Usuario[]>(`${this.baseUrl}`, { params: { email } })
      .pipe(
        map((users) => {
          const user = users.find(
            (u) => u.email === email && u.senha === senha
          );

          if (user) {
            const expired = new Date();
            expired.setMinutes(2);

            const token: Token = { createdAt: new Date(), expiredAt: expired, userId: user?.email }
            localStorage.setItem("token", JSON.stringify(token))

            this.setUsuario(user);
            this.router.navigate(['/admin/produtos']);
            return {};
          }

          return { erro: 'Usuário ou senha inválidos' };
        }),
        catchError(() => {
          return of({ erro: 'Erro ao tentar fazer login' });
        })
      );
  }

  logout() {
    localStorage.setItem(this.localStorageKey, '');
    return of({ messagem: 'Sessão encerrada com sucesso' });
  }

  isLoggedIn(): boolean {

    const token = localStorage.getItem("token");

    if (!token) {
      return false;
    }

    const tokenParsed: Token = JSON.parse(token)

    const expiredDate = new Date(tokenParsed.expiredAt)

    if (expiredDate.getTime() < new Date().getTime()) {
      return false;
    }

    return this.usuarioSignal() !== null
  }
}
