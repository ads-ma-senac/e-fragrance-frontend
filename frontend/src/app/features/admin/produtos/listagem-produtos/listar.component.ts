import { Component, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { DeleteConfirmationDialogComponent } from './components/delete-confirmation-dialog/delete-confirmation-dialog.component';
import { RouterLink } from '@angular/router';
import {Produto} from '../../../../core/models/produto.model';
import { ProdutoService } from '../../../../core/services/produto.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-listagem-produtos',
  imports: [MatTableModule,MatPaginatorModule, MatIconModule, MatButtonModule, MatFormFieldModule,MatInputModule, CommonModule, MatDialogModule, RouterLink, FormsModule],
  templateUrl: './listar.component.html',
  styleUrl: './listar.component.css'
})

export class ListarComponent {

  getHeader(coluna: string): string {
    return this.columns.find(c => c.columnDef === coluna)?.header || coluna;
  }

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

  filtro: string = ''
  // dataSource: Produto[] = [];

  dataSource = new MatTableDataSource<Produto>();
  

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private dialog: MatDialog, private produtoService: ProdutoService) {}

  ngOnInit(){
    console.log('ListarComponent carregado');
    this.carregarProdutos();
  }

  carregarProdutos() {
    this.produtoService.listar().subscribe(produtos => {
      console.log('Produtos recebidos:', produtos);
      this.dataSource.data = produtos;
      this.dataSource.paginator = this.paginator;
    })
  }

  editarProduto(produto: Produto) {
    console.log('Editar produto:', produto);
  }

  deletarProduto(produto: Produto) {
    const dialogRef = this.dialog.open(DeleteConfirmationDialogComponent, {
      data: { nome: produto.nome},
      width: '490px',
    });

    dialogRef.afterClosed().subscribe(confirmado => {
      if (confirmado) {
        this.produtoService.excluir(Number(produto.id)).subscribe(() => {
          this.carregarProdutos();
        });
      }
    });
  }

  openDeleteDialog(produto: Produto) {
    const dialogReferencia = this.dialog.open(DeleteConfirmationDialogComponent, {
      data: {nome: produto.nome}, width: '480px',
    });
  }

  aplicarFiltro(valor: string) {
    const termo = valor.toLowerCase();

    if (!termo) {
      this.carregarProdutos();
      return;
    }

  this.dataSource.filter = termo;
  }

}
