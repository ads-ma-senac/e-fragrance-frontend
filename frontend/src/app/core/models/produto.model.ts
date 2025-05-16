export interface Produto {
  id: number;
  sku: string;
  nome: string;
  marca: string;
  genero: string;
  categoria: any;
  volume: number;
  precoUnidade: number;
  unidadeEmEstoque: number;
  concentracao: string;
  descricao: string;
  imagem: string | File;
  criadoEm: string;
  atualizadoEm: string;
}
