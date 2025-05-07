
import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path:"admin",
    loadChildren: () => import("./features/admin/admin.module").then(m => m.AdminModule),
  },
  {
    path:"",
    loadChildren: () => import("./features/shop/shop.module").then(m => m.ShopModule),
  }
];
