import { afterNextRender, Component, DestroyRef, OnDestroy, OnInit, signal, WritableSignal } from '@angular/core';
import { ObserveElementDirective } from '../../directives/scroll-observer';
import { IntersectingService } from '../../services/intersecting-service';
import { Subscription } from 'rxjs';
import { InstagramFeedsService } from '../../services/instagram-feeds-service';
import { InstagramFeedType } from '../../types/instagram/instagram-feeds-type';
import { NgStyle } from '@angular/common';
declare var Swiper: any;

@Component({
  selector: 'app-instagram-feed',
  imports: [ObserveElementDirective, NgStyle],
  templateUrl: './instagram-feed.html',
  styleUrl: './instagram-feed.css',
})
export class InstagramFeed implements OnInit, OnDestroy {

  public instaFeeds$: Subscription | undefined;

  public feeds: InstagramFeedType[] = [];
  public focused: WritableSignal<number> = signal<number>(-1);

  private swiper: any;

  constructor(
    private intersectingService: IntersectingService,
    private instagramFeedsService: InstagramFeedsService,
    private destroyRef: DestroyRef
  ) {

    afterNextRender(() => {

      this.swiper = new Swiper(".fs-instagram-slider", {

        keyboard: true,
        navigation: {
          nextEl: ".fs-slider-next-button",
          prevEl: ".fs-slider-prev-button",
          addIcons: false
        },
        breakpoints: {
          320: {
            slidesPerView: "auto",
            slidesPerGroup: 1,
          },
          768: {
            slidesPerView: "auto",
            slidesPerGroup: 3,
          },
          1440: {
            slidesPerView: "auto",
            slidesPerGroup: 5,
          }
        }

      });
    });

    this.destroyRef.onDestroy(() => {
      if (this.swiper) this.swiper.destroy();

      document.body.removeEventListener("click", this.onFocusOut.bind(this));
    });
  }

  ngOnInit() {
    this.instagramFeedsService.getInstagramFeeds().subscribe((feeds) => {
      this.feeds = feeds;
    });

    document.body.addEventListener("click", this.onFocusOut.bind(this));
  }

  ngOnDestroy() {
    if (this.instaFeeds$) {
      this.instaFeeds$.unsubscribe();
    }
  }

  public onTimeLineClick(index: number): void {
    this.instagramFeedsService.toggleOpenedFeed(index);
    this.focused.set(index);
  }

  public isIntersecting(status: boolean, element: HTMLElement) {
    this.intersectingService.isIntersecting(status, element);
  }

  public onFocusOut(event: MouseEvent): void {

    let target = event.target as HTMLElement;

    if (!target.classList.contains('fs-text-container') && !this.instagramFeedsService.isFeedOpened()
      && !target.classList.contains('fs-detail-nav-button')) {
      this.focused.set(-1);
    }
  }
}
