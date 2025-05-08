import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, map, Observable, of } from 'rxjs';
import { Usuario } from '../models/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticated = false;
  localStorageKey: string = "LOGGED_IN_USER";
  private baseUrl = 'http://localhost:3000/users';


  constructor(private http: HttpClient, private router: Router) { }

  login(email: string, senha: string): Observable<{ erro?: string }> {
    return this.http.get<Usuario[]>(`${this.baseUrl}`, { params: { email } })
      .pipe(
        map(users => {
          const user = users.find(u => u.email === email && u.senha === senha);

          if (user) {
            this.isAuthenticated = true;
            localStorage.setItem(this.localStorageKey, 'true');
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
    this.isAuthenticated = false;
    localStorage.setItem(this.localStorageKey, 'false');
    return of({ messagem: "Sessão encerrada com sucesso" });
  }

  isLoggedIn() {
    const loggedIn = localStorage.getItem(this.localStorageKey);
    if (loggedIn == 'true')
      this.isAuthenticated = true;
    else
      this.isAuthenticated = false;
    return this.isAuthenticated;
  }

}
