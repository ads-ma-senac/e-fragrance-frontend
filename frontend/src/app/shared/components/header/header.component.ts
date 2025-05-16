import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MatToolbarModule, MatIconModule, NgOptimizedImage],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  fragranceUrl = 'assets/icons/fragrance.svg';
  searchIcon = 'assets/icons/search.svg';
  shoppingBagIcon = 'assets/icons/shopping-bag.svg';
  userIcon = 'assets/icons/user.svg';
  starIcon = 'assets/icons/star.svg';
}
