import { Component, OnDestroy, OnInit, signal, WritableSignal } from '@angular/core';
import { ShopTheLookService } from '../shop-the-look/shop-the-look-service';
import { Subscription } from 'rxjs';
import { ProductType } from '../../products/types/product-type';
import { ProductsService } from '../../products/products-service';
import { ObserveElementDirective } from '../../directives/scroll-observer';
import { IntersectingService } from '../../services/intersecting-service';
import { ShopTheLookItem } from '../shop-the-look-item/shop-the-look-item';
import { Router } from '@angular/router';
import { ProductCartType } from '../../product-cart/cart-type/product-cart-type';
import { WishlistService } from '../../product-wishlist/wishlist-service';
import { SelectSizeService } from '../../modals/select-size-modal/select-size-service';

@Component({
  selector: 'app-shop-the-look-modal',
  imports: [ObserveElementDirective, ShopTheLookItem],
  templateUrl: './shop-the-look-modal.html',
  styleUrl: './shop-the-look-modal.css',
})
export class ShopTheLookModal implements OnInit, OnDestroy {
  public open: WritableSignal<boolean> = signal<boolean>(false);
  public collection: WritableSignal<Array<ProductType[]> | null> = signal<Array<
    ProductType[]
  > | null>(null);

  private subscription$: Subscription | undefined;
  private productSubscription$: Subscription | undefined;

  constructor(
    private shopTheLookService: ShopTheLookService,
    private productService: ProductsService,
    private intersectingService: IntersectingService,
    private router: Router,
    private wishlistService$: WishlistService,
    private selectSizeService: SelectSizeService
  ) {}

  ngOnInit(): void {
    this.subscription$ = this.shopTheLookService.shopTheLookDataIndex$.subscribe((url) => {
      if (url === null) {
        this.open.set(false);
      } else {
        if (this.productSubscription$) this.productSubscription$.unsubscribe();

        this.productSubscription$ = this.productService
          .getCollection(url)
          .subscribe((collection) => {
            this.collection.set(collection);

            if (collection) {
              console.log(collection);
              setTimeout(() => {
                this.open.set(true);
              }, 500);
            }
          });
      }
    });
  }

  ngOnDestroy(): void {
    if (this.subscription$) {
      this.subscription$.unsubscribe();
    }
  }

  modalClose(): void {
    this.shopTheLookService.triggerShopTheLook(null);
  }

  public isIntersecting(status: boolean, element: HTMLElement) {
    this.intersectingService.isIntersecting(status, element);
  }

  public addToCart(item: ProductType): void {

    // Open select size modal window
    this.selectSizeService.triggerSizeSelectionChanged(item);

  }

  public addToWishList(item: ProductType): void {

    let product: ProductCartType = {
      name: item.name,
      url: item.url,
      price: String(item.price),
      image: item.images[0],
      count: "",
      favorite: item.favorite,
    }
    this.wishlistService$.wishlistToggle(product);
  }

  public navigateToProduct(url: string): void {

    this.modalClose();

    setTimeout(() => {

      this.router.navigate(['/products', url]).then(() => {});
    }, 400);
  }
}
