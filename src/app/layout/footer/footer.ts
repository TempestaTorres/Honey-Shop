import { Component, ElementRef, signal, viewChildren } from '@angular/core';
import { RouterLink } from '@angular/router';
import { GeolocationRegion } from '../../components/geolocation-region/geolocation-region';

@Component({
  selector: 'app-footer',
  imports: [RouterLink, GeolocationRegion],
  templateUrl: './footer.html',
  styleUrl: './footer.css',
})
export class Footer {

  public openedAccordionItem = signal<string>('0');

  readonly contents = viewChildren<ElementRef<HTMLElement>>('content');

  constructor() {
  }

  public toggleItem(itemId: string): void {
    this.openedAccordionItem.update(currentId => {

      if (currentId === itemId) {

        this.setMaxHeight(itemId, true);
        return '0';
      }

      this.setMaxHeight(itemId);
      return itemId;
    });
  }

  private setMaxHeight(itemId: string, reset: boolean = false): void {

    const elContents = this.contents();
    let el = elContents.find(el => el.nativeElement.dataset['id'] === itemId);

    if (reset) {
      if (el) {
        el.nativeElement.style.maxHeight = '0px';
      }
    }
    else {
      if (el) {

        for (let elContent of elContents) {
          elContent.nativeElement.style.maxHeight = '0px';
        }
        let height: number | undefined = el.nativeElement.firstElementChild?.getBoundingClientRect().height;

        el.nativeElement.style.maxHeight = `${height}px`;
      }
    }
  }

}
