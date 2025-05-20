import {Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {SidebarComponent} from '@shared/components/sidebar/sidebar.component';

@Component({
  selector: 'app-admin-dashboard-layout',
  imports: [
    RouterOutlet,
    SidebarComponent
  ],
  template: `<div class="container-principal">
    <app-sidebar></app-sidebar>
    <main>
      <router-outlet></router-outlet>
    </main>
  </div>`,
  styles: `.container-principal {
    display: grid;
    grid-template-columns: minmax(100px, 280px) 1fr;
  }`
})
export class AdminDashboardLayoutComponent {

}
