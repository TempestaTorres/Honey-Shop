import { Component, OnDestroy, OnInit, signal, WritableSignal } from '@angular/core';
import { ProductCartService } from '../../product-cart/services/product-cart-service';
import { Subscription } from 'rxjs';
import { ProductCartType } from '../../product-cart/cart-type/product-cart-type';
import { RouterLink } from '@angular/router';
import { ProductCounter } from '../../components/product-counter/product-counter';
import { WishlistService } from '../../product-wishlist/wishlist-service';

@Component({
  selector: 'app-cart',
  imports: [RouterLink, ProductCounter],
  templateUrl: './cart.html',
  styleUrl: './cart.css',
})
export class Cart implements OnInit, OnDestroy {
  public empty: WritableSignal<boolean> = signal<boolean>(true);
  public cartItems: WritableSignal<ProductCartType[]> = signal<ProductCartType[]>([]);

  private cartSubscriptions$ = new Subscription();

  constructor(private cartService$: ProductCartService,
              private wishlistService$: WishlistService,) {}

  ngOnInit() {
    this.getCartItems();
  }

  ngOnDestroy() {
    this.cartSubscriptions$.unsubscribe();
  }

  public wishlistToggle(product: ProductCartType) {

    if (product.favorite === undefined) {
      product.favorite = false;
    }
    product.favorite = !product.favorite;

    this.wishlistService$.wishlistAddRemove(product);

  }

  public removeCartItem(item: ProductCartType) {
    this.cartService$.removeFromCart(item);
    this.getCartItems();
  }

  private getCartItems(): void {
    const sub = this.cartService$.getCartItems().subscribe((items) => {
      this.cartItems.set(items);

      if (items && items.length > 0) {
        this.empty.set(false);
      } else {
        this.empty.set(true);
      }
    });

    this.cartSubscriptions$.add(sub);
  }
}
