import { Component, ElementRef, OnDestroy, OnInit, signal, viewChildren, WritableSignal } from '@angular/core';
import { InstagramFeedsService } from '../../services/instagram-feeds-service';
import { Subscription } from 'rxjs';
import { InstagramFeedType, ProductDetailsType } from '../../types/instagram/instagram-feeds-type';
import { Router} from '@angular/router';
import { ProductCartType } from '../../product-cart/cart-type/product-cart-type';
import { ProductCartService } from '../../product-cart/services/product-cart-service';

@Component({
  selector: 'app-instagram-feed-modal',
  imports: [],
  templateUrl: './instagram-feed-modal.html',
  styleUrl: './instagram-feed-modal.css',
})
export class InstagramFeedModal implements OnInit, OnDestroy {

  private openedFeed$: Subscription | undefined;

  public dialogOpen: WritableSignal<boolean> = signal<boolean>(false);

  public feed: WritableSignal<InstagramFeedType | null> = signal<InstagramFeedType | null>(null);
  public prev: WritableSignal<number> = signal(-1);
  public productLink: WritableSignal<number> = signal(0);
  public count: number = -1;

  public buyContainerOpen: WritableSignal<boolean> = signal<boolean>(false);
  public buyProduct: WritableSignal<ProductDetailsType | null> = signal<ProductDetailsType | null>(null);

  public fsError: WritableSignal<string> = signal<string>("");

  readonly radioCups = viewChildren<ElementRef<HTMLInputElement>>('radioCap');
  readonly radioSizes = viewChildren<ElementRef<HTMLInputElement>>('radioSize');

  private fsSize: string = '';
  private fsCup: string = '';

  public productAdded: WritableSignal<boolean> = signal<boolean>(false);
  public cartProduct: WritableSignal<ProductCartType | null> = signal<ProductCartType | null>(null);

  private cartSub$: Subscription | undefined;
  public cartCount: WritableSignal<number> = signal<number>(0);

  constructor(private instagramFeedService: InstagramFeedsService,
              private router: Router, private cartService: ProductCartService,) {}

  ngOnInit() {

    this.cartSub$ = this.cartService.cartCount.subscribe(cartCount => {
      this.cartCount.set(cartCount);
    });

    this.count = this.instagramFeedService.getFeedsCount();

    // Init Feed
    this.openedFeed$ = this.instagramFeedService.openedFeed.subscribe((index) => {
      this.prev.set(index);
      this.buyContainerOpen.set(false);
      this.cartProduct.set(null);

      if (index !== -1) {
        this.feed.set(this.instagramFeedService.getFeed(index));

        if (!this.dialogOpen()) {

          setTimeout(() => {
            this.dialogOpen.set(true);
          }, 300);
        }

      } else {
        this.dialogOpen.set(false);
      }
    });
  }

  ngOnDestroy() {
    if (this.openedFeed$) {
      this.openedFeed$.unsubscribe();
    }
    if (this.cartSub$) {
      this.cartSub$.unsubscribe();
    }
  }

  public onClose(): void {
    this.instagramFeedService.toggleOpenedFeed(-1);
  }

  public nextFeed(): void {
    let i: number = this.prev();
    i++;
    if (i < this.count) {
      this.instagramFeedService.toggleOpenedFeed(i);
    }
  }

  public prevFeed(): void {
    let i: number = this.prev();

    if (i === 0) {
      return;
    }
    i--;
    this.instagramFeedService.toggleOpenedFeed(i);
  }

  public showProduct(url: string): void {
    this.onClose();
    this.router.navigate(['/products', url]).then(() => {});
  }

  public proceedToCheckout(): void {
    this.fsError.set("");
    this.productAdded.set(false);
    this.onClose();
    this.router.navigate(['/cart']).then(() => {});
  }

