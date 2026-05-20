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
import { HoneyTabs } from '../../types/tabs/tab-types';
import { TabList } from '../../components/tab-list/tab-list';
import {
  HoneyBodysuitSize,
  HoneyBraletteSize,
  HoneyBraSize,
  HoneyBriefSize,
  HoneyChemiseSize,
  HoneyDressSize,
  HoneyHosierySize,
  HoneyLatexSize,
  HoneyRobeSize,
  HoneySuspenderSize,
  HoneySwimwearSize
} from '../../data/honey-club-data';
import { AccordionService } from '../../services/accordion-service';
import { ChatBoxService } from '../../components/chat-box/chat-box-service';

declare var Swiper: any;

@Component({
  selector: 'app-size-guide',
  imports: [TabList],
  templateUrl: './size-guide.html',
})
export class SizeGuide implements OnInit {

  public sizeTabFullTitles: string[] = ['size guide', 'size conversion', 'how to measure'];
  public sizeTabTitles: string[] = ['size guide', 'size conversion'];
  public tabBodysuitContent: HoneyTabs = HoneyBodysuitSize;
  public tabBraletteContent: HoneyTabs = HoneyBraletteSize;
  public tabBraContent: HoneyTabs = HoneyBraSize;
  public tabBriefContent: HoneyTabs = HoneyBriefSize;
  public tabChemiseContent: HoneyTabs = HoneyChemiseSize;
  public tabDressContent: HoneyTabs = HoneyDressSize;
  public tabHosieryContent: HoneyTabs = HoneyHosierySize;
  public tabLatexContent: HoneyTabs = HoneyLatexSize;
  public tabRobeContent: HoneyTabs = HoneyRobeSize;
  public tabSuspenderContent: HoneyTabs = HoneySuspenderSize;
  public tabSwimwearContent: HoneyTabs = HoneySwimwearSize;

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
      this.swiper = new Swiper('.js-anchor-link-swiper', {
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
