import { Component, OnDestroy, OnInit, signal, WritableSignal } from '@angular/core';
import { ProductCartService } from '../../product-cart/services/product-cart-service';
import { Subscription } from 'rxjs';
import { ProductCartType } from '../../product-cart/cart-type/product-cart-type';
import { RouterLink } from '@angular/router';
import { ProductCounter } from '../../components/product-counter/product-counter';
import { WishlistService } from '../../product-wishlist/wishlist-service';
import { CurrencyPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProgressBar } from '../../components/progress-bar/progress-bar';
import { ProductCarousel } from '../../components/product-carousel/product-carousel';
import { ScrollingService } from '../../services/scrolling-service';

@Component({
  selector: 'app-cart',
  imports: [RouterLink, ProductCounter, CurrencyPipe, FormsModule, ProgressBar, ProductCarousel],
  templateUrl: './cart.html',
  styleUrl: './cart.css',
})
export class Cart implements OnInit, OnDestroy {
  public empty: WritableSignal<boolean> = signal<boolean>(true);
  public cartItems: WritableSignal<ProductCartType[]> = signal<ProductCartType[]>([]);
  public cartSubtotal: WritableSignal<number> = signal<number>(0);
  public maxForProgress: number = 150;

  private cartSubscriptions$ = new Subscription();

  constructor(
    private cartService$: ProductCartService,
    private wishlistService$: WishlistService,
    private scrollingService: ScrollingService,
  ) {}

  ngOnInit() {

    this.scrollingService.toTop();

    this.getCartItems();
  }

  ngOnDestroy() {
    this.cartSubscriptions$.unsubscribe();
  }

  public onSubmit(): void {
    console.log('submit');
  }

  public wishlistToggle(product: ProductCartType) {

    this.wishlistService$.wishlistToggle(product);

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

    const sub2 = this.cartService$.cartSubtotal.subscribe((amount) => {
      this.cartSubtotal.set(amount);
    });
    this.cartSubscriptions$.add(sub2);
  }
}
