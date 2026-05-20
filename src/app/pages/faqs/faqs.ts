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
import { ChatBoxService } from '../../components/chat-box/chat-box-service';
declare var Swiper: any;

@Component({
  selector: 'app-faqs',
  imports: [RouterLink],
  templateUrl: './faqs.html',
})
export class Faqs implements OnInit {

  public openedItem: WritableSignal<string> = signal<string>('0');
  readonly accordionHeaders = viewChildren<ElementRef<HTMLElement>>('accordionHeader');

  private swiper: any;

  constructor(private scrollingService: ScrollingService, private destroyRef: DestroyRef,
              private chatboxService$: ChatBoxService) {

    effect(() => {
      const openedId: string = this.openedItem();

      if (openedId !== '0') {
        setTimeout(() => this.scrollToOpenedHeader(), 500);
      }
    });

    afterNextRender(() => {
      this.swiper = new Swiper('.js-faqs-anchor-link-swiper', {
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
    this.openedItem.update((currentId) => {
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

    const headerEl = headers.find((header) => header.nativeElement.dataset['id'] === openedId);

    if (!headerEl) return;

    const stickyHeaderHeight = 66;

    setTimeout(() => {
      this.scrollingService.scrollToPoint(headerEl.nativeElement, stickyHeaderHeight + 82);
    }, 500);
  }
}
