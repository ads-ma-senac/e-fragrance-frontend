import {Component, Input, OnInit} from '@angular/core';
import {ItemCarrinho} from '@core/models/item-carrinho';
import {CurrencyPipe, NgOptimizedImage} from '@angular/common';
import {InputCounterComponent} from '@shared/components/input-counter/input-counter.component';
import {CarrinhoService} from '@core/services/carrinho.service';

@Component({
  selector: 'app-item-carrinho',
  imports: [
    CurrencyPipe,
    NgOptimizedImage,
    InputCounterComponent
  ],
  templateUrl: './item-carrinho.component.html',
  styleUrl: './item-carrinho.component.css'
})
export class ItemCarrinhoComponent implements OnInit {
  @Input() item!: ItemCarrinho
  imgSrc = '';

  constructor(private carrinhoService: CarrinhoService) {
  }

  ngOnInit() {
    if (typeof this.item.imagem === 'string') {
      this.imgSrc = this.item.imagem.startsWith('data:image')
        ? this.item.imagem
        : `http://localhost:3000${this.item.imagem}`;
    }
  }

  handleChangeQtd(value: number) {
    if( value > 0 ) {
      this.item.quantidade = value;
      this.carrinhoService.atualizarQuantidade(value, this.item.id)
    } else {
      this.carrinhoService.removerDoCarrinho(this.item.id)
    }
  }

  removeItem() {
    this.carrinhoService.removerDoCarrinho(this.item.id)
  }
}
