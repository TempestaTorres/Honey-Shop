import { Component, effect, ElementRef, OnInit, signal, viewChildren, WritableSignal } from '@angular/core';
import { ScrollingService } from '../../services/scrolling-service';
import { AccordionService } from '../../services/accordion-service';
import { ChatBoxService } from '../../components/chat-box/chat-box-service';

@Component({
  selector: 'app-shipping-delivery',
  imports: [],
  templateUrl: './shipping-delivery.html',
  styleUrl: './shipping-delivery.css',
})
export class ShippingDelivery implements OnInit {

  public openedItem: WritableSignal<string> = signal<string>('1');
  readonly accordionHeaders = viewChildren<ElementRef<HTMLElement>>('accordionHeader');

  constructor(private scrollingService: ScrollingService,
              private accordionService: AccordionService,
              private chatboxService$: ChatBoxService) {

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

  public openChatBox(): void {
    this.chatboxService$.openChatBox();
  }

}
