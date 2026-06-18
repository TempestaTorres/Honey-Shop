import { Component, DestroyRef, input, OnInit, signal, WritableSignal } from '@angular/core';
import { ProductType } from '../../products/types/product-type';
import { ProductCartService } from '../../product-cart/services/product-cart-service';
import { MiniCartService } from '../../modals/mini-cart/mini-cart-service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-add-to-cart-module',
  imports: [],
  templateUrl: './add-to-cart-module.html',
})
export class AddToCartModule implements OnInit {

  productItem = input.required<ProductType>();

  public loading: WritableSignal<boolean> = signal<boolean>(false);
  public buttonDisabled: WritableSignal<boolean> = signal<boolean>(false);
  public buttonTitle: WritableSignal<string> = signal<string>('Add To Bag');

  private productCartSub$: Subscription | undefined;

  constructor(private cartService$: ProductCartService,
              private miniCartService$: MiniCartService,
              private destroyRef: DestroyRef) {

    this.destroyRef.onDestroy(() => {
      if (this.productCartSub$) {
        this.productCartSub$.unsubscribe();
      }
    })
  }

  ngOnInit(): void {
    const product = this.productItem();

    if (product !== undefined && product !== null) {
      this.buttonDisabled.set(this.cartService$.isAdded(product.url));
    }

    if (this.buttonDisabled())
      this.buttonTitle.set('Added To Bag');
    else
      this.buttonTitle.set('Add To Bag');

    this.productCartSub$ = this.cartService$.itemRemoved.subscribe(url => {

      const item = this.productItem();
      if (item !== null && item !== undefined && url !== '' && url === item.url) {
        this.buttonDisabled.set(false);
        this.buttonTitle.set('Add To Bag');
      }
    });
  }

  public addToCart(): void {
    const product = this.productItem();

    if (product !== null && product !== undefined) {

      const item = this.cartService$.productTypeToCartType(product);
      this.loading.set(true);
      this.buttonTitle.set('');

      setTimeout(() => {
        this.loading.set(false);
        this.buttonTitle.set('Added to cart');
        this.buttonDisabled.set(true);
        this.cartService$.addToCart(item);
        this.miniCartService$.toggleMiniCart(true);
      }, 2000);
    }
  }
}
