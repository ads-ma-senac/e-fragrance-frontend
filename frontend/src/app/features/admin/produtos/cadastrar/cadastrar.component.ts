import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cadastro-produto',
  imports: [CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
    RouterLink,
    ReactiveFormsModule],
  templateUrl: './cadastrar.component.html',
  styleUrl: './cadastrar.component.css'
})

export class CadastrarComponent {
  produtoForm: FormGroup;
  formSubmitted = false;

  generos = ['Masculino', 'Feminino', 'Unissex'];
  categorias = ['Amadeirado', 'Cítrico', 'Oriental', 'Aromático', 'Floral', 'Gourmand', 'Fern'];
  concentracoes = ['Parfum', 'Eau de Parfum', 'Eau de Toilette', 'Eau de Cologne', 'Eau Fraiche'];

  constructor(private fb: FormBuilder) {
    this.produtoForm = this.fb.group({
      nome: ['', Validators.required],
      marca: ['', Validators.required],
      genero: ['', Validators.required],
      categoria: ['', Validators.required],
      volume: ['', Validators.required],
      concentracao: ['', Validators.required],
      preco: ['', Validators.required],
      estoque: ['', Validators.required],
      descricao: ['', Validators.required],
      imagem: [null]
    });
  }

  onSubmit() {
    this.formSubmitted = true;

    if (this.produtoForm.valid) {
      console.log(this.produtoForm.value);
    } else{

    }
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    this.produtoForm.patchValue({ imagem: file });
  }
}
