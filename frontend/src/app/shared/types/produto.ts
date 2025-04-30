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
    imagens: Imagen[]
    criadoEm: string
    atualizadoEm: string
  }
  
  export interface Imagen {
    id: number
    imagem: string
  }
  