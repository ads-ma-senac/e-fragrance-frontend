import {Component, inject} from '@angular/core';

import {AuthService} from '@core/services/auth.service';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-profile',
  imports: [CommonModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent {
  private authService = inject(AuthService);
  usuario = this.authService.getUsuario();
}
