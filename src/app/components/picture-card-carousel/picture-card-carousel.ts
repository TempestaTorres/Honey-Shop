import { afterNextRender, Component, DestroyRef, ElementRef, Input, ViewChild } from '@angular/core';
declare var Swiper: any;

@Component({
  selector: 'app-picture-card-carousel',
  imports: [],
  templateUrl: './picture-card-carousel.html',
})
export class PictureCardCarousel {

  @Input({required: true}) className: string = '';
  @Input({required: true}) slides: {image: string, title: string}[] = [];

  @ViewChild('swiperElement') swiperElement!: ElementRef;
  private swiper: any;

  constructor(private destroyRef: DestroyRef) {

    afterNextRender(() => {

      const swp = this.swiperElement.nativeElement;

      if (swp) {
        swp.classList.add(this.className);

        this.swiper = new Swiper('.' + this.className, {
          slidesPerView: 'auto',
          spaceBetween: 4,
          keyboard: true,
          grabCursor: true,
          navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
            addIcons: false
          }
        });
      }


    });

    this.destroyRef.onDestroy(() => {
      if (this.swiper) this.swiper.destroy();
    });
  }
}
