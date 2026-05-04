import { afterNextRender, Component, DestroyRef } from '@angular/core';
import { RouterLink } from '@angular/router';
declare var Swiper: any;

@Component({
  selector: 'app-about-carousel-swiper',
  imports: [RouterLink],
  templateUrl: './about-carousel-swiper.html',
})
export class AboutCarouselSwiper {
  private swiper: any;

  constructor(private destroyRef: DestroyRef) {

    afterNextRender(() => {
      this.swiper = new Swiper('.js-about-carousel-swiper', {
        slidesPerView: 'auto',
        centeredSlides: true,
        centeredSlidesBounds: true,
        spaceBetween: 4,
        keyboard: true,
        breakpoints: {
          768: {
            slidesPerView: "auto",
            spaceBetween: 12
          },
          1024: {
            slidesPerView: 3,
            spaceBetween: 16
          }
        }

      });
    });

    this.destroyRef.onDestroy(() => {
      if (this.swiper)
        this.swiper.destroy();
    });
  }
}
