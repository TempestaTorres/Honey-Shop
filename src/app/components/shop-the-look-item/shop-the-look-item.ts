import { Component, EventEmitter, input, Output, signal, WritableSignal } from '@angular/core';
import { ProductType } from '../../products/types/product-type';
import { CurrencyPipe, NgClass } from '@angular/common';

@Component({
  selector: 'app-shop-the-look-item',
  imports: [CurrencyPipe, NgClass],
  templateUrl: './shop-the-look-item.html',
  styleUrl: './shop-the-look-item.css',
})
export class ShopTheLookItem {
  @Output() showProduct: EventEmitter<string> = new EventEmitter();
  @Output() addToBag: EventEmitter<ProductType> = new EventEmitter();
  @Output() addItemToWishlist: EventEmitter<ProductType> = new EventEmitter();

  product = input.required<ProductType[]>();
  public index: WritableSignal<number> = signal<number>(0);

  constructor() {}

  public navigateToProduct(url: string): void {
    this.showProduct.emit(url);
  }

  public selectColorItemClick(index: number): void {

    if (index === this.index()) return;

    this.index.set(index);

  }

  public addToCart(item: ProductType): void {
    this.addToBag.emit(item);
  }

  public addToWishlist(item: ProductType): void {
    this.addItemToWishlist.emit(item);
  }
}
