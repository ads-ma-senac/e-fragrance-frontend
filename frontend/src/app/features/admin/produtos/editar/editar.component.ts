import {Component, OnInit, inject} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';

import {CommonModule} from '@angular/common';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {Produto} from '@core/models/produto.model';
import {ProdutoService} from '@core/services/produto.service';
import {ImageUploadCardComponent} from '@shared/components/image-upload-card/image-upload-card.component';
import {ProdutoConstants} from '@features/admin/produtos/constants/produto.constants';

@Component({
  selector: 'app-editar-produto',
  templateUrl: './editar.component.html',
  styleUrls: ['./editar.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
    RouterLink,
    ReactiveFormsModule,
    ImageUploadCardComponent,
  ],
})
export class EditarComponent implements OnInit {
  produtoForm: FormGroup;
  id!: number;

  generos = ProdutoConstants.GENEROS;
  categorias = ProdutoConstants.CATEGORIAS;
  concentracoes = ProdutoConstants.CONCENTRACOES;
  imagemPreview: File | string | null = null;

  private fb = inject(FormBuilder);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private produtoService = inject(ProdutoService);
  formSubmitted = false;
  produtoOriginal: Produto | null = null;

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
      descricao: ['', Validators.required],
      imagem: ['', Validators.required],
    });
  }

  ngOnInit() {
    const idParametro = this.route.snapshot.paramMap.get('id');
    if (idParametro) {
      this.id = Number(idParametro);
      this.carregarProduto();
    } else {
      console.error('ID do produto não fornecido na URL');
      this.router.navigate(['admin/produtos']);
    }
  }

  carregarProduto() {
    this.produtoService.buscarPorId(this.id).subscribe({
      next: (produto) => {
        console.log('Produto carregado:', produto);
        this.produtoOriginal = produto;

        this.produtoForm.patchValue({
          id: produto.id,
          nome: produto.nome,
          marca: produto.marca,
          genero:
            typeof produto.genero === 'number'
              ? this.generos[produto.genero - 1]
              : produto.genero,
          categoria:
            typeof produto.categoria === 'number'
              ? this.categorias[produto.categoria - 1]
              : produto.categoria,
          volume: produto.volume,
          concentracao: produto.concentracao,
          preco: produto.precoUnidade,
          estoque: produto.unidadeEmEstoque,
          descricao: produto.descricao,
          imagem: produto.imagem
        });

        this.imagemPreview = produto.imagem
      },
      error: (erro) => {
        console.error('Erro ao carregar produto:', erro);
        alert(
          'Erro ao carregar os dados do produto. Verifique o console para mais detalhes.'
        );
        this.router.navigate(['/produtos']);
      },
    });
  }

  onSubmit() {
    this.formSubmitted = true;

    if (this.produtoForm.valid && this.produtoOriginal) {
      const produtoAtualizado: Produto = {
        ...this.produtoOriginal,
        nome: this.produtoForm.value.nome,
        marca: this.produtoForm.value.marca,
        genero: this.produtoForm.value.genero,
        categoria: this.produtoForm.value.categoria,
        volume: this.produtoForm.value.volume,
        concentracao: this.produtoForm.value.concentracao,
        precoUnidade: this.produtoForm.value.preco,
        unidadeEmEstoque: this.produtoForm.value.estoque,
        descricao: this.produtoForm.value.descricao,
        atualizadoEm: new Date().toISOString(),
        imagem: this.produtoForm.value.imagem
      };

      this.produtoService.atualizar(this.id, produtoAtualizado).subscribe({
        next: () => {
          alert('Produto atualizado com sucesso!');
          this.router.navigate(['/admin/produtos']);
        },
        error: (error) => {
          console.error('Erro ao atualizar o produto:', error);
        },
      });
    } else {
    }
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
