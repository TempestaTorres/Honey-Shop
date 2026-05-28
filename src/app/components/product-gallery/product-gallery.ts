import { Component, DestroyRef, OnInit, signal, WritableSignal } from '@angular/core';
import { ProductType } from '../../products/types/product-type';
import { ProductGallerySlide } from '../product-gallery-slide/product-gallery-slide';
import { ModelsService } from '../../products/data/models/models-service';
import { ProductGalleryService } from './product-gallery-service';
import { Subscription } from 'rxjs';
declare var Swiper: any;

@Component({
  selector: 'app-product-gallery',
  imports: [ProductGallerySlide],
  templateUrl: './product-gallery.html',
})
export class ProductGallery implements OnInit {

  private swiper: any;
  private subscription$: Subscription | undefined;
  public productType: WritableSignal<ProductType | null> = signal<ProductType | null>(null);

  constructor(private destroyRef: DestroyRef,
              private modelsService: ModelsService,
              private galleryService$: ProductGalleryService) {

    this.destroyRef.onDestroy(() => {
      if (this.swiper) {
        this.swiper.destroy();
      }
      if (this.subscription$) {
        this.subscription$.unsubscribe();
      }
    });
  }

  ngOnInit(): void {

    this.subscription$ = this.galleryService$.galleryTrigger$.subscribe(item => {

      if (item !== null) {

        if (this.swiper) {
          this.swiper.destroy();
        }

        this.productType.set(item);

        setTimeout(() => {

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

        }, 400);
      }

    });
  }

  public openModalBio(): void {
    this.modelsService.triggerModalBio(true);
  }
}
