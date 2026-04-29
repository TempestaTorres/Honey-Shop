import {
  Component,
  ElementRef,
  signal,
  viewChild,
  effect,
  ChangeDetectionStrategy
} from '@angular/core';
import { ScrollingService } from '../../services/scrolling-service';

@Component({
  selector: 'app-privacy-policy',
  imports: [],
  templateUrl: './privacy-policy.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PrivacyPolicy {

  public accordionItemOpened = signal(true);
  readonly accordionHeader = viewChild<ElementRef<HTMLElement>>('accordionHeader');

  constructor( private scrollingService: ScrollingService ) {

    effect(() => {

      if (this.accordionItemOpened()) {
        setTimeout(() => this.scrollToHeader(), 500);
      }
    });

  }

  public toggleAccordionItem(): void {
    this.accordionItemOpened.update((value) => !value);

  }

  private scrollToHeader(): void {
    const headerEl = this.accordionHeader()?.nativeElement;
    if (!headerEl) return;

    const stickyHeaderHeight = 66;

    this.scrollingService.scrollToPoint(headerEl, stickyHeaderHeight);
  }
}
