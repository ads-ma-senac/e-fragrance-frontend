import {Component, EventEmitter, Input, Output} from '@angular/core';
import {MatIconModule} from '@angular/material/icon';

@Component({
  selector: 'app-input-counter',
  imports: [MatIconModule],
  templateUrl: './input-counter.component.html',
  styleUrl: './input-counter.component.css'
})
export class InputCounterComponent {
  @Input() value:number = 0
  @Output() valueChange = new EventEmitter<number>();

  decrement() {
    if( this.value <= 0 ) return;
    this.value--
    this.valueChange.emit(this.value)
  }
  increment() {
    this.value++;
    this.valueChange.emit(this.value)
  }
}
