import { Component, DestroyRef, effect, input, OnInit, signal, WritableSignal } from '@angular/core';
import { Subscription } from 'rxjs';
import { ProductType } from '../../products/types/product-type';
import { ProductsService } from '../../products/products-service';
import { WishlistService } from '../../product-wishlist/wishlist-service';
import { SelectSizeService } from '../../modals/select-size-modal/select-size-service';
import { RouterLink } from '@angular/router';
import { ProductCartService } from '../../product-cart/services/product-cart-service';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-product-set',
  imports: [RouterLink, CurrencyPipe],
  templateUrl: './product-set.html',
  styleUrl: './product-set.css',
})
export class ProductSet implements OnInit {
  private productSubscription$: Subscription | undefined;
  private itemAdded$: Subscription | undefined;
  shopProduct = input.required<ProductType>();

  public setItems: WritableSignal<ProductType[]> = signal<ProductType[]>([]);
  public itemAdded: WritableSignal<boolean[]> = signal<boolean[]>([]);

  constructor(
    private productsService$: ProductsService,
    private destroyRef: DestroyRef,
    private wishlistService: WishlistService,
    private selectSizeService: SelectSizeService,
    private cartService: ProductCartService,
  ) {
    effect(() => {
      const product = this.shopProduct();
      this.getSet(product);
    });

    this.destroyRef.onDestroy(() => {
      if (this.productSubscription$) {
        this.productSubscription$.unsubscribe();
      }
      if (this.itemAdded$) {
        this.itemAdded$.unsubscribe();
      }
    });
  }

  ngOnInit(): void {

    this.itemAdded$ = this.cartService.itemAdded.subscribe(item => {

      if (item !== '') {

        this.itemAdded.update(value => {
          for (let i: number = 0; i < value.length; i++) {
            if (this.setItems()[i].url === item) {
              value[i] = true;
            }
          }
          return value;
        })
      }
    });
  }

  private getSet(product: ProductType): void {
    this.setItems.set([]);
    this.itemAdded.set([]);
    if (this.productSubscription$) {
      this.productSubscription$.unsubscribe();
    }

    this.productSubscription$ = this.productsService$
      .getShopProductSet(product.name, product.url)
      .subscribe((shopProducts) => {
        this.setItems.set(shopProducts);

        if (shopProducts && shopProducts.length > 0) {
          for (let i = 0; i < shopProducts.length; i++) {
            let added: boolean = this.cartService.isAdded(shopProducts[i].url);
            this.itemAdded.update((value) => [...value, added]);
          }
        }

      });
  }

  public addToCart(product: ProductType): void {
    // Open select size modal window
    this.selectSizeService.triggerSizeSelectionChanged(product);
  }

  public addToWishlist(product: ProductType): void {
    const item = this.cartService.productTypeToCartType(product);
    this.wishlistService.wishlistToggle(item);
  }
}
