import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
declare var Swiper: any;
@Injectable({
  providedIn: 'root',
})
export class SwiperService {

  public needWatchResizing$: BehaviorSubject<boolean>;

  constructor() {
    this.needWatchResizing$ = new BehaviorSubject<boolean>(false);
  }

  public needResizing(value: boolean = true): void {
    this.needWatchResizing$.next(value);
  }

  public initDefSwiperWithProgressBarOnly(selector: string): any {

    return new Swiper(selector, {
      effect: 'fade',
      fadeEffect: {
        crossFade: true,
      },
      pagination: {
        el: '.swiper-pagination',
        type: 'progressbar',
      },
    });
  }
}
