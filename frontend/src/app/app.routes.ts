import { Routes } from '@angular/router';
import { ListagemProdutosComponent } from './features/listagem-produtos/listagem-produtos.component';

export const routes: Routes = [
  { path: '', redirectTo: '/produtos', pathMatch: 'full' },
  { path: 'produtos', component: ListagemProdutosComponent }
];
