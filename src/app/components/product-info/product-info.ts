import { Component, effect, input, signal, WritableSignal } from '@angular/core';
import { ProductType } from '../../products/types/product-type';
import { WishlistService } from '../../product-wishlist/wishlist-service';
import { ProductCartType } from '../../product-cart/cart-type/product-cart-type';
import { ScrollingService } from '../../services/scrolling-service';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-product-info',
  imports: [CurrencyPipe],
  templateUrl: './product-info.html',
  styleUrl: './product-info.css',
})
export class ProductInfo {
  product = input.required<ProductType>();
  reviewsSelector = input<string>();
  public count: WritableSignal<number> = signal<number>(0);

  constructor(
    private wishlistService$: WishlistService,
    private scrollingService: ScrollingService,
  ) {
    effect(() => {
      let ratings = this.product().ratings;
      if (ratings) {
        const sum: number = ratings.stars.reduce(
          (accumulator, currentValue) => accumulator + currentValue,
          0,
        );

        this.count.set(sum);
      }
    });
  }

  public addToWishList(): void {
    let product: ProductCartType = {
      name: this.product().name,
      url: this.product().url,
      price: String(this.product().price),
      image: this.product().images[0],
      count: '',
      favorite: this.product().favorite,
    };
    this.wishlistService$.wishlistToggle(product);
  }

  public scrollToReviews(): void {
    let targetSelector: string | undefined = this.reviewsSelector();
    if (targetSelector !== undefined) {
      let target = document.getElementById(targetSelector);
      if (target !== null) {
        this.scrollingService.toTarget(target);
      }
    }
  }
}
