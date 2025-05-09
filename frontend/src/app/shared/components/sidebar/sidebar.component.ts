import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { ProfileComponent } from '../profile/profile.component';
import { RouterModule } from '@angular/router';

type link = { path: string; label: string };

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    MatSidenavModule,
    MatListModule,
    RouterModule,
    CommonModule,
    ProfileComponent,
  ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
})
export class SidebarComponent {
  links: link[] = [
    {
      path: '/home',
      label: 'home',
    },
    {
      path: '/dashboard',
      label: 'dashboard',
    },
    {
      path: '/vendas',
      label: 'vendas',
    },
    {
      path: '/admin/produtos',
      label: 'produtos',
    },
    {
      path: '/usuarios',
      label: 'usuarios',
    },
  ];
}
