import { Component, effect, ElementRef, OnInit, signal, viewChildren, WritableSignal } from '@angular/core';
import { ScrollingService } from '../../services/scrolling-service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-returns-exchanges',
  imports: [RouterLink],
  templateUrl: './returns-exchanges.html',
})
export class ReturnsExchanges implements OnInit {

  public openedItem: WritableSignal<string> = signal<string>('0');
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

  public anchorClick(target: HTMLElement): void {

    this.scrollingService.scrollToPoint(target, 148);
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
      this.scrollingService.scrollToPoint(headerEl.nativeElement, stickyHeaderHeight + 82);
    }, 500);
  }
}
