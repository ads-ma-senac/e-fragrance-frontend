import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { FooterComponent } from '../../../shared/components/footer/footer.component';
import { HeaderComponent } from '../../../shared/components/header/header.component';
import { HeroComponent } from '../../../shared/components/hero/hero.component';
import { Produto } from './../../../core/models/produto.model';
import { ProdutoService } from './../../../core/services/produto.service';
import { CardComponent } from './components/card/card.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    HeaderComponent,
    HeroComponent,
    FooterComponent,
    CardComponent,
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  perfumes: Produto[] = [];

  constructor(private produtoService: ProdutoService) {
    this.produtoService.listar(0, 100).subscribe((produtos) => {
      this.perfumes = produtos.data;
    });
  }

}