import { Component, OnInit } from '@angular/core';
import { ScrollingService } from '../../services/scrolling-service';
import { AboutCarouselSwiper } from '../../components/about-carousel-swiper/about-carousel-swiper';
import { HeroCarousel } from '../../components/hero-carousel/hero-carousel';
import { ObserveElementDirective } from '../../directives/scroll-observer';
import { TabList } from '../../components/tab-list/tab-list';
import { IntersectingService } from '../../services/intersecting-service';
import { HoneyClub, HoneyTabs, tabTypes } from '../../types/tabs/tab-types';
import { HoneyClubDataTabs, HoneyClubFaqs } from '../../data/honey-club-data';
import { FaqType } from '../../types/faq-type';
import { AccordionList } from '../../components/accordion-list/accordion-list';
import { HeroType } from '../../types/hero-type';

@Component({
  selector: 'app-the-honey-club',
  imports: [AboutCarouselSwiper, HeroCarousel, ObserveElementDirective, TabList, AccordionList],
  templateUrl: './the-honey-club.html',
  styleUrl: './the-honey-club.css',
})
export class TheHoneyClub implements OnInit {

  public tabTitles: string[] = ['Gold', 'Diamond', 'Platinum', 'Invite Only'];
  public tabsContent: HoneyTabs = {
    type: tabTypes.HONEY_CLUB,
    tabs: [...HoneyClubDataTabs] as HoneyClub[],
  };

  public honeyClubFaqs: FaqType[] = [...HoneyClubFaqs];

  public topHeroCarousel: HeroType = {
    class: "js-hero-carousel",
    slides: [
      {
        image: "/assets/images/common/Header_Desktop.jpg",
        imageUrl: {
          url: "/join-honey",
          param: null
        },
        content: {
          hasContent: true,
          title: "The Honey Club",
          text: "Friends with benefits, only better. Sign up for perks such as early access, free gifts, and exclusive concierge services.",
          button: {
            hasButton: true,
            buttonType: "link-underline",
            buttonText: "Join Now",
          }
        }
      },
      {
        image: "/assets/images/common/video_buffer.jpg",
        imageUrl: {
          url: "/collections",
          param: "chastity-navy-lingerie-collection"
        },
        content: {
          hasContent: false,
          title: "",
          text: "",
          button: {
            hasButton: false,
            buttonType: "",
            buttonText: "",
          }
        }
      }
    ],
    pagination: true,
    navigation: false,
    swiperOptions: {
      pagination: {
        el: '.swiper-pagination',
        type: 'bullets',
        clickable: true
      },
      effect: "fade",
      fadeEffect: {
        crossFade: true
      },
      virtualTranslate: true,
      keyboard: true
    }
  }
  public bottomHeroCarousel: HeroType = {
    class: "js-footer-hero-carousel",
    slides: [
      {
        image: "/assets/images/common/Footer_Desktop.jpg",
        imageUrl: {
          url: "/join-honey",
          param: null
        },
        content: {
          hasContent: true,
          title: "The Honey Club",
          text: "Don’t wait! Sign up to The Honey Club and unlock your rewards. It's ready and waiting.",
          button: {
            hasButton: true,
            buttonType: "button-blur",
            buttonText: "Join Now",
          }
        }
      },
    ],
    pagination: true,
    navigation: false,
    swiperOptions: {
      pagination: {
        el: '.swiper-pagination',
        type: 'bullets',
        clickable: true
      },
      effect: "fade",
      fadeEffect: {
        crossFade: true
      },
      virtualTranslate: true,
      keyboard: true
    }
  }

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
