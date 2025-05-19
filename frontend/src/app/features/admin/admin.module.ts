import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from '../../core/guards/auth.guard';
import { NgModule } from '@angular/core';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'login'
  },
  {
    path: '',
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'produtos',
    canActivateChild: [AuthGuard],
    loadChildren: () =>
      import('./produtos/produtos.module').then((m) => m.ProdutosModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminModule {}
