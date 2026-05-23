import { Component, OnDestroy, OnInit, signal, WritableSignal } from '@angular/core';
import { SelectSizeService } from './select-size-service';
import { Subscription } from 'rxjs';
import { ImageSwiper } from '../../components/image-swiper/image-swiper';
import { ProductType } from '../../products/types/product-type';
import { Router } from '@angular/router';
import { WishlistService } from '../../product-wishlist/wishlist-service';
import { ProductCartType } from '../../product-cart/cart-type/product-cart-type';
import { AuthService } from '../../auth/auth-service';
import { CurrencyPipe, NgClass } from '@angular/common';
import { ProductDetailsType } from '../../types/instagram/instagram-feeds-type';
import { FsSize } from '../../components/fs-size/fs-size';
import { ProductCartService } from '../../product-cart/services/product-cart-service';
import { MiniCartService } from '../mini-cart/mini-cart-service';

@Component({
  selector: 'app-select-size-modal',
  imports: [ImageSwiper, CurrencyPipe, NgClass, FsSize],
  templateUrl: './select-size-modal.html',
})
export class SelectSizeModal implements OnInit, OnDestroy {
  private selectedSizeSubscription$: Subscription | undefined;
  private alertSubscription$: Subscription | undefined;

  public productDetails: WritableSignal<ProductType | null> = signal<ProductType | null>(null);
  public buyProduct: WritableSignal<ProductDetailsType | null> = signal<ProductDetailsType | null>(
    null,
  );

  private fsSize: string = '';
  private fsCup: string = '';

  public selectDisabled: WritableSignal<boolean> = signal<boolean>(true);
  public buttonTitle: WritableSignal<string> = signal<string>("Select Size");
  public loading: WritableSignal<boolean> = signal<boolean>(false);

  constructor(
    private selectSizeService$: SelectSizeService,
    private router: Router,
    private wishlistService$: WishlistService,
    private authService: AuthService,
    private cartService: ProductCartService,
    private miniCartService: MiniCartService,
  ) {}

  ngOnInit(): void {
    this.selectedSizeSubscription$ = this.selectSizeService$.selectSizeOpen$.subscribe(
      (product) => {

        this.productDetails.set(product);
        this.selectDisabled.set(true);
        this.loading.set(false);
        this.buttonTitle.set("Select Size");

        if (product !== null) {
          let details: ProductDetailsType = {
            name: product.name,
            image: product.images[0],
            type: product.type || '',
            price: String(product.price),
            url: product.url,
            linkStyle: '',
            sizes: product.sizes,
          };
          this.buyProduct.set(details);
        }
      },
    );

    this.alertSubscription$ = this.authService.loginAlert$.subscribe((response) => {
      if (response.state && response.type === 'wishlist') {
        this.modalClose();
      }
    });
  }

  ngOnDestroy(): void {
    if (this.selectedSizeSubscription$) {
      this.selectedSizeSubscription$.unsubscribe();
    }
    if (this.alertSubscription$) {
      this.alertSubscription$.unsubscribe();
    }
  }

  public getFsSize(size: string): void {
    this.fsSize = size;

    const p = this.productDetails();
    if (p === null) return;

    this.selectDisabled.set(false);
    this.buttonTitle.set('Add to Bag');

    if (p.type === "bra" && this.fsCup === '') {
      this.selectDisabled.set(true);
      this.buttonTitle.set('Select Size');
    }
  }

  public getCupSize(size: string): void {
    this.fsCup = size;

    if (this.fsSize !== '') {
      this.selectDisabled.set(false);
      this.buttonTitle.set('Add to Bag');
    }
    else {
      this.selectDisabled.set(true);
      this.buttonTitle.set('Select Size');
    }
  }

  public modalClose(): void {
    this.selectSizeService$.triggerSizeSelectionChanged(null);
  }

  public navigateToProductDetails(url: string): void {
    this.modalClose();

    setTimeout(() => {
      this.router.navigate(['/products', url]).then(() => {});
    }, 500);
  }

  public wishlistToggle(): void {
    const product = this.productDetails();
    if (product === null) return;

    let productCart: ProductCartType = {
      name: product.name,
      url: product.url,
      price: String(product.price),
      image: product.images[0],
      count: '',
      favorite: product.favorite,
    };
    this.wishlistService$.wishlistToggle(productCart);
  }

  public addToCart(): void {

    const product = this.productDetails();
    if (product === null) return;

    this.buttonTitle.set('');
    this.loading.set(true);

    let cartItem: ProductCartType = {
      name: product.name,
      url: product.url,
      price: String(product.price),
      image: product.images[0],
      count: '1',
      type: product.type || '',
      color: product.colorName
    };

    if (product.type === 'bra') {
      cartItem.size = { key: this.fsCup, value: this.fsSize };
    } else {
      cartItem.size = { key: '', value: this.fsSize };
    }

    setTimeout(() => {

      this.cartService.addToCart(cartItem);
      // Open mini cart
      this.modalClose();

      this.miniCartService.toggleMiniCart(true);

    }, 3000);

  }

  public openSizeGuidance(): void {

    this.modalClose();

    setTimeout(() => {
      this.router.navigate(['/size-guide']).then(() => {});
    }, 500);
  }
}
