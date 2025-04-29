import { Component } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';


@Component({
  selector: 'app-listagem-produtos',
  imports: [MatTableModule,MatPaginatorModule, MatIconModule, MatButtonModule, MatFormFieldModule,MatInputModule],
  templateUrl: './listagem-produtos.component.html',
  styleUrl: './listagem-produtos.component.css'
})
export class ListagemProdutosComponent {

}
