import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
    RouterLink],
  templateUrl: './cadastro-produto.component.html',
  styleUrl: './cadastro-produto.component.css'
})

export class CadastroProdutoComponent {
  produtoForm: FormGroup;

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
      descricao: [''],
      imagem: [null]
    });
  }

  onSubmit() {
    if (this.produtoForm.valid) {
      console.log(this.produtoForm.value);
      // Aqui você envia os dados para o backend
    }
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    this.produtoForm.patchValue({ imagem: file });
  }
}
