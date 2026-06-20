import { Component, input } from '@angular/core';
import { Router } from '@angular/router';

export type ParallaxDataType = {
  desktopImg: string,
  mobileImg: string,
  title: string,
  url: string,
  urlParam: string | null,
  button: {
    hasButton: boolean,
    buttonType: string,
    buttonText: string,
  },
}
@Component({
  selector: 'app-parallax-banner',
  imports: [],
  templateUrl: './parallax-banner.html',
  styleUrl: './parallax-banner.css',
})
export class ParallaxBanner {

  parallaxData = input.required<ParallaxDataType>();

  constructor(private router: Router) {
  }

  public navigateTo(): void {
    const data = this.parallaxData();

    if (data.urlParam !== null)
      this.router.navigate([data.url, data.urlParam]).then(() => {});
    else
      this.router.navigate([data.url]).then(() => {});
  }
}
