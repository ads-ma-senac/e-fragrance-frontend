import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from "./shared/sidebar/sidebar.component";
import { ListagemProdutosComponent } from "./features/listagem-produtos/listagem-produtos.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, SidebarComponent, ListagemProdutosComponent],
  templateUrl: './app.component.html',
})
export class AppComponent {
  title = 'frontend';
}
