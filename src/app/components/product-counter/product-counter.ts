import { Component, Input } from '@angular/core';
import { ProductCartType } from '../../product-cart/cart-type/product-cart-type';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-product-counter',
  imports: [FormsModule],
  templateUrl: './product-counter.html',
  styleUrl: './product-counter.css',
})
export class ProductCounter {
  @Input() product!: ProductCartType;

  public toggleCount(increase: boolean = true): void {
    let value = parseInt(this.product.count, 10);

    if (increase && value < 30) {
      value++;
      this.product.count = String(value);
    }
    else if (!increase && value > 1) {
      value--;
      this.product.count = String(value);
    }
  }
}
