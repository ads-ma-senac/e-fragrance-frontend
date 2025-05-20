import {Injectable, computed, signal} from '@angular/core';
import {ItemCarrinho} from '@core/models/item-carrinho';
import {Produto} from '@core/models/produto.model';


@Injectable({
  providedIn: 'root'
})
export class CarrinhoService {
  private readonly localStorageKey = 'shoppingCartItems';
  private _items = signal<ItemCarrinho[]>([]);
  private _carrinhoAberto = signal<boolean>(false);

  readonly items = this._items.asReadonly();
  readonly carrinhoAberto = this._carrinhoAberto.asReadonly();

  constructor() {
    this._items.set(this.loadItemsFromLocalStorage());
  }

  adicionarAoCarrinho(produto: Produto): void {
    const itemsAtual = this._items();
    const itemExistente = itemsAtual.find(item => item.id === produto.id);

    if (itemExistente) {
      this.atualizarQuantidade(produto.id, itemExistente.quantidade + 1);
    } else {
      this._items.set([...itemsAtual, {...produto, quantidade: 1}]);
    }

    this.saveItemsToLocalStorage();

    this.abrirCarrinho();
  }

  removerDoCarrinho(produtoId: number): void {
    const itemsAtualizados = this._items().filter(item => item.id !== produtoId);
    this._items.set(itemsAtualizados);
    this.saveItemsToLocalStorage();
  }

  atualizarQuantidade(produtoId: number, novaQuantidade: number): void {
    const itemsAtualizados = this._items()
      .map(item =>
        item.id === produtoId ? {...item, quantidade: novaQuantidade} : item
      )
      .filter(item => item.quantidade > 0);

    this._items.set(itemsAtualizados);
    this.saveItemsToLocalStorage();
  }

  abrirCarrinho(): void {
    this._carrinhoAberto.set(true);
  }

  fecharCarrinho(): void {
    this._carrinhoAberto.set(false);
  }

  public limparSacola(): void {
    this._items.set([])
    this.saveItemsToLocalStorage();
  }

  toggleCarrinho(): void {
    this._carrinhoAberto.set(!this._carrinhoAberto());
  }

  carrinhoVazio(): boolean {
    return this._items().length === 0;
  }

  totalItems = computed(() =>
    this._items().reduce((total, item) => total + item.quantidade, 0)
  );

  precoTotal = computed(() =>
    this._items().reduce((total, item) => total + item.precoUnidade * item.quantidade, 0)
  );

  private saveItemsToLocalStorage(): void {
    const items = this._items();
    const serialized = JSON.stringify(items);
    localStorage.setItem(this.localStorageKey, serialized);
  }

  private loadItemsFromLocalStorage(): ItemCarrinho[] {
    const localData = localStorage.getItem(this.localStorageKey);

    if (!localData) {
      return [];
    }

    try {
      const parsed = JSON.parse(localData);
      if (Array.isArray(parsed)) {
        return parsed as ItemCarrinho[];
      }
      return [];
    } catch (error) {
      console.error('Erro ao ler dados do localStorage:', error);
      return [];
    }
  }

}
