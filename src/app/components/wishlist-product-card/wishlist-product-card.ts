import {
  afterNextRender,
  Component,
  DestroyRef,
  ElementRef,
  input,
  signal,
  viewChild,
  WritableSignal
} from '@angular/core';
import { ProductCartType } from '../../product-cart/cart-type/product-cart-type';
import { ProductType } from '../../products/types/product-type';
import { ProductsService } from '../../products/products-service';
import { Subscription } from 'rxjs';
import { ProductCartService } from '../../product-cart/services/product-cart-service';
import { RouterLink } from '@angular/router';
import { CurrencyPipe } from '@angular/common';
import { WishlistService } from '../../product-wishlist/wishlist-service';
import { ReactiveFormsModule } from '@angular/forms';
import { MiniCartService } from '../../modals/mini-cart/mini-cart-service';

@Component({
  selector: 'app-wishlist-product-card',
  imports: [RouterLink, CurrencyPipe, ReactiveFormsModule],
  templateUrl: './wishlist-product-card.html',
  styleUrl: './wishlist-product-card.css',
})
export class WishlistProductCard {
  productItem = input.required<ProductCartType>();
  wishlistName = input.required<string>();
  public shopProduct: WritableSignal<ProductType | null> = signal<ProductType | null>(null);
  public cartProduct: WritableSignal<ProductCartType | null> = signal<ProductCartType | null>(null);
  public editorButton: WritableSignal<string> = signal<string>('Edit');
  public loading: WritableSignal<boolean> = signal<boolean>(false);

  private productSubscription$: Subscription | undefined;
  private productCartSubscription$: Subscription = new Subscription();

  readonly select = viewChild<ElementRef<HTMLSelectElement>>('select');
  readonly selectCup = viewChild<ElementRef<HTMLSelectElement>>('selectCup');

  constructor(
    private productsService$: ProductsService,
    private cartService$: ProductCartService,
    private miniCartService$: MiniCartService,
    private wishlistService$: WishlistService,
    private destroyRef: DestroyRef,
  ) {
    afterNextRender(() => {
      const product = this.productItem();

      this.productSubscription$ = this.productsService$
        .getShopProduct(product.url)
        .subscribe((item) => {
          this.shopProduct.set(item);

          if (item !== null) {
            const sizes = item.sizes;

            if (sizes !== undefined) {

              let cartItem: ProductCartType = {
                name: item.name,
                url: item.url,
                price: String(item.price),
                image: item.images[0],
                count: '1',
                type: item.type || '',
                color: item.colorName,
                size: {key: sizes[0].key, value: sizes[0].sizes[0]}
              };

              this.cartProduct.set(cartItem);
            }
          }

        });
    });

    this.destroyRef.onDestroy(() => {
      if (this.productSubscription$) {
        this.productSubscription$.unsubscribe();
      }

      this.productCartSubscription$.unsubscribe();
    });
  }

  public remove(): void {
    const product = this.productItem();
    const listName = this.wishlistName();

    this.wishlistService$.removeFromWishlist(listName, product);
  }

  public toggleEdit(): void {

    if (this.editorButton() === 'Edit') {

      this.editorButton.set('Update');
    }
    else if (this.editorButton() === 'Update') {

      const item = this.cartProduct();
      const selSize = this.select();
      const selCup = this.selectCup();

      if (item !== null) {

        let cartItem: ProductCartType = {
          name: item.name,
          url: item.url,
          price: item.price,
          image: item.image,
          count: item.count,
          type: item.type,
          color: item.color,
        };

        if (item.type === 'bra' && selSize && selCup) {

          const sizeValue = selSize.nativeElement.value;
          const capValue = selCup.nativeElement.value;

          cartItem.size = {key: capValue, value: sizeValue};

        }
        else if (item.type !== 'bra' && selSize) {
          const sizeValue = selSize.nativeElement.value;
          cartItem.size = {key: '', value: sizeValue};
        }

        this.cartProduct.set(cartItem);
        this.editorButton.set('Edit');

      }
    }
  }

  public addToCart(): void {
    const item = this.cartProduct();

    if (item !== null) {

      this.loading.set(true);

      setTimeout(() => {

        this.cartService$.addToCart(item);
        this.remove();
        // Open mini cart
        this.miniCartService$.toggleMiniCart(true);

      }, 3000);
    }
  }
}
