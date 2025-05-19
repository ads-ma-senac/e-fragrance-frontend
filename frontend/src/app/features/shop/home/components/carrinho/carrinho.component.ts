import { CommonModule } from '@angular/common';
import { Component, OnInit, Signal } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ItemCarrinho } from '../../../../../core/models/item-carrinho';
import { CarrinhoService } from '../../../../../core/services/carrinho.service';

@Component({
  selector: 'app-carrinho',
  imports: [CommonModule],
  templateUrl: './carrinho.component.html',
})
export class CarrinhoComponent implements OnInit {
  items!: Signal<ItemCarrinho[]>;
  carrinhoAberto!: Signal<boolean>;
  totalItems!: Signal<number>;
  precoTotal!: Signal<number>;

  constructor(private carrinhoService: CarrinhoService, public dialogRef: MatDialogRef<CarrinhoComponent>) { }

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