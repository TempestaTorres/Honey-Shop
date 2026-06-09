import { Component, effect, EventEmitter, input, Output, signal, WritableSignal } from '@angular/core';
import { ProductType } from '../../products/types/product-type';

@Component({
  selector: 'app-collection-color-button',
  imports: [],
  templateUrl: './collection-color-button.html',
  styleUrl: './collection-color-button.css',
})
export class CollectionColorButton {
  @Output() itemSelected = new EventEmitter<string>();

  collectionItem = input.required<ProductType[] | null>();
  currentColor = input.required<string>();

  itemColor: WritableSignal<string> = signal<string>('');

  constructor() {
    effect(() => {

      const color = this.currentColor();
      this.setColor(color);
    });
  }

  public colorSelected(color: string): void {
    this.setColor(color);
    this.itemSelected.emit(color);
  }

  private setColor(color: string): void {

    this.itemColor.set(color);
  }
}
