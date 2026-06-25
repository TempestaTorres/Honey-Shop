import { Component, signal, WritableSignal } from '@angular/core';

@Component({
  selector: 'app-orders',
  imports: [],
  templateUrl: './orders.html',
  styleUrl: './orders.css',
})
export class Orders {

  public hasOrders: WritableSignal<boolean> = signal<boolean>(false);
}
