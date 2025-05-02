import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    NgOptimizedImage
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  coverUrl = 'cover.png';
  fragranceUrl = 'fragrance.png';
  loginForm: FormGroup;
  loginInvalid = false;

  constructor(private fb: FormBuilder, private router: Router) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  onSubmit() {
    const { email, password } = this.loginForm.value;

    if (email === 'admin.adm@gmail.com' && password === 'adm123') {
      this.loginInvalid = false;
      this.router.navigate(['/home']);
    } else {
      this.loginInvalid = true;
    }
  }
}
