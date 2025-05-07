import {Imagem} from './imagem.model';

export interface Produto {
    id: number
    sku: string
    nome: string
    marca: string
    genero: string
    categoria: number
    volume: number
    precoUnidade: number
    unidadeEmEstoque: number
    concentracao: string
    descricaodescription: string
    imagens: Imagem[]
    criadoEm: string
    atualizadoEm: string
  }

