import { Component, DestroyRef, effect, input, signal, WritableSignal } from '@angular/core';
import { ProductType } from '../../products/types/product-type';
import { ProductsService } from '../../products/products-service';
import { Subscription } from 'rxjs';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-product-select-set',
  imports: [RouterLink],
  templateUrl: './product-select-set.html',
  styleUrl: './product-select-set.css',
})
export class ProductSelectSet {
  private productSubscription$: Subscription | undefined;
  shopProduct = input.required<ProductType>();
  productSets: WritableSignal<ProductType[]> = signal<ProductType[]>([]);
  activeSet: WritableSignal<number> = signal<number>(0);

  constructor(
    private productsService$: ProductsService,
    private destroyRef: DestroyRef,
  ) {
    effect(() => {
      const product = this.shopProduct();
      this.getSets(product);
    });

    this.destroyRef.onDestroy(() => {
      if (this.productSubscription$) {
        this.productSubscription$.unsubscribe();
      }
    });
  }

  private getSets(product: ProductType): void {
    this.productSets.set([]);
    this.activeSet.set(0);

    if (this.productSubscription$) {
      this.productSubscription$.unsubscribe();
    }
    this.productSubscription$ = this.productsService$
      .getShopProductSets(product.name, product.colorName)
      .subscribe((sets) => {
        if (sets && sets.length > 0) {
          for (let i = 0; i < sets.length; i++) {
            if (sets[i].url === product.url) {
              this.activeSet.set(i);
              break;
            }
          }
          this.productSets.set(sets);
        }
      });
  }
}
