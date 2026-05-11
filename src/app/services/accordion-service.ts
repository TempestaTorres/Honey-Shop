import { ElementRef, Injectable, WritableSignal } from '@angular/core';
import { ScrollingService } from './scrolling-service';

@Injectable({
  providedIn: 'root',
})
export class AccordionService {

  constructor(private scrollingService: ScrollingService) {
  }
  public jsAccordionToggle(itemId: string, openedItem: WritableSignal<string>, accordionContents: any): void {

    openedItem.update((currentId) => {
      if (currentId === itemId) {
        this.setMaxHeight(itemId, accordionContents,true);
        return '0';
      }

      this.setMaxHeight(itemId, accordionContents);
      return itemId;
    });
  }

  public jsAccordionToggleEx(itemId: string, openedItem: WritableSignal<string>): void {

    openedItem.update((currentId) => {
      if (currentId === itemId) {
        return '0';
      }

      return itemId;
    });
  }

  public scrollToOpenedHeader(openedId: string, accordionHeaders: any, offset: number): void {

    const headerEl = accordionHeaders.find((header: ElementRef<HTMLElement>) => header.nativeElement.dataset['id'] === openedId);

    if (!headerEl) return;

    setTimeout(() => {
      this.scrollingService.scrollToPoint(headerEl.nativeElement, offset);
    }, 1000);
  }

  private setMaxHeight(itemId: string, accordionContents: ElementRef<HTMLElement>[],reset: boolean = false): void {

    let el = accordionContents.find((el) => el.nativeElement.dataset['id'] === itemId);

    if (reset) {
      if (el) {
        el.nativeElement.style.maxHeight = '0px';
      }
    } else {
      if (el) {
        for (let elContent of accordionContents) {
          elContent.nativeElement.style.maxHeight = '0px';
        }
        let height: number | undefined =
          el.nativeElement.firstElementChild?.getBoundingClientRect().height;

        el.nativeElement.style.maxHeight = `${height}px`;
      }
    }
  }
}
