import { Component, OnDestroy, OnInit, signal, WritableSignal } from '@angular/core';
import { ProductCartService } from '../../product-cart/services/product-cart-service';
import { Subscription } from 'rxjs';
import { ProductCartType } from '../../product-cart/cart-type/product-cart-type';
import { Router } from '@angular/router';
import { MiniCartService } from './mini-cart-service';
import { AuthService } from '../../auth/auth-service';
import { ProgressBar } from '../../components/progress-bar/progress-bar';
import { CurrencyPipe } from '@angular/common';
import { WishlistService } from '../../product-wishlist/wishlist-service';
import { ProductCounter } from '../../components/product-counter/product-counter';
import { MiniCartCarousel } from '../../components/mini-cart-carousel/mini-cart-carousel';

@Component({
  selector: 'app-mini-cart',
  imports: [ProgressBar, CurrencyPipe, ProductCounter, MiniCartCarousel],
  templateUrl: './mini-cart.html',
  styleUrl: './mini-cart.css',
})
export class MiniCart implements OnInit, OnDestroy {
  private subscriptions$: Subscription = new Subscription();

  public cartItems: WritableSignal<ProductCartType[]> = signal<ProductCartType[]>([]);
  public cartRecommendedItems: WritableSignal<ProductCartType[]> = signal<ProductCartType[]>([]);
  public miniCartOpen: WritableSignal<boolean> = signal<boolean>(true);
  public loggedIn: WritableSignal<boolean> = signal<boolean>(false);
  public cartSubtotal: WritableSignal<number> = signal<number>(0);
  public maxForProgress: number = 150;

  constructor(
    private productCartService: ProductCartService,
    private router: Router,
    private miniCartService$: MiniCartService,
    private authService: AuthService,
    private wishlistService$: WishlistService,
  ) {}

  ngOnInit(): void {
    const sub = this.productCartService.cartCount.subscribe((cartItems) => {
      if (cartItems > 0) {
        const sub2 = this.productCartService.getCartItems().subscribe((cartItems) => {
          this.cartItems.set(cartItems);
        });

        this.subscriptions$.add(sub2);

        const sub3 = this.miniCartService$.getRecommendedMiniCartItems().subscribe((cartItems) => {
          this.cartRecommendedItems.set(cartItems);

        });
        this.subscriptions$.add(sub3);
      } else {
        this.cartItems.set([]);
      }
    });

    this.subscriptions$.add(sub);

    const sub4 = this.productCartService.cartSubtotal.subscribe((amount) => {
      this.cartSubtotal.set(amount);
    });
    this.subscriptions$.add(sub4);

    const m = this.miniCartService$.miniCartOpen.subscribe((open) => {
      this.miniCartOpen.set(open);
    });
    this.subscriptions$.add(m);

    const auth = this.authService.userLogged$.subscribe((logged) => {
      this.loggedIn.set(logged);
    });
    this.subscriptions$.add(auth);

    const alert = this.authService.loginAlert$.subscribe((response) => {
      if (response.state && response.type === 'wishlist') {
        this.modalClose();
      }
    });
    this.subscriptions$.add(alert);
  }

  ngOnDestroy(): void {
    if (this.subscriptions$) {
      this.subscriptions$.unsubscribe();
    }
  }

  modalClose(): void {
    this.miniCartService$.toggleMiniCart(false);
  }

  navigateTo(url: string) {
    this.modalClose();

    setTimeout(() => {
      this.router.navigate([url]).then(() => {});
    }, 400);
  }

  navigateToProduct(url: string) {
    this.modalClose();

    setTimeout(() => {
      this.router.navigate(['/products', url]).then(() => {});
    }, 400);
  }

  navigateToProducts(): void {
    this.modalClose();
    setTimeout(() => {
      this.router.navigate(['/collections', 'all-lingerie']).then(() => {});
    });
  }

  public wishlistToggle(item: ProductCartType): void {
    this.wishlistService$.wishlistToggle(item);
  }

  public removeCartItem(item: ProductCartType) {
    this.productCartService.removeFromCart(item);
  }
}