  public openBuyContainer(product: ProductDetailsType): void {

    if (product.type === "accessory") {

      this.buyProduct.set(product);

      let cartItem: ProductCartType = {
        name: product.name,
        url: product.url,
        price: product.price,
        image: product.image,
        count: "1",
      };

      this.cartService.addToCart(cartItem);
      this.cartProduct.set(cartItem);
      this.productAdded.set(true);
      this.toggleDetailContainer();
      return;
    }

    this.fsError.set("");
    this.buyProduct.set(product);
    this.productAdded.set(false);
    this.resetSizes();
    this.toggleDetailContainer();
  }

  public addToCart(product: ProductDetailsType): void {

    if (this.fsSize === "") {
      this.fsError.set("All options should be selected!");
      return;
    }
    if (product.type === "bra" && this.fsCup === "") {
      this.fsError.set("All options should be selected!");
      return;
    }

    this.fsError.set("");

    let cartItem: ProductCartType = {
      name: product.name,
      url: product.url,
      price: product.price,
      image: product.image,
      count: "1",
    };

    if (product.type === "bra") {

      cartItem.size = {key: this.fsCup, value: this.fsSize};
    }
    else {
      cartItem.size = {key: "", value: this.fsSize};
    }

    this.cartService.addToCart(cartItem);
    this.cartProduct.set(cartItem);
    this.productAdded.set(true);


  }

  public cancelPurchase(): void {
    this.toggleDetailContainer();
  }

  public sizeChange(e: Event, product: ProductDetailsType): void {

    let target = e.target as HTMLInputElement;
    if (target !== null) {
      this.fsSize = target.value;
    }

    if (product.type === "bra") {

      this.checkCups(product);
      return;
    }

    if (product.sizes) {

      let productSizes = this.radioSizes();

      for (let i = 0; i < product.sizes[0].sizes.length; i++) {

        const input = productSizes[i].nativeElement;
        input.disabled = false;
      }

      if (product.sizes[0].sizes.length < productSizes.length) {

        for (let k = product.sizes[0].sizes.length; k < productSizes.length; k++) {

          const input = productSizes[k].nativeElement;
          input.disabled = true;
        }
      }
    }

  }

  public cupChange(e: Event, product: ProductDetailsType): void {

    let target = e.target as HTMLInputElement;
    if (target !== null) {
      this.fsCup = target.value;
    }

    let cupSizes = this.radioSizes();

    if (product.sizes) {

      for (let i = 0; i < product.sizes.length; i++) {

        if (product.sizes[i].key === this.fsCup) {

          for (let j = 0; j < product.sizes[i].sizes.length; j++) {

            const input = cupSizes[j].nativeElement;
            input.disabled = false;
          }

          if (product.sizes[i].sizes.length < cupSizes.length) {

            for (let k = product.sizes[i].sizes.length; k < cupSizes.length; k++) {

              const input = cupSizes[k].nativeElement;
              input.disabled = true;
            }
          }
        }

      }
    }

  }

  private checkCups(product: ProductDetailsType): void {

    let caps = this.radioCups();

    if (product.sizes) {

      for (let i = 0; i < product.sizes.length; i++) {

        let found: boolean = false;

        for (let j = 0; j < product.sizes[i].sizes.length; j++) {

          if (product.sizes[i].sizes[j] === this.fsSize) {
            found = true;
            break;
          }
        }

        const input = caps[i].nativeElement;

        input.disabled = !found;
      }
    }

  }

  private resetSizes(): void {

    const sizes = this.radioSizes();

    if (sizes) {

      sizes.forEach((size) => {
        size.nativeElement.checked = false;
      });
    }

    const cups = this.radioCups();

    if (cups) {
      cups.forEach(cup => {
        cup.nativeElement.checked = false;
      })
    }
  }

  public toggleDetailContainer(): void {
    this.buyContainerOpen.update(value => !value);
  }

  public linkHover(index: number): void {
    this.productLink.set(index);
  }
  public linkReset(): void {
    this.productLink.set(0);
  }
}
