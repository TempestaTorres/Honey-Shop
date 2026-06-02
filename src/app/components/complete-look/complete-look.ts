import {
  afterNextRender,
  Component,
  DestroyRef,
  effect, ElementRef,
  input,
  signal,
  ViewChild,
  WritableSignal
} from '@angular/core';
import { ProductType } from '../../products/types/product-type';
import { Subscription } from 'rxjs';
import { ProductsService } from '../../products/products-service';
import { SwiperSlide } from '../swiper-slide/swiper-slide';
declare var Swiper: any;

@Component({
  selector: 'app-complete-look',
  imports: [SwiperSlide],
  templateUrl: './complete-look.html',
})
export class CompleteLook {
  @ViewChild('swiperElement') swiperElement!: ElementRef;
  className = input.required<string>();
  shopProduct = input.required<ProductType>();

  public loading: WritableSignal<boolean> = signal<boolean>(true);
  public completeLook: WritableSignal<Array<ProductType[]>> = signal<Array<ProductType[]>>([]);

  private productSubscription$: Subscription | undefined;
  private swiper: any;

  constructor(
    private service: ProductsService,
    private destroyRef: DestroyRef,
  ) {
    effect(() => {

      const product = this.shopProduct();

      if (this.swiper) {
        this.swiper.destroy();
        this.loadProducts(product);
      }
    });

    afterNextRender(() => {

      const product = this.shopProduct();

      this.loadProducts(product);
    });

    this.destroyRef.onDestroy(() => {
      if (this.swiper) this.swiper.destroy();

      if (this.productSubscription$) {
        this.productSubscription$.unsubscribe();
      }
    });
  }

  private loadProducts(product: ProductType): void {
    this.loading.set(true);
    this.completeLook.set([]);


    if (product && product.type) {
      this.productSubscription$ = this.service
        .getCompleteLook(product.collection, product.type, product.colorName)
        .subscribe((items) => {
          this.completeLook.set(items);

          if (items.length > 0) {
            this.loading.set(false);
            this.initSwiper();
          }
        });
    }
  }

  private initSwiper(): void {
    const swp = this.swiperElement.nativeElement;

    if (swp) {
      swp.classList.add(this.className());

      setTimeout(() => {
        this.swiper = new Swiper('.' + this.className(), {
          slidesPerView: 'auto',
          spaceBetween: 4,
          keyboard: true,
          navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
            addIcons: false,
          },
          breakpoints: {
            768: {
              centeredSlides: true,
              centeredSlidesBounds: true,
            },
            1024: {
              centeredSlides: false,
              centeredSlidesBounds: false,
            },
          },
        });
      }, 400);
    }
  }
}
