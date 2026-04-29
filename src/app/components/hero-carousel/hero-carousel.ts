import { afterNextRender, Component, DestroyRef, ElementRef, Input, signal, viewChild } from '@angular/core';
import { RouterLink } from '@angular/router';
import { HeroType } from '../../types/hero-type';
declare var Swiper: any;

@Component({
  selector: 'app-hero-carousel',
  imports: [RouterLink],
  templateUrl: './hero-carousel.html',
})
export class HeroCarousel {

  @Input() heroData!: HeroType;

  readonly carousel = viewChild<ElementRef<HTMLElement>>('carousel');
  private swiper: any;

  public paginationLocked = signal<boolean>(false);

  constructor(private destroyRef: DestroyRef) {

    afterNextRender(() => {

      if (this.heroData) {

        const hero = this.carousel();

        if (hero) {
          hero.nativeElement.classList.add(this.heroData.class);

          this.swiper = new Swiper('.' + this.heroData.class, this.heroData.swiperOptions);

          if (this.heroData.slides.length <= 1) {
            this.paginationLocked.set(true);
          }
        }

      }
    });

    if (this.swiper) {
      this.destroyRef.onDestroy(() => {
        this.swiper.destroy();
      });
    }

  }

}
