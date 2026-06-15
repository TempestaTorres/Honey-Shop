import {
  afterNextRender,
  Component,
  DestroyRef,
  ElementRef,
  input, OnInit,
  signal,
  viewChild,
  WritableSignal
} from '@angular/core';
import { ProductType } from '../../products/types/product-type';
import { WishlistService } from '../../product-wishlist/wishlist-service';
import { ProductCartType } from '../../product-cart/cart-type/product-cart-type';
import { SelectSizeService } from '../../modals/select-size-modal/select-size-service';
import { ProductCartService } from '../../product-cart/services/product-cart-service';
import { RouterLink } from '@angular/router';
import { CurrencyPipe } from '@angular/common';
import { SwiperService } from '../../services/swiper-service';
import { Subscription } from 'rxjs';
import { VideoPlayer } from '../video-player/video-player';

@Component({
  selector: 'app-collection-card',
  imports: [RouterLink, CurrencyPipe, VideoPlayer],
  templateUrl: './collection-card.html',
  styleUrl: './collection-card.css',
})
export class CollectionCard implements OnInit {
  productItem = input.required<ProductType[]>();
  public index: WritableSignal<number> = signal<number>(0);
  public isHidden: WritableSignal<boolean> = signal<boolean>(false);

  readonly cardSwiper = viewChild<ElementRef<HTMLElement>>('collectionCardSwiper');
  private swiperClassName: string = '';
  private swiper: any;
  private swiperSubscription: Subscription | undefined;

  constructor(
    private destroyRef: DestroyRef,
    private wishlistService$: WishlistService,
    private selectSizeService: SelectSizeService,
    private cartService: ProductCartService,
    private swiperService: SwiperService,
  ) {
    afterNextRender(() => {
      const items = this.productItem();
      if (items.length > 0) {
        this.init();
      }
    });

    this.destroyRef.onDestroy(() => {
      if (this.swiper) this.swiper.destroy();
      if (this.swiperSubscription) this.swiperSubscription.unsubscribe();
    });
  }

  ngOnInit(): void {
    this.swiperSubscription = this.swiperService.needWatchResizing$.subscribe((value) => {
      if (value && this.swiper) {
        this.isHidden.set(value);
        this.swiper.destroy();
        setTimeout(() => {
          this.init();
          this.isHidden.set(false);
        }, 300);
      }
    });
  }

  public mouseEnter(): void {
    if (this.swiper) {
      this.swiper.slideNext();
    }
  }

  public mouseLeave(): void {
    if (this.swiper) {
      this.swiper.slidePrev();
    }
  }

  public addToWishList(index: number): void {
    const items = this.productItem();

    let product: ProductCartType = {
      name: items[index].name,
      url: items[index].url,
      price: String(items[index].price),
      image: items[index].images[0],
      count: '',
      favorite: items[index].favorite,
    };
    this.wishlistService$.wishlistToggle(product);
  }

  public addToCart(index: number): void {
    const items = this.productItem();
    const product = items[index];

    if (product.type !== 'accessory') {
      // Open select size modal window
      this.selectSizeService.triggerSizeSelectionChanged(product);
    } else {
      const item = this.cartService.productTypeToCartType(product);
      requestAnimationFrame(() => {
        this.cartService.addToCart(item);
      });
    }
  }

  public selectColorItemClick(index: number): void {
    if (index === this.index()) return;

    this.index.set(index);
  }

  private init(): void {
    const swp = this.cardSwiper();

    if (swp) {
      if (this.swiperClassName !== '') {
        swp.nativeElement.classList.remove(this.swiperClassName);
      }
      const d = new Date();
      let time: number = d.getTime();

      this.swiperClassName = `js-collection-card-swiper-${time}`;
      swp.nativeElement.classList.add(this.swiperClassName);

      let swpSelector: string = '.' + this.swiperClassName;

      this.swiper = this.swiperService.initDefSwiperWithProgressBarOnly(swpSelector);
    }
  }
}
