import {
  afterNextRender,
  Component,
  DestroyRef,
  effect,
  ElementRef,
  OnInit,
  signal,
  viewChildren,
  WritableSignal
} from '@angular/core';
import { ScrollingService } from '../../services/scrolling-service';
import { RouterLink } from '@angular/router';
import { AccordionService } from '../../services/accordion-service';
import { ChatBoxService } from '../../components/chat-box/chat-box-service';
declare var Swiper: any;

@Component({
  selector: 'app-returns-exchanges',
  imports: [RouterLink],
  templateUrl: './returns-exchanges.html',
})
export class ReturnsExchanges implements OnInit {

  public openedItem: WritableSignal<string> = signal<string>('0');
  readonly accordionHeaders = viewChildren<ElementRef<HTMLElement>>('accordionHeader');
  private swiper: any;

  constructor(private scrollingService: ScrollingService, private destroyRef: DestroyRef,
              private accordionService: AccordionService,
              private chatboxService$: ChatBoxService) {

    effect(() => {

      const openedId: string = this.openedItem();

      if (openedId !== '0') {
        this.accordionService.scrollToOpenedHeader(openedId, this.accordionHeaders(), 148);
      }

    });

    afterNextRender(() => {
      this.swiper = new Swiper('.js-returns-exchanges-anchor-link-swiper', {
        slidesPerView: 'auto',
        spaceBetween: 8,
        keyboard: true,
        centeredSlides: true,
        centeredSlidesBounds: true,
        freeMode: {
          enabled: true,
          sticky: false,
        },

      });
    });

    this.destroyRef.onDestroy(() => {
      if (this.swiper)
        this.swiper.destroy();
    });
  }

  ngOnInit() {
    this.scrollingService.toTop();
  }

  public anchorClick(target: HTMLElement): void {

    this.scrollingService.scrollToPoint(target, 148);
  }

  public openChatBox(): void {
    this.chatboxService$.openChatBox();
  }

  public toggleItem(itemId: string): void {
    this.accordionService.jsAccordionToggleEx(itemId, this.openedItem);
  }

}
