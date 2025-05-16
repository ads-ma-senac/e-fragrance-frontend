import { Component, Input, OnInit } from '@angular/core';

import { Produto } from '../../../../../core/models/produto.model';

@Component({
  selector: 'app-card',
  imports: [],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css',
})
export class CardComponent implements OnInit {
  @Input() produto!: Produto;
  shoppingBagIcon = 'assets/icons/shopping-bag.svg';
  imgSrc = '';

  ngOnInit() {
    if (typeof this.produto.imagem === 'string') {
      this.imgSrc = this.produto.imagem.startsWith('data:image')
        ? this.produto.imagem
        : `http://localhost:3000${this.produto.imagem}`;
    }
  }
}
