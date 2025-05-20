import {RouterModule, Routes} from '@angular/router';

import {LoginComponent} from '@features/admin/auth/login/login.component';
import {LoginGuard} from '@core/guards/login.guard';
import {NgModule} from '@angular/core';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [LoginGuard],
    title: 'Login - Fragrance',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthModule {
}
