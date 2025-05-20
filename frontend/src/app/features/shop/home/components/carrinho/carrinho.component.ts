import {CommonModule} from '@angular/common';
import {Component, OnInit, Signal} from '@angular/core';
import {MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import {ItemCarrinho} from '@core/models/item-carrinho';
import {CarrinhoService} from '@core/services/carrinho.service';
import {ItemCarrinhoComponent} from '@features/shop/home/components/item-carrinho/item-carrinho.component';

@Component({
  selector: 'app-carrinho',
  standalone: true,
  imports: [CommonModule, MatDialogModule, ItemCarrinhoComponent],
  templateUrl: './carrinho.component.html',
  styleUrls: ['./carrinho.component.css']
})
export class CarrinhoComponent implements OnInit {
  items!: Signal<ItemCarrinho[]>;
  carrinhoAberto!: Signal<boolean>;
  totalItems!: Signal<number>;
  precoTotal!: Signal<number>;

  constructor(private carrinhoService: CarrinhoService, public dialogRef: MatDialogRef<CarrinhoComponent>) {
  }

  close(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {
    this.items = this.carrinhoService.items;
    this.carrinhoAberto = this.carrinhoService.carrinhoAberto;
    this.totalItems = this.carrinhoService.totalItems;
    this.precoTotal = this.carrinhoService.precoTotal;
  }


  limparSacola() {
    this.carrinhoService.limparSacola()
  }

  fecharCarrinho() {
    this.carrinhoService.fecharCarrinho()
  }
}
