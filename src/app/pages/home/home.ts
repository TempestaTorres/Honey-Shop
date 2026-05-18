import { Component, OnInit } from '@angular/core';
import { ScrollingService } from '../../services/scrolling-service';
import { HeroVideoCarousel } from '../../components/hero-video-carousel/hero-video-carousel';
import { HeroType, HeroVideoType } from '../../types/hero-type';
import { IntersectingService } from '../../services/intersecting-service';
import { ObserveElementDirective } from '../../directives/scroll-observer';
import { RouterLink } from '@angular/router';
import { ProductCarousel } from '../../components/product-carousel/product-carousel';
import { HeroCarousel } from '../../components/hero-carousel/hero-carousel';
import { SwiperVideoCarouselType, SwiperVideoSlide } from '../../types/swiper-carosel-types';
import { CarouselVideoSwiper } from '../../components/carousel-video-swiper/carousel-video-swiper';
import { InstagramFeed } from '../../components/instagram-feed/instagram-feed';

@Component({
  selector: 'app-home',
  imports: [
    HeroVideoCarousel,
    ObserveElementDirective,
    RouterLink,
    ProductCarousel,
    HeroCarousel,
    CarouselVideoSwiper,
    InstagramFeed,
  ],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit {

  private videos: {desktop: string, tablet: string}[] = [
    {
      desktop: '/assets/video/desktop-hero-2.mp4',
      tablet: '/assets/video/mobile-hero-2.mp4'
    },
    {
      desktop: '/assets/video/desktop-home-hero.mp4',
      tablet: '/assets/video/mobile-home-hero.mp4'
    },
    {
      desktop: '/assets/video/home-desktop.mp4',
      tablet: '/assets/video/home-mobile.mp4'
    },
  ];

  public topHeroCarousel: HeroVideoType = {
    class: 'js-hero-video-carousel',
    slides: [
      {
        desktopImage: this.videos[0].desktop,
        mobileImage: this.videos[0].tablet,
        imageUrl: {
          url: '/collections',
          param: 'new-lingerie',
        },
        content: {
          hasContent: true,
          title: 'ELODIE',
          title2: 'ROMANCE',
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
  public bestsellersCarousel: HeroType = {
    class: 'js-bestsellers-hero-carousel',
    slides: [
      {
        image: '/assets/images/common/BESTSELLERS.jpg',
        imageUrl: {
          url: '/collections',
          param: 'bestsellers',
        },
        content: {
          hasContent: true,
          title: 'BESTSELLERS',
          button: {
            hasButton: true,
            buttonType: 'link-underline',
            buttonText: 'DISCOVER',
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
  public bridalCarousel: HeroType = {
    class: 'js-bridal-hero-carousel',
    slides: [
      {
        image: '/assets/images/categories/BRIDAL.jpg',
        imageUrl: {
          url: '/bridal-edit',
          param: null,
        },
        content: {
          hasContent: true,
          title: 'BRIDAL',
          button: {
            hasButton: true,
            buttonType: 'link-underline',
            buttonText: 'DISCOVER',
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
  public bottomHeroCarousel: HeroVideoType = {
    class: 'js-carousel-swiper-hero-auto-play',
    slides: [
      {
        desktopImage: '/assets/video/home-desktop-2.mp4',
        mobileImage: '/assets/video/home-mobile-2.mp4',
        imageUrl: {
          url: '/collections',
          param: 'simple-pleasures',
        },
        content: {
          hasContent: false,
          title: '',
          title2: '',
          text: '',
          button: {
            hasButton: false,
            buttonType: 'link-underline',
            buttonText: '',
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
  public servicesVideoData: SwiperVideoCarouselType = {
    className: 'js-carousel-swiper-three-column',
    slides: [
      {
        videoSrc: '/assets/video/honey-delivery.mp4',
        videoUrl: {
          url: '/returns-exchanges',
          param: null,
        },
        content: {
          title: 'Free Shipping & Easy Returns',
          description:
            'Changed your mind? Shipping is on us. International orders are a little different, but our team is here to help and guide you through the process.',
          button: {
            className: 'link',
            buttonText: 'Find out more',
          },
        },
      },
      {
        videoSrc: '/assets/video/appointment.mp4',
        videoUrl: {
          url: '/services',
          param: null,
        },
        content: {
          title: 'Book an Appointment',
          description:
            'Want the VIP treatment? Enjoy a personalized fitting, product insights, and styling advice in the comfort of one of our boutiques.',
          button: {
            className: 'link',
            buttonText: 'Find out more',
          },
        },
      },
      {
        videoSrc: '/assets/video/honey-gift.mp4',
        videoUrl: {
          url: '/the-honey-club',
          param: null,
        },
        content: {
          title: 'The Honey Club',
          description:
            'Friends with benefits, only better. Sign up for perks such as early access, free gifts, and exclusive concierge services.',
          button: {
            className: 'link',
            buttonText: 'Find out more',
          },
        },
      },
    ],
    pagination: false,
    navigation: false,
    swiperOptions: {
      slidesPerView: 'auto',
      centeredSlides: true,
      centeredSlidesBounds: true,
      spaceBetween: 4,
      keyboard: true,
      breakpoints: {
        768: {
          slidesPerView: 'auto',
          spaceBetween: 12,
        },
        1024: {
          slidesPerView: 3,
          spaceBetween: 16,
        },
      },
    },
  };

  public videoOverlay: string[] = [
    "/assets/images/common/VIDEO_BUFFER_3.jpg",
    "/assets/images/common/VIDEO_BUFFER_21.jpg",
    "/assets/images/common/underlay.jpg",
  ];
  public currentUnderlay: number = 0;

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
