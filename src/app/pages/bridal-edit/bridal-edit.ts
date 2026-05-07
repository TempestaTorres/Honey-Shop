import { Component, OnInit } from '@angular/core';
import { HeroCarousel } from '../../components/hero-carousel/hero-carousel';
import { HeroType } from '../../types/hero-type';
import { ScrollingService } from '../../services/scrolling-service';
import { ProductsTabList } from '../../components/products-tab-list/products-tab-list';
import { ListTabs } from '../../types/tabs/tab-types';
import { ObserveElementDirective } from '../../directives/scroll-observer';
import { IntersectingService } from '../../services/intersecting-service';
import { Router, RouterLink } from '@angular/router';
import { VideoPlayer } from '../../components/video-player/video-player';
import { PictureCardCarousel } from '../../components/picture-card-carousel/picture-card-carousel';

@Component({
  selector: 'app-bridal-edit',
  imports: [
    HeroCarousel,
    ProductsTabList,
    ObserveElementDirective,
    RouterLink,
    VideoPlayer,
    PictureCardCarousel,
  ],
  templateUrl: './bridal-edit.html',
  styleUrl: './bridal-edit.css',
})
export class BridalEdit implements OnInit {
  public topHeroCarousel: HeroType = {
    class: 'js-hero-bridal-edit-carousel',
    slides: [
      {
        image: '/assets/images/common/Bridal-Hero.jpg',
        imageUrl: {
          url: null,
          param: null,
        },
        content: {
          hasContent: true,
          subtitle: 'INTRODUCING',
          title: 'The Bridal Edit',
          text: 'FROM "I DO" TO "OH YES".',
          button: {
            hasButton: false,
            buttonType: 'link-underline',
            buttonText: 'Join Now',
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
  public productTabs: ListTabs = {
    tabs: [
      {
        title: 'Bridal Lingerie',
        tabUrl: {
          url: '/collections',
          param: 'bridal-lingerie',
        },
        button: 'Shop All',
        productUrl: 'bridal-lingerie',
      },
    ],
  };
  public bridalSlides = [
    {
      image: '/assets/images/slides/bridal/bridal-1.jpg',
      title: 'BRIDAL EDIT'
    },
    {
      image: '/assets/images/slides/bridal/bridal-2.jpg',
      title: 'BRIDAL EDIT'
    },
    {
      image: '/assets/images/slides/bridal/bridal-3.jpg',
      title: 'BRIDAL EDIT'
    },
    {
      image: '/assets/images/slides/bridal/bridal-4.jpg',
      title: 'BRIDAL EDIT'
    },
    {
      image: '/assets/images/slides/bridal/bridal-5.jpg',
      title: 'BRIDAL EDIT'
    },
  ];

  constructor(
    private scrollingService: ScrollingService,
    private intersectingService: IntersectingService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.scrollingService.toTop();
  }

  public routeSomethingBlue(): void {
    this.router
      .navigate(['/collections', 'new-lingerie'], { queryParams: { color: 'blue' } })
      .then(() => {});
  }
  public isIntersecting(status: boolean, element: HTMLElement) {
    this.intersectingService.isIntersecting(status, element);
  }
}
