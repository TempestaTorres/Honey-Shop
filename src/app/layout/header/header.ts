import { Component } from '@angular/core';
import { CarouselSwiper } from '../../components/carousel-swiper/carousel-swiper';
import { GeolocationRegion } from '../../components/geolocation-region/geolocation-region';
import { MegaMenuService } from '../../services/mega-menu-service';

@Component({
  selector: 'app-header',
  imports: [CarouselSwiper, GeolocationRegion],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {

  constructor(private megamenuService: MegaMenuService) {}

  public mouseEnter(): void {

    if (this.megamenuService.isMenuOpened()) {
      this.megamenuService.megaDesktopMenuTrigger({open: false, type: ''});
    }
  }
}
