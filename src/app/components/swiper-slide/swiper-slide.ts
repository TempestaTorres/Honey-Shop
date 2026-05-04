import {
  afterNextRender,
  Component,
  DestroyRef,
  ElementRef,
  Input,
  signal,
  viewChild,
  WritableSignal
} from '@angular/core';
import { ProductType } from '../../products/types/product-type';
import { RouterLink } from '@angular/router';
import { NgClass } from '@angular/common';
declare var Swiper: any;

@Component({
  selector: 'app-swiper-slide',
  imports: [RouterLink, NgClass],
  templateUrl: './swiper-slide.html',
})
export class SwiperSlide {
  @Input() product: ProductType[] = [];

  public index: WritableSignal<number> = signal<number>(0);

  private swiper: any;
  private carouselSwp = viewChild<ElementRef<HTMLElement>>('carouselSwiper');
  private swiperClassName: string = '';

  constructor(private destroyRef: DestroyRef) {
    afterNextRender(() => {

      this.initSwiper();

    });

    this.destroyRef.onDestroy(() => {
      if (this.swiper) this.swiper.destroy();
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

  public selectColorItemClick(index: number): void {

    if (index === this.index()) return;

    if (this.swiper) {
      this.swiper.destroy();
    }
    this.index.set(index);

    setTimeout(() => {
      this.initSwiper();
    }, 600);
  }

  public addToWishList(index: number): void {

    console.log('Add to Wishlist',this.product[index]);
  }

  public addToCart(index: number): void {

    console.log('Add to Cart',this.product[index]);
  }

  private initSwiper(): void {

    if (this.swiperClassName === '') {

      const d = new Date();
      let time: number = d.getTime();

      this.swiperClassName = `js-carousel-swiper-${time}`;

      let swp = this.carouselSwp();

      if (swp) {
        swp.nativeElement.classList.add(this.swiperClassName);
      }
    }

    let swpSelector: string = "." + this.swiperClassName;

    let options = {
      pagination: {
        el: '.swiper-pagination',
        type: 'progressbar',
      },

    }

    this.swiper = new Swiper(swpSelector, options);
  }
}
