import { Component } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Produto } from '../../shared/types/produto';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { DeleteConfirmationDialogComponent } from '../../shared/delete/delete-confirmation-dialog/delete-confirmation-dialog.component';
import { RouterLink } from '@angular/router';

const produtos: Produto[] = [
  {
    "id": 1,
    "sku": "CRE-AVE-100M",
    "nome": "Carbon",
    "marca": "Eudora",
    "genero": "masculino",
    "categoria": 1,
    "volume": 100,
    "precoUnidade": 150.0,
    "unidadeEmEstoque": 10,
    "concentracao": "Eau de Parfum",
    "descricaodescription": "Carbon Turbo de Eudora é um perfume Amadeirado Masculino. Carbon Turbo foi lançada em 2014. Carbon Turbo foi criado por Francisco Marano e Veronica Casanova. As notas de topo são: Tomilho, Hortelã, Cardamomo, Sálvia e Maçã. As notas de coração são: Cedro, Violeta, Lavanda e Noz-moscada. As notas de fundo são: Âmbar, Couro, Baunilha e Segredo Eudora.",
    "imagens": [
      {
        "id": 1,
        "imagem": ""
      }
    ],
    "criadoEm": "2025-04-24T21:38:39.108Z",
    "atualizadoEm": "2025-04-24T21:38:39.108Z"
  },
  {
    "id": 1,
    "sku": "CRE-AVE-100M",
    "nome": "Carbon",
    "marca": "Eudora",
    "genero": "masculino",
    "categoria": 1,
    "volume": 100,
    "precoUnidade": 150.0,
    "unidadeEmEstoque": 10,
    "concentracao": "Eau de Parfum",
    "descricaodescription": "Carbon Turbo de Eudora é um perfume Amadeirado Masculino. Carbon Turbo foi lançada em 2014. Carbon Turbo foi criado por Francisco Marano e Veronica Casanova. As notas de topo são: Tomilho, Hortelã, Cardamomo, Sálvia e Maçã. As notas de coração são: Cedro, Violeta, Lavanda e Noz-moscada. As notas de fundo são: Âmbar, Couro, Baunilha e Segredo Eudora.",
    "imagens": [
      {
        "id": 1,
        "imagem": ""
      }
    ],
    "criadoEm": "2025-04-24T21:38:39.108Z",
    "atualizadoEm": "2025-04-24T21:38:39.108Z"
  }
]

@Component({
  selector: 'app-listagem-produtos',
  imports: [MatTableModule,MatPaginatorModule, MatIconModule, MatButtonModule, MatFormFieldModule,MatInputModule, CommonModule, MatDialogModule, RouterLink],
  templateUrl: './listagem-produtos.component.html',
  styleUrl: './listagem-produtos.component.css'
})

export class ListagemProdutosComponent {

  getHeader(coluna: string): string {
    return this.columns.find(c => c.columnDef === coluna)?.header || coluna;
  }

  // displayedColumns: string[] = ['nome', 'marca', 'genero', 'precoUnidade', 'unidadeEmEstoque', 'criadoEm']
  columns = [
    { columnDef: 'nome', header: 'Nome' },
    { columnDef: 'marca', header: 'Marca' },
    { columnDef: 'genero', header: 'Categoria' },
    { columnDef: 'precoUnidade', header: 'Preço' },
    { columnDef: 'unidadeEmEstoque', header: 'Estoque' },
    { columnDef: 'criadoEm', header: 'Data de Cadastro' },
    { columnDef: 'acoes', header: ' ' },
  ];
  
  displayedColumns = [...this.columns.map(c => c.columnDef)];
  
  dataSource = produtos;

  constructor(private dialog: MatDialog) {}

  editarProduto(produto: Produto) {
    console.log('Editar produto:', produto);
  }
  
  deletarProduto(produto: Produto) {
    this.openDeleteDialog(produto);
  }

  openDeleteDialog(produto: Produto) {
    const dialogReferencia = this.dialog.open(DeleteConfirmationDialogComponent, {
      data: {nome: produto.nome}, width: '480px',
    });
  }
  
}
