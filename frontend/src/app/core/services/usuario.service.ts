import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Usuario} from '@core/models/usuario.model';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  private baseUrl = 'http://localhost:3000/users';

  constructor(private http: HttpClient) {
  }

  buscarPorId(id: number): Observable<Usuario> {
    return this.http.get<Usuario>(`${this.baseUrl}/${id}`);
  }
}
