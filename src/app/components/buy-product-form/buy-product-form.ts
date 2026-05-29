import { Component, effect, input, signal, WritableSignal } from '@angular/core';
import { ProductType } from '../../products/types/product-type';
import { FsSize } from '../fs-size/fs-size';
import { ProductCartService } from '../../product-cart/services/product-cart-service';
import { MiniCartService } from '../../modals/mini-cart/mini-cart-service';
import { ProductDetailsType } from '../../types/instagram/instagram-feeds-type';
import { ProductCartType } from '../../product-cart/cart-type/product-cart-type';
import { SizeGuideService } from '../../modals/size-guide-modal/size-guide-service';

@Component({
  selector: 'app-buy-product-form',
  imports: [FsSize],
  templateUrl: './buy-product-form.html',
  styleUrl: './buy-product-form.css',
})
export class BuyProductForm {
  buyProduct = input.required<ProductType>();

  public buyProductDetails: WritableSignal<ProductDetailsType | null> = signal<ProductDetailsType | null>(
    null,
  );

  private fsSize: string = '';
  private fsCup: string = '';

  public selectDisabled: WritableSignal<boolean> = signal<boolean>(true);
  public buttonTitle: WritableSignal<string> = signal<string>('Select Size');
  public loading: WritableSignal<boolean> = signal<boolean>(false);

  constructor(private cartService: ProductCartService,
              private miniCartService: MiniCartService,
              private sizeGuideService: SizeGuideService,) {

    effect(() => {

      this.selectDisabled.set(true);
      this.loading.set(false);
      this.buttonTitle.set('Select Size');

      let details: ProductDetailsType = {
        name: this.buyProduct().name,
        image: this.buyProduct().images[0],
        type: this.buyProduct().type || '',
        price: String(this.buyProduct().price),
        url: this.buyProduct().url,
        linkStyle: '',
        sizes: this.buyProduct().sizes,
      };
      this.buyProductDetails.set(details);
    });
  }

  public openSizeModal(): void {
    this.sizeGuideService.triggerSizeGuide(this.buyProduct().type)
  }

  public addToCart(): void {
    const product = this.buyProduct();
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
      color: product.colorName,
    };

    if (product.type === 'bra') {
      cartItem.size = { key: this.fsCup, value: this.fsSize };
    } else {
      cartItem.size = { key: '', value: this.fsSize };
    }

    setTimeout(() => {
      this.loading.set(false);
      this.cartService.addToCart(cartItem);
      // Open mini cart

      this.miniCartService.toggleMiniCart(true);

      this.buttonTitle.set('Added to cart');
      this.selectDisabled.set(true);
    }, 3000);
  }

  public getFsSize(size: string): void {
    this.fsSize = size;

    const p = this.buyProduct();
    if (p === null) return;

    this.selectDisabled.set(false);
    this.buttonTitle.set('Add to Bag');

    if (p.type === 'bra' && this.fsCup === '') {
      this.selectDisabled.set(true);
      this.buttonTitle.set('Select Size');
    }
  }

  public getCupSize(size: string): void {
    this.fsCup = size;

    if (this.fsSize !== '') {
      this.selectDisabled.set(false);
      this.buttonTitle.set('Add to Bag');
    } else {
      this.selectDisabled.set(true);
      this.buttonTitle.set('Select Size');
    }
  }
}
