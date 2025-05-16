import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { debounceTime, distinctUntilChanged } from 'rxjs';

import { CommonModule } from '@angular/common';
import { DeleteConfirmationDialogComponent } from './components/delete-confirmation-dialog/delete-confirmation-dialog.component';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Produto } from '../../../../core/models/produto.model';
import { ProdutoService } from '../../../../core/services/produto.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-listagem-produtos',
  imports: [
    MatTableModule,
    ReactiveFormsModule,
    MatPaginatorModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    CommonModule,
    MatDialogModule,
    RouterLink,
    FormsModule,
  ],
  templateUrl: './listar.component.html',
  styleUrl: './listar.component.css',
})
export class ListarComponent implements AfterViewInit {
  getHeader(coluna: string): string {
    return this.columns.find((c) => c.columnDef === coluna)?.header || coluna;
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

  displayedColumns = [...this.columns.map((c) => c.columnDef)];

  totalItems = 0;
  pageSize = 5;

  filtroControl = new FormControl('');

  filtro: string = '';

  data: Produto[] = [];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private dialog: MatDialog,
    private produtoService: ProdutoService
  ) {}

  ngOnInit() {
    this.filtroControl.valueChanges
      .pipe(debounceTime(300), distinctUntilChanged())
      .subscribe((valor) => this.aplicarFiltro(valor));
  }

  ngAfterViewInit() {
    this.paginator.page.subscribe(() => this.carregarProdutos());
    this.carregarProdutos();
  }

  carregarProdutos() {
    const pageIndex = this.paginator?.pageIndex ?? 0;
    const pageSize = this.paginator?.pageSize ?? this.pageSize;

    this.produtoService
      .listar(pageIndex, pageSize, this.filtro)
      .subscribe((produtos) => {
        this.data = produtos.data;
        this.totalItems = produtos.total;
      });
  }

  deletarProduto(produto: Produto) {
    const dialogRef = this.dialog.open(DeleteConfirmationDialogComponent, {
      data: { nome: produto.nome },
      width: '490px',
    });

    dialogRef.afterClosed().subscribe((confirmado) => {
      if (confirmado) {
        this.produtoService.excluir(Number(produto.id)).subscribe(() => {
          this.carregarProdutos();
        });
      }
    });
  }

  aplicarFiltro(valor: string | null) {
    const termo = valor?.trim().toLowerCase() ?? '';

    this.filtro = termo;
    this.paginator.firstPage();
    this.carregarProdutos();
  }
}
