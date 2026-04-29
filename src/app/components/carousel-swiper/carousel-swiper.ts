import { afterNextRender, Component, DestroyRef } from '@angular/core';
declare var Swiper: any;

@Component({
  selector: 'app-carousel-swiper',
  imports: [],
  templateUrl: './carousel-swiper.html',
  styleUrl: './carousel-swiper.css',
})
export class CarouselSwiper {

  private swiper: any;

  constructor(private destroyRef: DestroyRef) {

    afterNextRender(() => {
      this.swiper = new Swiper('.js-carousel-swiper-topbar', {
        slidesPerView: 1,
        autoplay: {
          delay: 3000
        },
        speed: 300,
        loop: true,
        effect: "fade",
        fadeEffect: {
          crossFade: true
        },
      });
    });

    this.destroyRef.onDestroy(() => {
      this.swiper.destroy();
    });
  }

}
