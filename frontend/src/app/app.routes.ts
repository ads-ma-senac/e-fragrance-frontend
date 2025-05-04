import { Routes } from '@angular/router';
import { ListagemProdutosComponent } from './features/listagem-produtos/listagem-produtos.component';
import { CadastroProdutoComponent } from './features/cadastro-produto/cadastro-produto.component';
import { EditarProdutoComponent } from './features/editar-produto/editar-produto.component';

export const routes: Routes = [
  {
    path: "produtos", component: ListagemProdutosComponent
  },
  {
    path: 'produtos/novo', component: CadastroProdutoComponent
  },
  {
    path: 'produtos/editar/:id', component: EditarProdutoComponent
  }
];
