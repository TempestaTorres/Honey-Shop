import { Component, effect, ElementRef, Input, signal, viewChildren, WritableSignal } from '@angular/core';
import { FaqType } from '../../types/faq-type';
import { IntersectingService } from '../../services/intersecting-service';
import { ObserveElementDirective } from '../../directives/scroll-observer';
import { ScrollingService } from '../../services/scrolling-service';

@Component({
  selector: 'app-accordion-list',
  imports: [ObserveElementDirective],
  templateUrl: './accordion-list.html',
})
export class AccordionList {
  @Input() faqs: FaqType[] = [];

  public openedItem = signal<number>(0);
  readonly accordionHeaders = viewChildren<ElementRef<HTMLElement>>('accordionHeader');

  constructor(private intersectingService: IntersectingService,
              private scrollingService: ScrollingService) {

    effect(() => {

      const openedId: number = this.openedItem();

      if (openedId !== 0) {
        setTimeout(() => this.scrollToOpenedHeader(), 500);
      }

    });
  }

  // Accordion methods
  public toggleItem(itemId: number): void {
    this.openedItem.update(currentId => {

      if (currentId === itemId) {
        return 0;
      }
      return itemId;
    });
  }

  private scrollToOpenedHeader(): void {

    const openedId: string = this.openedItem().toString(10);

    if (openedId === '0') return;

    const headers = this.accordionHeaders();

    const headerEl = headers.find(header => header.nativeElement.dataset['id'] === openedId);

    if (!headerEl) return;

    const stickyHeaderHeight = 66;

    this.scrollingService.scrollToPoint(headerEl.nativeElement, stickyHeaderHeight);

    setTimeout(() => {
      this.scrollingService.scrollToPoint(headerEl.nativeElement, stickyHeaderHeight);
    }, 500);
  }

  // Other
  public isIntersecting(status: boolean, element: HTMLElement) {
    this.intersectingService.isIntersecting(status, element);
  }
}
