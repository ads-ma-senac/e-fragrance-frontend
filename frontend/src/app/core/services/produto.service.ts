import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {Produto} from '../models/produto.model';

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {
  private baseUrl = 'http://localhost:3000/products';

  constructor(private http: HttpClient) {}

  listar(): Observable<Produto[]>{
    return this.http.get<Produto[]>(this.baseUrl);
  }

  buscarPorId(id: number): Observable<Produto> {
    return this.http.get<Produto>(`${this.baseUrl}/${id}`);
  }

  cadastrar(produtoData: any): Observable<Produto> {
    const id = Date.now().toString();

    const novoProduto = {
      id: id,
      sku: `SKU-${Date.now()}`, 
      nome: produtoData.nome,
      marca: produtoData.marca,
      genero: produtoData.genero,
      categoria: produtoData.categoria,
      volume: produtoData.volume,
      precoUnidade: produtoData.preco, 
      unidadeEmEstoque: produtoData.estoque, 
      concentracao: produtoData.concentracao,
      descricaodescription: produtoData.descricao, 
      imagens: [], 
      criadoEm: new Date().toISOString(), 
      atualizadoEm: new Date().toISOString() 
    };
    
    return this.http.post<Produto>(this.baseUrl, novoProduto);
  }

  excluir(id: number): Observable<any>{
    return this.http.delete(`${this.baseUrl}/${id}`);
  }

  atualizar(id: number, produto: Produto): Observable<any> {
    return this.http.put(`${this.baseUrl}/${id}`, produto);
  }
}
