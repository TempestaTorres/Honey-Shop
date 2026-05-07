import { Component, Input, OnDestroy, OnInit, signal, WritableSignal } from '@angular/core';
import { Subscription } from 'rxjs';
import { ObserveElementDirective } from '../../directives/scroll-observer';
import { IntersectingService } from '../../services/intersecting-service';
import { ListTabs } from '../../types/tabs/tab-types';
import { RouterLink } from '@angular/router';
import { ProductCarousel } from '../product-carousel/product-carousel';

@Component({
  selector: 'app-products-tab-list',
  imports: [ObserveElementDirective, RouterLink, ProductCarousel],
  templateUrl: './products-tab-list.html',
})
export class ProductsTabList implements OnInit, OnDestroy {
  @Input() productTabs: ListTabs = { tabs: [] };

  public singleTab: WritableSignal<boolean> = signal<boolean>(true);
  public activeTabs: WritableSignal<boolean>[] = [];
  public tabIndex: WritableSignal<number> = signal<number>(0);
  public carouselName: string = "js-carousel-swiper-"

  private subscriptions$ = new Subscription();

  constructor(private intersectingService: IntersectingService,
  ) {}

  ngOnInit() {

    if (this.productTabs.tabs.length > 1) {
      this.singleTab.set(false);
    } else {
      this.singleTab.set(true);
    }

    for (let i: number = 0; i < this.productTabs.tabs.length; i++) {
      if (i === 0) {
        this.activeTabs.push(signal<boolean>(true));
      } else {
        this.activeTabs.push(signal<boolean>(false));
      }
    }

    this.tabIndex.set(0);
  }

  ngOnDestroy() {
    this.subscriptions$.unsubscribe();
  }

  public isIntersecting(status: boolean, element: HTMLElement) {
    this.intersectingService.isIntersecting(status, element);
  }

  public tabClick(i: number): void {
    if (this.activeTabs[i]()) return;

    this.resetTabs();
    this.activeTabs[i].set(true);
    this.tabIndex.set(i);
  }

  private resetTabs(): void {
    for (let i: number = 0; i < this.activeTabs.length; i++) {
      this.activeTabs[i].set(false);
    }
  }
}
