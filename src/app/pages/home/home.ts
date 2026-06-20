import { Component, OnDestroy, OnInit } from '@angular/core';
import { ScrollingService } from '../../services/scrolling-service';
import { HeroVideoCarousel } from '../../components/hero-video-carousel/hero-video-carousel';
import { HeroType, HeroVideoType } from '../../types/hero-type';
import { IntersectingService } from '../../services/intersecting-service';
import { ObserveElementDirective } from '../../directives/scroll-observer';
import { RouterLink } from '@angular/router';
import { ProductCarousel } from '../../components/product-carousel/product-carousel';
import { HeroCarousel } from '../../components/hero-carousel/hero-carousel';
import { SwiperVideoCarouselType } from '../../types/swiper-carosel-types';
import { CarouselVideoSwiper } from '../../components/carousel-video-swiper/carousel-video-swiper';
import { InstagramFeed } from '../../components/instagram-feed/instagram-feed';
import { ShopTheLook } from '../../components/shop-the-look/shop-the-look';
import { ShopTheLookModal } from '../../components/shop-the-look-modal/shop-the-look-modal';
import { ProductsService } from '../../products/products-service';
import { Subscription } from 'rxjs';
import { CollectionsNewsType } from '../../products/types/collections-news-type';
import { VideoDataService } from '../../services/video-data-service';
import { VideoDataType } from '../../data/video-data';
import { ParallaxBanner, ParallaxDataType } from '../../components/parallax-banner/parallax-banner';

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
    ShopTheLook,
    ShopTheLookModal,
    ParallaxBanner,
  ],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit, OnDestroy {
  public topHeroCarousel: HeroVideoType = {
    class: 'js-hero-video-carousel',
    slides: [
      {
        desktopImage: '',
        mobileImage: '',
        imageUrl: {
          url: '/collections',
          param: 'all-lingerie',
        },
        content: {
          hasContent: true,
          title: 'CHERRY',
          text: 'Introducing',
          button: {
            hasButton: true,
            buttonType: 'link-underline',
            buttonText: 'Shop New',
          },
        },
      },
      {
        desktopImage: '',
        mobileImage: '',
        imageUrl: {
          url: '/collections',
          param: 'new-lingerie',
        },
        content: {
          hasContent: true,
          title: 'EVERLY',
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
  public bottomHeroCarousel: HeroVideoType = {
    class: 'js-carousel-swiper-hero-auto-play',
    slides: [
      {
        desktopImage: '',
        mobileImage: '',
        imageUrl: {
          url: '/collections',
          param: 'lets-ride',
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
      {
        desktopImage: '',
        mobileImage: '',
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
  public salesCarousel: HeroType = {
    class: 'js-sales-hero-carousel',
    slides: [
      {
        image: '/assets/images/categories/Fullwidth_Banner_roses_Desktop.jpg',
        mobileImage: '/assets/images/categories/Banner_Mobile_1.jpg',
        imageUrl: {
          url: '/collections',
          param: 'all-lingerie',
        },
        content: {
          hasContent: false,
          title: '',
          button: {
            hasButton: false,
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

  public parallaxData: ParallaxDataType = {
    desktopImg: '/assets/images/banners/BEST_SELLERS.jpg',
    mobileImg: '/assets/images/banners/BEST_SELLERS_MOBILE.jpg',
    url: '/collections',
    urlParam: 'all-lingerie',
    title: 'THE SALE THAT UNDRESSES ITSELF',
    button: {
      hasButton: true,
      buttonType: 'button-link-underline',
      buttonText: 'SHOP NOW',
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
      {
        videoSrc: '/assets/video/honey-gift.mp4',
        videoUrl: {
          url: '/shipping-delivery',
          param: null,
        },
        content: {
          title: 'Luxe & Discreet',
          description:
            'Wrapped in pleasure, sealed with secrecy. Whether it’s for you or a lover, all orders arrive in style with discreet packaging.',
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

  public slideShowDataIndex: number = 0;

  private subscriptions: Subscription = new Subscription();

  public collectionsNewsData: CollectionsNewsType[] = [];
  public videoData: VideoDataType[] = [];

  public isOff: boolean;

  constructor(
    private scrollingService: ScrollingService,
    private intersectingService: IntersectingService,
    private productsService: ProductsService,
    private videoDataService: VideoDataService,
  ) {
    this.isOff = this.productsService.isOff();
  }

  ngOnInit() {
    this.scrollingService.toTop();

    const newsSub = this.productsService.getCollectionsNews().subscribe((news) => {
      this.collectionsNewsData = news;
    });

    this.subscriptions.add(newsSub);

    const videoSub = this.videoDataService.getTopHomeVideoData().subscribe((videos) => {
      this.videoData = videos;

      this.topHeroCarousel.slides[0].desktopImage = videos[0].desktopVideo;
      this.topHeroCarousel.slides[0].mobileImage = videos[0].mobileVideo;
      this.topHeroCarousel.slides[1].desktopImage = videos[1].desktopVideo;
      this.topHeroCarousel.slides[1].mobileImage = videos[1].mobileVideo;

      this.bottomHeroCarousel.slides[0].desktopImage = videos[2].desktopVideo;
      this.bottomHeroCarousel.slides[0].mobileImage = videos[2].mobileVideo;
      this.bottomHeroCarousel.slides[1].desktopImage = videos[3].desktopVideo;
      this.bottomHeroCarousel.slides[1].mobileImage = videos[3].mobileVideo;
    });

    this.subscriptions.add(videoSub);
  }

  ngOnDestroy(): void {
    if (this.subscriptions) {
      this.subscriptions.unsubscribe();
    }
  }

  public isIntersecting(status: boolean, element: HTMLElement) {
    this.intersectingService.isIntersecting(status, element);
  }
}
