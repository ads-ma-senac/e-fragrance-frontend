import {NgOptimizedImage} from '@angular/common';
import {Component} from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatToolbarModule} from '@angular/material/toolbar';
import {CarrinhoService} from '@core/services/carrinho.service';
import {MatDialog} from '@angular/material/dialog';
import {CarrinhoComponent} from '@features/shop/home/components/carrinho/carrinho.component';
import {MatAnchor} from '@angular/material/button';
import {MatBadgeModule} from '@angular/material/badge';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MatToolbarModule, MatIconModule, NgOptimizedImage, MatAnchor, MatBadgeModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  fragranceUrl = 'assets/icons/fragrance.svg';
  searchIcon = 'assets/icons/search.svg';
  shoppingBagIcon = 'assets/icons/shopping-bag.svg';
  userIcon = 'assets/icons/user.svg';

  constructor(private dialog: MatDialog, private carrinhoService: CarrinhoService) {
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

  toggleBadgeVisibility() {
    return this.carrinhoService.carrinhoVazio()
  }

  mostrarSacola() {
    this.openSidebar();
  }

  totalDeItensNoCarrinho() {
    return this.carrinhoService.totalItems()
  }
}
