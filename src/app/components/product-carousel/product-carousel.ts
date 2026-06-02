import {
  afterNextRender,
  Component,
  DestroyRef, effect, ElementRef, input,
  signal, ViewChild,
  WritableSignal
} from '@angular/core';
import { ProductsService } from '../../products/products-service';
import { ProductItem } from '../../products/types/product-type';
import { Subscription } from 'rxjs';
import { SwiperSlide } from '../swiper-slide/swiper-slide';
declare var Swiper: any;

@Component({
  selector: 'app-product-carousel',
  imports: [SwiperSlide],
  templateUrl: './product-carousel.html',
})
export class ProductCarousel {
  requestType = input.required<string>();
  className = input.required<string>();

  @ViewChild('swiperElement') swiperElement!: ElementRef;

  public loading: WritableSignal<boolean> = signal<boolean>(true);
  public products: WritableSignal<ProductItem[]> = signal<ProductItem[]>([]);

  public medium: WritableSignal<boolean> = signal<boolean>(false);

  private productSubscription$: Subscription | undefined;
  private swiper: any;

  constructor(private service: ProductsService, private destroyRef: DestroyRef) {

    effect(() => {

      const type = this.requestType();

      if (this.swiper) {
        this.swiper.destroy();
        this.loadProducts(type);
      }
    });


    afterNextRender(() => {

      const type = this.requestType();
      this.loadProducts(type);

    });

    this.destroyRef.onDestroy(() => {
      if (this.swiper) this.swiper.destroy();

      if (this.productSubscription$) {
        this.productSubscription$.unsubscribe();
      }
    });
  }

  private loadProducts(type: string): void {

    this.products.set([]);
    this.loading.set(true);
    this.medium.set(false);

    if (this.productSubscription$) {
      this.productSubscription$.unsubscribe();
    }

    if (type === 'new-arrivals') {
      this.productSubscription$ = this.service.getNewArrivals().subscribe((items) => {
        this.products.set(items);

        if (this.products().length > 0) {
          this.loading.set(false);

          this.initSwiper();
        }
      });
    }
    else if (type === 'bridal-lingerie') {

      this.productSubscription$ = this.service.getBridalLingerie().subscribe((items) => {
        this.products.set(items);

        if (this.products().length > 0) {
          this.loading.set(false);
          this.initSwiper();
        }
      });

    }
    else if (type === 'recommended') {

      this.productSubscription$ = this.service.getRecommended().subscribe((items) => {
        this.products.set(items);

        if (this.products().length > 0) {
          this.loading.set(false);
          this.medium.set(true);
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
          grabCursor: true,
          navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
            addIcons: false
          },
          breakpoints: {

            768: {
              centeredSlides: true,
              centeredSlidesBounds: true,
            },
            1024: {
              centeredSlides: false,
              centeredSlidesBounds: false,
            }
          }

        });
      }, 400);

    }
  }

}
