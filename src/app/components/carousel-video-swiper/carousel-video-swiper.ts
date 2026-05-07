import { afterNextRender, Component, DestroyRef, ElementRef, Input, ViewChild } from '@angular/core';
import { SwiperVideoCarouselType } from '../../types/swiper-carosel-types';
import { RouterLink } from '@angular/router';
import { VideoPlayer } from '../video-player/video-player';
import { NgClass } from '@angular/common';
declare var Swiper: any;

@Component({
  selector: 'app-carousel-video-swiper',
  imports: [RouterLink, VideoPlayer, NgClass],
  templateUrl: './carousel-video-swiper.html',
})
export class CarouselVideoSwiper {
  @ViewChild('swiperElement') swiperElement!: ElementRef;
  @Input() videoData!: SwiperVideoCarouselType;

  private swiper: any;

  constructor(private destroyRef: DestroyRef) {
    afterNextRender(() => {
      if (this.videoData) {
        const swp = this.swiperElement.nativeElement;

        if (swp) {
          swp.classList.add(this.videoData.className);

          this.swiper = new Swiper('.' + this.videoData.className, this.videoData.swiperOptions);
        }
      }
    });

    this.destroyRef.onDestroy(() => {
      if (this.swiper) {
        this.swiper.destroy();
      }
    });
  }
}
