import { afterNextRender, Component, effect, input, signal, WritableSignal } from '@angular/core';
import { ProductType } from '../../products/types/product-type';
import { WishlistService } from '../../product-wishlist/wishlist-service';
import { ProductCartService } from '../../product-cart/services/product-cart-service';
import { RouterLink } from '@angular/router';
import { CurrencyPipe } from '@angular/common';
import { SelectSizeService } from '../../modals/select-size-modal/select-size-service';

@Component({
  selector: 'app-pair-with-slide',
  imports: [RouterLink, CurrencyPipe],
  templateUrl: './pair-with-slide.html',
  styleUrl: './pair-with-slide.css',
})
export class PairWithSlide {
  productItems = input.required<ProductType[]>();
  productUrl = input.required<string>();
  productItem: WritableSignal<ProductType | null> = signal<ProductType | null>(null);

  constructor(
    private wishlistService: WishlistService,
    private cartService: ProductCartService,
    private selectSizeService: SelectSizeService
  ) {
    effect(() => {
      const items = this.productItems();
      const itemUrl = this.productUrl();
      this.productItem.set(null);

      for (let i = 0; i < items.length; i++) {
        if (items[i].url === itemUrl) {
          this.productItem.set(items[i]);
          break;
        }
      }
    });

  }

  public addToWishlist(product: ProductType): void {
    const item = this.cartService.productTypeToCartType(product);
    this.wishlistService.wishlistToggle(item);
  }

  public addToCart(product: ProductType): void {

    if (product.type !== 'accessory') {
      // Open select size modal window
      this.selectSizeService.triggerSizeSelectionChanged(product);
    }
    else {
      const item = this.cartService.productTypeToCartType(product);
      requestAnimationFrame(() => {
        this.cartService.addToCart(item);
      });
    }
  }

  public colorSelected(url: string): void {

    const items = this.productItems();
    for (let i = 0; i < items.length; i++) {
      if (items[i].url === url) {
        this.productItem.set(items[i]);
      }
    }

  }
}
