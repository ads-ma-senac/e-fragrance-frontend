import { Injectable, computed, signal } from '@angular/core';
import { ItemCarrinho } from '../models/item-carrinho';
import { Produto } from '../models/produto.model';



@Injectable({
  providedIn: 'root'
})
export class CarrinhoService {

  private _items = signal<ItemCarrinho[]>([]);
  private _carrinhoAberto = signal<boolean>(false);

  readonly items = this._items.asReadonly();
  readonly carrinhoAberto = this._carrinhoAberto.asReadonly();

  adicionarAoCarrinho(produto: Produto): void {
    const itemsAtual = this._items();
    const itemExistente = itemsAtual.find(item => item.id === produto.id);

    if (itemExistente) {
      this.atualizarQuantidade(produto.id, itemExistente.quantidade + 1);
    } else {
      this._items.set([...itemsAtual, { ...produto, quantidade: 1 }]);
    }

    this.abrirCarrinho();
  }

  removerDoCarrinho(produtoId: number): void {
    const itemsAtualizados = this._items().filter(item => item.id !== produtoId);
    this._items.set(itemsAtualizados);
  }

  atualizarQuantidade(produtoId: number, novaQuantidade: number): void {
    const itemsAtualizados = this._items()
      .map(item =>
        item.id === produtoId ? { ...item, quantidade: novaQuantidade } : item
      )
      .filter(item => item.quantidade > 0);

    this._items.set(itemsAtualizados);
  }

  abrirCarrinho(): void {
    this._carrinhoAberto.set(true);
  }

  fecharCarrinho(): void {
    this._carrinhoAberto.set(false);
  }

  public limparSacola(): void {
    this._items.set([])
  }

  toggleCarrinho(): void {
    this._carrinhoAberto.set(!this._carrinhoAberto());
  }

  totalItems = computed(() =>
    this._items().reduce((total, item) => total + item.quantidade, 0)
  );

  precoTotal = computed(() =>
    this._items().reduce((total, item) => total + item.precoUnidade * item.quantidade, 0)
  );
}
