import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {Router, RouterLink} from '@angular/router';

import {CommonModule} from '@angular/common';
import {Component} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {ProdutoService} from '@core/services/produto.service';
import {ImageUploadCardComponent} from '@shared/components/image-upload-card/image-upload-card.component';
import {ProdutoConstants} from '@features/admin/produtos/constants/produto.constants';

@Component({
  selector: 'app-cadastro-produto',
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
    RouterLink,
    ReactiveFormsModule,
    ImageUploadCardComponent
  ],
  templateUrl: './cadastrar.component.html',
  styleUrl: './cadastrar.component.css',
})
export class CadastrarComponent {
  produtoForm: FormGroup;
  formSubmitted = false;

  generos = ProdutoConstants.GENEROS;
  categorias = ProdutoConstants.CATEGORIAS;
  concentracoes = ProdutoConstants.CONCENTRACOES;

  constructor(
    private fb: FormBuilder,
    private produtoServices: ProdutoService,
    private router: Router
  ) {
    this.produtoForm = this.fb.group({
      nome: ['', Validators.required],
      marca: ['', Validators.required],
      genero: ['', Validators.required],
      categoria: ['', Validators.required],
      volume: ['', Validators.required],
      concentracao: ['', Validators.required],
      preco: ['', [Validators.required, Validators.min(0)]],
      estoque: ['', [Validators.required, Validators.min(0)]],
      descricao: ['', Validators.required],
      imagem: ['', Validators.required],
    });
  }

  onSubmit() {
    this.formSubmitted = true;

    if (this.produtoForm.valid) {
      // O serviço de produtos agora transformará os dados no formato correto
      this.produtoServices.cadastrar(this.produtoForm.value).subscribe({
        next: () => {
          alert('Produto cadastrado com sucesso!');
          this.produtoForm.reset();
          this.router.navigate(['admin/produtos']);
        },
        error: (error: any) => {
          console.error('Erro ao cadastrar produto:', error);
          alert(
            'Erro ao cadastrar produto. Verifique o console para mais detalhes.'
          );
        },
      });
    } else {
      Object.keys(this.produtoForm.controls).forEach((field) => {
        const control = this.produtoForm.get(field);
        control?.markAsTouched();
      });
    }
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    this.produtoForm.patchValue({imagem: file});
  }

  cancelarEdicao() {
    this.router.navigate(['/admin/produtos']);
  }

  handleImageChange(file: File | null): void {
    if (file) {
      this.produtoForm.patchValue({imagem: file});
    }
  }
}
