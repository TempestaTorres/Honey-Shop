import { afterNextRender, Component, DestroyRef, input } from '@angular/core';
import { ProductType } from '../../products/types/product-type';
import { ProductGallerySlide } from '../product-gallery-slide/product-gallery-slide';
declare var Swiper: any;

@Component({
  selector: 'app-product-gallery',
  imports: [ProductGallerySlide],
  templateUrl: './product-gallery.html',
})
export class ProductGallery {
  product = input.required<ProductType>();

  private swiper: any;

  constructor(private destroyRef: DestroyRef) {

    afterNextRender(() => {

      // Initialize swiper
      this.swiper = new Swiper('.js-carousel-swiper-gallery', {
        slidesPerView: 1,
        keyboard: true,
        pagination: {
          el: '.swiper-pagination',
          type: "progressbar"
        },
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
          addIcons: false,
        }
      });

    })

    this.destroyRef.onDestroy(() => {
      if (this.swiper) {
        this.swiper.destroy();
      }
    });
  }
}
