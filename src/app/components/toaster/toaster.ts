import { Component, effect, input, signal, WritableSignal } from '@angular/core';

@Component({
  selector: 'app-toaster',
  imports: [],
  templateUrl: './toaster.html',
})
export class Toaster {

  message = input.required<string>();
  active = input.required<boolean>();

  public activated: WritableSignal<boolean> = signal<boolean>(false);

  constructor() {
    effect(() => {
      const active = this.active();
      this.activated.set(active);
    });
  }

  public close(): void {
    this.activated.set(false);
  };
}
