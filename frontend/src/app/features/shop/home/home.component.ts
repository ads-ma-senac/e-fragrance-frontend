import { Produto } from './../../../core/models/produto.model';
import { ProdutoService } from './../../../core/services/produto.service';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
// Update the path below if the actual location is different
import { HeaderComponent } from '../../../shared/components/header/header.component';
import { HeroComponent } from '../../../shared/components/hero/hero.component';
import { FooterComponent } from '../../../shared/components/footer/footer.component';

@Component({
  selector: 'app-home',
   standalone: true,
  imports: [CommonModule,
    MatCardModule,
    MatButtonModule,
    HeaderComponent,
    HeroComponent,
    FooterComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  perfumes : Produto[] = [];

  constructor(private produtoService: ProdutoService) {
    this.produtoService.listar().subscribe((produtos) => {
      this.perfumes = produtos;
    });
  }

}
