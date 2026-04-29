import { ChangeDetectionStrategy, Component, effect, ElementRef, OnInit, signal, viewChildren } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ScrollingService } from '../../services/scrolling-service';

@Component({
  selector: 'app-terms-conditions',
  imports: [RouterLink],
  templateUrl: './terms-conditions.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TermsConditions implements OnInit {

  public openedItem = signal<string>('0');

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

    this.scrollingService.scrollToPoint(headerEl.nativeElement, stickyHeaderHeight);

    setTimeout(() => {
      this.scrollingService.scrollToPoint(headerEl.nativeElement, stickyHeaderHeight);
    }, 500);
  }
}
