import { Component, effect, EventEmitter, input, Output, signal, WritableSignal } from '@angular/core';
import { ProductType } from '../../products/types/product-type';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-collection-color-button',
  imports: [NgClass],
  templateUrl: './collection-color-button.html',
  styleUrl: './collection-color-button.css',
})
export class CollectionColorButton {
  @Output() itemSelected = new EventEmitter<number>();

  collectionItem = input.required<ProductType[] | null>();
  index = input.required<number>();

  itemIndex: WritableSignal<number> = signal<number>(0);

  constructor() {
    effect(() => {
      this.setColor(this.index());
    });
  }

  public colorSelected(i: number): void {
    this.setColor(i);
    this.itemSelected.emit(i);
  }

  private setColor(i: number): void {

    this.itemIndex.set(i);
  }
}
