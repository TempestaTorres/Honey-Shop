import { afterNextRender, Component, DestroyRef, ElementRef, Input, signal, viewChild } from '@angular/core';
import { HeroVideoType } from '../../types/hero-type';
import { RouterLink } from '@angular/router';
import { VideoPlayer } from '../video-player/video-player';
declare var Swiper: any;

@Component({
  selector: 'app-hero-video-carousel',
  imports: [RouterLink, VideoPlayer],
  templateUrl: './hero-video-carousel.html',
})
export class HeroVideoCarousel {
  @Input() heroData!: HeroVideoType;

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

    this.destroyRef.onDestroy(() => {
      if (this.swiper)
        this.swiper.destroy();
    });

  }
}
