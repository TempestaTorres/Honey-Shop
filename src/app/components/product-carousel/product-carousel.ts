import {
  afterNextRender,
  Component,
  DestroyRef, ElementRef,
  Input,
  OnDestroy,
  OnInit,
  signal, ViewChild,
  WritableSignal
} from '@angular/core';
import { ProductsService } from '../../products/products-service';
import { ProductItem, ProductRequestType } from '../../products/types/product-type';
import { Subscription } from 'rxjs';
import { SwiperSlide } from '../swiper-slide/swiper-slide';
declare var Swiper: any;

@Component({
  selector: 'app-product-carousel',
  imports: [SwiperSlide],
  templateUrl: './product-carousel.html',
})
export class ProductCarousel implements OnInit, OnDestroy {
  @Input() requestType: ProductRequestType = {type: ''};
  @Input() className: string = '';

  @ViewChild('swiperElement') swiperElement!: ElementRef;

  public loading: WritableSignal<boolean> = signal<boolean>(true);
  public products: ProductItem[] = [];

  private productSubscription$: Subscription | undefined;
  private swiper: any;

  constructor(private service: ProductsService, private destroyRef: DestroyRef) {

    afterNextRender(() => {

      const swp = this.swiperElement.nativeElement;

      if (swp) {
        swp.classList.add(this.className);

        this.swiper = new Swiper('.' + this.className, {
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
      }

    });

    this.destroyRef.onDestroy(() => {
      if (this.swiper) this.swiper.destroy();
    });
  }

  ngOnInit() {

    if (this.requestType.type === 'new-arrivals') {
      this.productSubscription$ = this.service.getNewArrivals().subscribe((items) => {
        this.products = items;

        if (this.products.length > 0) {
          this.loading.set(false);
        }
      });
    }
    else if (this.requestType.type === 'bridal-lingerie') {

      this.productSubscription$ = this.service.getBridalLingerie().subscribe((items) => {
        this.products = items;

        if (this.products.length > 0) {
          this.loading.set(false);
        }
      });


    }
  }

  ngOnDestroy() {
    if (this.productSubscription$) {
      this.productSubscription$.unsubscribe();
    }
  }
}
