import { CadastroProdutoComponent } from './features/cadastro-produto/cadastro-produto.component';
import { EditarProdutoComponent } from './features/editar-produto/editar-produto.component';
import { ListagemProdutosComponent } from './features/listagem-produtos/listagem-produtos.component';
import { LoginComponent } from './features/login/login.component';
import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: "", component: LoginComponent, title: "Fragrance - Login"
    }

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
