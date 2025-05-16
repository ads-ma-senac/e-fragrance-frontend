import { Component, Input, input } from '@angular/core';

import { Produto } from '../../../../../core/models/produto.model';

@Component({
  selector: 'app-card',
  imports: [],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css',
})
export class CardComponent {
  @Input() produto!: Produto;
  shoppingBagIcon = 'assets/icons/shopping-bag.svg';
}
