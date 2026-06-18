import { afterNextRender, Component, DestroyRef, ElementRef, input, ViewChild, viewChild } from '@angular/core';
import { VideoPlayer } from '../video-player/video-player';
declare var Swiper: any;

@Component({
  selector: 'app-image-swiper',
  imports: [VideoPlayer],
  templateUrl: './image-swiper.html',
})
export class ImageSwiper {
  @ViewChild('swiperElement', { static: true }) swiperContainer!: ElementRef;

  images = input.required<string[]>();
  className = input.required<string>();

  private swiper: any;

  constructor(private destroyRef: DestroyRef) {
    afterNextRender(() => {
      let className: string = 'js-image-swiper-' + this.className();

      this.swiperContainer.nativeElement.classList.add(className);

      this.swiper = new Swiper('.' + className, {
        slidesPerView: 'auto',
        keyboard: true,
        grabCursor: true,
      });
    });

    this.destroyRef.onDestroy(() => {
      if (this.swiper) {
        this.swiper.destroy();
      }
    });
  }
}
