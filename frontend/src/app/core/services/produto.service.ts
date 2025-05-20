import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable, from, map, switchMap} from 'rxjs';

import {Injectable} from '@angular/core';
import {Produto} from '@core/models/produto.model';

@Injectable({
  providedIn: 'root',
})
export class ProdutoService {
  private baseUrl = 'http://localhost:3000/products';

  constructor(private http: HttpClient) {
  }

  listar(
    pageIndex: number = 0,
    pageSize: number = 5,
    filtro: string = ''
  ): Observable<{ data: Produto[]; total: number }> {
    const params = new HttpParams()
      .set('_page', pageIndex + 1)
      .set('_limit', pageSize)
      .set('nome_like', filtro);

    return this.http
      .get<Produto[]>(`${this.baseUrl}`, {
        params,
        observe: 'response',
      })
      .pipe(
        map((res) => ({
          data: res.body ?? [],
          total: Number(res.headers.get('x-total-count') ?? 0),
        }))
      );
  }

  buscarPorId(id: number): Observable<Produto> {
    return this.http.get<Produto>(`${this.baseUrl}/${id}`);
  }

  cadastrar(produtoData: any): Observable<Produto> {
    return from(this.convertFileToBase64(produtoData.imagem)).pipe(
      switchMap((imagemBase64) => {
        const id = Date.now();
        const novoProduto: Produto = {
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
          descricao: produtoData.descricao,
          imagem: imagemBase64,
          criadoEm: new Date().toISOString(),
          atualizadoEm: new Date().toISOString(),
        };

        return this.http.post<Produto>(this.baseUrl, novoProduto);
      })
    );
  }

  excluir(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }

  atualizar(id: number, produtoData: Produto): Observable<any> {
    return from(this.convertFileToBase64(produtoData.imagem as File)).pipe(
      switchMap((imagemBase64) => {
        const novoProduto: Produto = {
          id: produtoData.id,
          sku: produtoData.sku,
          nome: produtoData.nome,
          marca: produtoData.marca,
          genero: produtoData.genero,
          categoria: produtoData.categoria,
          volume: produtoData.volume,
          precoUnidade: produtoData.precoUnidade,
          unidadeEmEstoque: produtoData.unidadeEmEstoque,
          concentracao: produtoData.concentracao,
          descricao: produtoData.descricao,
          imagem: imagemBase64,
          criadoEm: new Date().toISOString(),
          atualizadoEm: new Date().toISOString(),
        };

        return this.http.put(`${this.baseUrl}/${id}`, novoProduto);
      })
    );
  }

  private convertFileToBase64(file: File): Promise<string> {
    if (typeof file === 'string') {
      return new Promise((resolve) => resolve(file));
    } else if (file instanceof File && file.type.startsWith('image/')) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = (err) => reject(err);
        reader.readAsDataURL(file);
      });
    } else {
      return Promise.reject('Arquivo inválido');
    }
  }
}
