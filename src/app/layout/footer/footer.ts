import { Component, ElementRef, signal, viewChildren } from '@angular/core';
import { RouterLink } from '@angular/router';
import { GeolocationRegion } from '../../components/geolocation-region/geolocation-region';
import { ObserveElementDirective } from '../../directives/scroll-observer';
import { IntersectingService } from '../../services/intersecting-service';
import { AccordionService } from '../../services/accordion-service';

@Component({
  selector: 'app-footer',
  imports: [RouterLink, GeolocationRegion, ObserveElementDirective],
  templateUrl: './footer.html',
  styleUrl: './footer.css',
})
export class Footer {
  public openedAccordionItem = signal<string>('0');

  readonly contents = viewChildren<ElementRef<HTMLElement>>('content');

  constructor(private intersectingService: IntersectingService, private accordionService: AccordionService) {}

  public toggleItem(itemId: string): void {

    const elContents = this.contents();
    this.accordionService.jsAccordionToggle(itemId, this.openedAccordionItem, elContents);

  }

  public isIntersecting(status: boolean, element: HTMLElement) {
    this.intersectingService.isIntersecting(status, element);
  }
}
