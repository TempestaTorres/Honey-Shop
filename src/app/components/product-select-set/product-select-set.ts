import { Component, DestroyRef, effect, input, signal, WritableSignal } from '@angular/core';
import { ProductType } from '../../products/types/product-type';
import { ProductsService } from '../../products/products-service';
import { Subscription } from 'rxjs';
import { RouterLink } from '@angular/router';
import { ViewSetsService } from './view-sets-service';
import { ModalViewSets } from '../../modals/modal-view-sets/modal-view-sets';

@Component({
  selector: 'app-product-select-set',
  imports: [RouterLink, ModalViewSets],
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
    private viewSetsService$: ViewSetsService,
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

  public openViewAllSets(): void {
    this.viewSetsService$.triggerViewSets(this.productSets());
  }

  private getSets(product: ProductType): void {
    if (this.productSubscription$) {
      this.productSubscription$.unsubscribe();
    }
    this.productSubscription$ = this.productsService$
      .getShopProductSets(product.name, product.colorName)
      .subscribe((sets) => {
        this.productSets.set(sets);

        if (sets && sets.length > 0) {
          for (let i = 0; i < sets.length; i++) {
            if (sets[i].url === product.url) {
              this.activeSet.set(i);
              break;
            }
          }
        }
      });
  }
}
