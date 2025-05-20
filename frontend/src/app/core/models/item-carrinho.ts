import {Produto} from "@core/models/produto.model";

export interface ItemCarrinho extends Produto {
  quantidade: number;
}
