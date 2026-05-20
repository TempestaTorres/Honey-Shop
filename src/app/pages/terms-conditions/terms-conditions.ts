import { ChangeDetectionStrategy, Component, effect, ElementRef, OnInit, signal, viewChildren } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ScrollingService } from '../../services/scrolling-service';
import { AccordionService } from '../../services/accordion-service';

@Component({
  selector: 'app-terms-conditions',
  imports: [RouterLink],
  templateUrl: './terms-conditions.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TermsConditions implements OnInit {

  public openedItem = signal<string>('0');

  readonly accordionHeaders = viewChildren<ElementRef<HTMLElement>>('accordionHeader');

  constructor(private scrollingService: ScrollingService, private accordionService: AccordionService) {

    effect(() => {

      const openedId: string = this.openedItem();

      if (openedId !== '0') {
        this.accordionService.scrollToOpenedHeader(openedId, this.accordionHeaders(), 66);
      }

    });

  }

  ngOnInit() {
    this.scrollingService.toTop();
  }

  public toggleItem(itemId: string): void {

    this.accordionService.jsAccordionToggleEx(itemId, this.openedItem);
  }

}
