import { Component, OnDestroy, OnInit, signal, WritableSignal } from '@angular/core';
import { ProductCartService } from '../../product-cart/services/product-cart-service';
import { Subscription } from 'rxjs';
import { MiniCartService } from '../../modals/mini-cart/mini-cart-service';

@Component({
  selector: 'app-cart-count',
  imports: [],
  templateUrl: './cart-count.html',
  styleUrl: './cart-count.css',
})
export class CartCount implements OnInit, OnDestroy {

  public count: WritableSignal<number> = signal<number>(0);

  private cartSubscription$: Subscription | undefined;

  constructor(private cartService: ProductCartService,
              private miniCartService: MiniCartService,) {
  }

  ngOnInit() {

    this.cartSubscription$ = this.cartService.cartCount.subscribe(count => {
      this.count.set(count);
    });
  }

  ngOnDestroy() {
    if (this.cartSubscription$) {
      this.cartSubscription$.unsubscribe();
    }
  }

  public openMiniCart(): void {
    this.miniCartService.toggleMiniCart(true);
  }
}
