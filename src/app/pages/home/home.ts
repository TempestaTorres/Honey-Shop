import { Component, OnInit } from '@angular/core';
import { ScrollingService } from '../../services/scrolling-service';
import { HeroVideoCarousel } from '../../components/hero-video-carousel/hero-video-carousel';
import { HeroVideoType } from '../../types/hero-type';
import { IntersectingService } from '../../services/intersecting-service';
import { ObserveElementDirective } from '../../directives/scroll-observer';
import { RouterLink } from '@angular/router';
import { ProductCarousel } from '../../components/product-carousel/product-carousel';

@Component({
  selector: 'app-home',
  imports: [HeroVideoCarousel, ObserveElementDirective, RouterLink, ProductCarousel],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit {
  public topHeroCarousel: HeroVideoType = {
    class: 'js-hero-video-carousel',
    slides: [
      {
        desktopImage: '/assets/video/home-desktop.mp4',
        mobileImage: '/assets/video/home-mobile.mp4',
        imageUrl: {
          url: '/collections',
          param: 'new-lingerie',
        },
        content: {
          hasContent: true,
          title: 'WHITNEY',
          title2: 'CHARTREUSE',
          text: 'Introducing',
          button: {
            hasButton: true,
            buttonType: 'link-underline',
            buttonText: 'Shop New',
          },
        },
      },
    ],
    pagination: true,
    navigation: false,
    swiperOptions: {
      pagination: {
        el: '.swiper-pagination',
        type: 'bullets',
        clickable: true,
      },
      effect: 'fade',
      fadeEffect: {
        crossFade: true,
      },
      virtualTranslate: true,
      keyboard: true,
    },
  };
  constructor(
    private scrollingService: ScrollingService,
    private intersectingService: IntersectingService,
  ) {}

  ngOnInit() {
    this.scrollingService.toTop();
  }

  public isIntersecting(status: boolean, element: HTMLElement) {
    this.intersectingService.isIntersecting(status, element);
  }
}
