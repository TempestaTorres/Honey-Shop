import { afterNextRender, Component, DestroyRef, effect, input, signal, WritableSignal } from '@angular/core';
import { ProductCartType } from '../../product-cart/cart-type/product-cart-type';
import { ProductType } from '../../products/types/product-type';
import { ProductsService } from '../../products/products-service';
import { Subscription } from 'rxjs';
import { PairWithSlide } from '../pair-with-slide/pair-with-slide';
declare var Swiper: any;

@Component({
  selector: 'app-pair-with',
  imports: [PairWithSlide],
  templateUrl: './pair-with.html',
  styleUrl: './pair-with.css',
})
export class PairWith {
  private swiper: any;

  items = input.required<ProductCartType[]>();

  public collections: WritableSignal<Array<ProductType[]>> = signal<Array<ProductType[]>>([]);
  public initialized: WritableSignal<boolean> = signal<boolean>(false);

  private productSubscription: Subscription = new Subscription();

  constructor(
    private destroyRef: DestroyRef,
    private productService: ProductsService,
  ) {
    effect(() => {

      this.initialize();

      if (this.swiper) {
        this.swiper.destroy();


        setTimeout(() => {
          this.swiper = new Swiper(".js-carousel-swiper-pair-with", {
            slidesPerView: 'auto',
            spaceBetween: 8,
            grabCursor: true,
            navigation: {
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev",
              addIcons: false
            },

          });
        }, 500);
      }

    });

    afterNextRender(() => {

        this.swiper = new Swiper(".js-carousel-swiper-pair-with", {
          slidesPerView: 'auto',
          spaceBetween: 8,
          grabCursor: true,
          navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
            addIcons: false
          },

        });

    });

    this.destroyRef.onDestroy(() => {
      if (this.swiper) {
        this.swiper.destroy();
      }

      if (this.productSubscription) {
        this.productSubscription.unsubscribe();
      }
    });
  }

  private initialize(): void {

    this.initialized.set(false);

    if (this.productSubscription) {
      this.productSubscription.unsubscribe();
    }

    const inputItems = this.items();
    this.collections.set([]);

    for (let i: number = 0; i < inputItems.length; i++) {
      const sub = this.productService
        .getCollectionItemByUrl(inputItems[i].name, inputItems[i].url)
        .subscribe((items) => {
          if (items !== null) {
            this.collections().push(items);
          }
        });

      this.productSubscription.add(sub);
    }
    this.initialized.set(true);
  }

}
