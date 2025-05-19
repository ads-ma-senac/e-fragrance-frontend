import { Component, Input } from '@angular/core';
import { ItemCarrinho } from '../../../../../core/models/item-carrinho';

@Component({
  selector: 'app-item-carrinho',
  imports: [],
  templateUrl: './item-carrinho.component.html',
  styleUrl: './item-carrinho.component.css'
})
export class ItemCarrinhoComponent {
  @Input() item!: ItemCarrinho

}
