import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { CadastrarComponent } from './cadastrar/cadastrar.component';
import { ListarComponent } from './listagem-produtos/listar.component';
import { EditarComponent } from './editar/editar.component';
import { AdminDashboardLayoutComponent } from '../../../shared/layout/admin-dashboard-layout/admin-dashboard-layout.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms'; 

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
];

@NgModule({
  declarations: [
    
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
    CadastrarComponent,
    ListarComponent,
    EditarComponent,
    AdminDashboardLayoutComponent
  ]
})
export class ProdutosModule { }
