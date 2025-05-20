import { Component, Input, OnInit } from '@angular/core';

import { MatDialog } from '@angular/material/dialog';
import { Produto } from '@core/models/produto.model';
import { CarrinhoService } from '@core/services/carrinho.service';
import { CarrinhoComponent } from '../carrinho/carrinho.component';
import {NgOptimizedImage} from '@angular/common';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  imports: [NgOptimizedImage],
  styleUrl: './card.component.css',
})
export class CardComponent implements OnInit {
  @Input() produto!: Produto;
  shoppingBagIcon = 'assets/icons/shopping-bag.svg';
  imgSrc = '';

  constructor(private carrinhoService: CarrinhoService, private dialog: MatDialog) { }



  getDescription() {
    if (this.produto.descricao.length > 100) {
      return this.produto.descricao.substring(0, 100) + '...';
    }
    return this.produto.descricao;
  }


  ngOnInit() {
    if (typeof this.produto.imagem === 'string') {
      this.imgSrc = this.produto.imagem.startsWith('data:image')
        ? this.produto.imagem
        : `http://localhost:3000${this.produto.imagem}`;
    }
  }

  openSidebar() {
    this.dialog.open(CarrinhoComponent, {
      panelClass: 'sidebar-dialog-panel',
      position: {right: '0'},
      height: '100vh',
      width: '350px',
      autoFocus: false,
      hasBackdrop: true
    });
  }

  adicionarAoCarrinho() {
    this.carrinhoService.adicionarAoCarrinho(this.produto)
    this.openSidebar()
  }
}
