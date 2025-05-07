import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ProdutoService } from '../../../../core/services/produto.service';

@Component({
  selector: 'app-editar-produto',
  templateUrl: './editar.component.html',
  styleUrls: ['./editar.component.css'],
  standalone: true,
  imports: [CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
    RouterLink,
    ReactiveFormsModule]
})
export class EditarComponent implements OnInit {
  produtoForm: FormGroup;
  id!: number;

  generos = ['Masculino', 'Feminino', 'Unissex'];
  categorias = ['Amadeirado', 'Cítrico', 'Oriental', 'Aromático', 'Floral', 'Gourmand', 'Fern'];
  concentracoes = ['Parfum', 'Eau de Parfum', 'Eau de Toilette', 'Eau de Cologne', 'Eau Fraiche'];

  private fb = inject(FormBuilder);
  private route = inject(ActivatedRoute);
  private produtoService = inject(ProdutoService);
  formSubmitted = false;

  constructor() {
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

  ngOnInit() {
    this.id = Number(this.route.snapshot.paramMap.get('id'));

    this.produtoService.buscarPorId(this.id).subscribe(produto => {
      console.log('Produto carregado:', produto);
      this.produtoForm.patchValue(produto);
    });
  }

  onSubmit() {
    if (this.produtoForm.valid) {
      this.produtoService.atualizar(this.id, this.produtoForm.value).subscribe(() => {
        alert('Produto atualizado com sucesso!');
      });
    }
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    this.produtoForm.patchValue({ imagem: file });
  }
}

