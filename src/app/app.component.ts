import { Component } from '@angular/core';
import { LoginComponent } from './features/login/login.component';

@Component({
  selector: 'app-root',
  imports: [LoginComponent],
  templateUrl: './app.component.html',
})
export class AppComponent {
  title = 'frontend';
}
