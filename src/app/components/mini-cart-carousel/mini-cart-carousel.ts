import { afterNextRender, Component, DestroyRef, effect, input } from '@angular/core';
import { ProductCartType } from '../../product-cart/cart-type/product-cart-type';
import { Router } from '@angular/router';
import { WishlistService } from '../../product-wishlist/wishlist-service';
import { CurrencyPipe } from '@angular/common';
import { ProductCartService } from '../../product-cart/services/product-cart-service';
import { MiniCartService } from '../../modals/mini-cart/mini-cart-service';
declare var Swiper: any;

@Component({
  selector: 'app-mini-cart-carousel',
  imports: [CurrencyPipe],
  templateUrl: './mini-cart-carousel.html',
  styleUrl: './mini-cart-carousel.css',
})
export class MiniCartCarousel {
  private swiper: any;

  items = input.required<ProductCartType[]>();

  constructor(
    private destroyRef: DestroyRef,
    private router: Router,
    private wishlistService: WishlistService,
    private cartService: ProductCartService,
    private miniCartService: MiniCartService,
  ) {

    effect(() => {

      if (this.items().length > 0) {

        if (this.swiper) {
          this.swiper.destroy();

          this.swiper = new Swiper(".js-carousel-swiper-mini-cart-related", {
            slidesPerView: 'auto',
            spaceBetween: 16,
            grabCursor: true,
            navigation: {
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev",
              addIcons: false
            },

          });
        }

      }
    });

    afterNextRender(() => {

      this.swiper = new Swiper(".js-carousel-swiper-mini-cart-related", {
        slidesPerView: 'auto',
        spaceBetween: 16,
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
    });
  }

  public navigateToProduct(url: string): void {

    this.miniCartService.toggleMiniCart(false);

    setTimeout(() => {
      this.router.navigate(['/products', url]).then(() => {});
    }, 400);
  }

  public addToWishlist(product: ProductCartType): void {
    this.wishlistService.addToWishlist(product);
  }

  public addToCart(product: ProductCartType): void {

    setTimeout(() => {
      this.cartService.addToCart(product);
    })
  }
}
