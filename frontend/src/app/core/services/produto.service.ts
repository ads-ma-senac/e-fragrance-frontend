import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {Produto} from '../models/produto.model';

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {
  private baseUrl = 'http://localhost:3000/produtos';

  constructor(private http: HttpClient) {}

  buscarPorId(id: number): Observable<Produto> {
    return this.http.get<Produto>(`http://localhost:3000/products/${id}`);
  }

  atualizar(id: number, produto: Produto): Observable<any> {
    return this.http.put(`${this.baseUrl}/${id}`, produto);
  }
}
