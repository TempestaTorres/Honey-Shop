import { afterNextRender, Component, DestroyRef, ElementRef, input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ShopTheLookService } from './shop-the-look-service';
import { Subscription } from 'rxjs';
import { ShopTheLookType } from './data/shop-the-look-data';
import { RouterLink } from '@angular/router';
import { ObserveElementDirective } from '../../directives/scroll-observer';
import { IntersectingService } from '../../services/intersecting-service';
declare var Swiper: any;

@Component({
  selector: 'app-shop-the-look',
  imports: [RouterLink, ObserveElementDirective],
  templateUrl: './shop-the-look.html',
  styleUrl: './shop-the-look.css',
})
export class ShopTheLook implements OnInit, OnDestroy {
  @ViewChild('textSwiper', { static: true }) textSwiper!: ElementRef;
  @ViewChild('imageSwiper', { static: true }) imageSwiper!: ElementRef;

  // Here we should have input type data for request
  dataIndex = input.required<number>();

  private leftSwiper: any;
  private rightSwiper: any;

  private subscription$: Subscription | undefined;

  public shopTheLookData!: ShopTheLookType;

  private shopTheLookIndex: number = 0;

  constructor(
    private destroyRef: DestroyRef,
    private shopTheLookService: ShopTheLookService,
    private intersectingService: IntersectingService,
  ) {
    afterNextRender(() => {
      let classNameLeft: string =
        'js-carousel-swiper-shop-the-look-left-' + String(this.dataIndex());

      let classNameRight: string =
        'js-carousel-swiper-shop-the-look-right-' + String(this.dataIndex());

      this.textSwiper.nativeElement.classList.add(classNameLeft);
      this.imageSwiper.nativeElement.classList.add(classNameRight);

      this.leftSwiper = new Swiper('.' + classNameLeft, {
        slidesPerView: 'auto',
        watchSlidesProgress: true,
        slideToClickedSlide: true,
        allowTouchMove: false,
        effect: 'fade',
        fadeEffect: {
          crossFade: true,
        },
      });

      this.rightSwiper = new Swiper('.' + classNameRight, {
        slidesPerView: 'auto',
        watchSlidesProgress: true,
        slideToClickedSlide: true,
        allowTouchMove: false,
        keyboard: true,
        autoplay: {
          delay: 5000,
          disableOnInteraction: false
        },
        speed: 700,
        loop: true,
        effect: 'fade',
        fadeEffect: {
          crossFade: true,
        },
        pagination: {
          el: '.swiper-pagination',
          type: "progressbar"
        },
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
          addIcons: false,
        },
      });

      this.rightSwiper.on("slideChange", this.slideChanged.bind(this));

    });


    this.destroyRef.onDestroy(() => {
      if (this.leftSwiper) {
        this.leftSwiper.destroy();
      }
      if (this.rightSwiper) {
        this.rightSwiper.destroy();
      }
    });
  }

  private slideChanged() {

    this.shopTheLookIndex = this.rightSwiper.realIndex;

    this.leftSwiper.slideTo(this.shopTheLookIndex);

  }

  ngOnInit(): void {
    this.subscription$ = this.shopTheLookService
      .getShopTheLookData(this.dataIndex())
      .subscribe((shopTheLookData) => {
        this.shopTheLookData = shopTheLookData;
      });
  }

  ngOnDestroy(): void {
    if (this.subscription$) {
      this.subscription$.unsubscribe();
    }
  }

  public triggerShopTheLook(): void {
    let url: string = this.shopTheLookData.slides[this.shopTheLookIndex].url;

    this.shopTheLookService.triggerShopTheLook(url);

  }

  public isIntersecting(status: boolean, element: HTMLElement) {
    this.intersectingService.isIntersecting(status, element);
  }
}
