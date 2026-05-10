import { Component, effect, ElementRef, OnInit, signal, viewChildren, WritableSignal } from '@angular/core';
import { ScrollingService } from '../../services/scrolling-service';

@Component({
  selector: 'app-shipping-delivery',
  imports: [],
  templateUrl: './shipping-delivery.html',
  styleUrl: './shipping-delivery.css',
})
export class ShippingDelivery implements OnInit {

  public openedItem: WritableSignal<string> = signal<string>('1');
  readonly accordionHeaders = viewChildren<ElementRef<HTMLElement>>('accordionHeader');

  constructor(private scrollingService: ScrollingService) {

    effect(() => {

      const openedId: string = this.openedItem();

      if (openedId !== '0') {
        setTimeout(() => this.scrollToOpenedHeader(), 500);
      }

    });
  }

  ngOnInit() {
    this.scrollingService.toTop();
  }

  public toggleItem(itemId: string): void {
    this.openedItem.update(currentId => {

      if (currentId === itemId) {
        return '0';
      }
      return itemId;
    });
  }

  private scrollToOpenedHeader(): void {

    const openedId: string = this.openedItem();
    if (openedId === '0') return;

    const headers = this.accordionHeaders();

    const headerEl = headers.find(header => header.nativeElement.dataset['id'] === openedId);

    if (!headerEl) return;

    const stickyHeaderHeight = 66;

    setTimeout(() => {
      this.scrollingService.scrollToPoint(headerEl.nativeElement, stickyHeaderHeight);
    }, 500);
  }
}
