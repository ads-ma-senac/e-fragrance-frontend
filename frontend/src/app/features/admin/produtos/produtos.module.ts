import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CadastrarComponent} from './cadastrar/cadastrar.component';
import {ListarComponent} from './listagem-produtos/listar.component';
import {EditarComponent} from './editar/editar.component';
import {
  AdminDashboardLayoutComponent
} from '../../../shared/layout/admin-dashboard-layout/admin-dashboard-layout.component';

const routes: Routes = [
  {
    path: '',
    component: AdminDashboardLayoutComponent,
    children: [
      {
        path: '',
        component: ListarComponent,
        title: 'Listar perfume - Fragrance',
      },
      {
        path: 'novo',
        component: CadastrarComponent,
        title: 'Cadastrar perfume - Fragrance',
      },
      {
        path: 'editar/:id',
        component: EditarComponent,
        title: 'Editar perfume - Fragrance',
      },
    ]
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProdutosModule { }
