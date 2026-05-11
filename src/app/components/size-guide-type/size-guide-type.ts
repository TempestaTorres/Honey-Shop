import { Component, ElementRef, Input, signal, viewChildren, WritableSignal } from '@angular/core';
import { UpperCasePipe } from '@angular/common';
import { AccordionService } from '../../services/accordion-service';

@Component({
  selector: 'app-size-guide-type',
  imports: [UpperCasePipe],
  templateUrl: './size-guide-type.html',
  styleUrl: './size-guide-type.css',
})
export class SizeGuideType {
  @Input() sizeType: { type: string; content: string } = { type: '', content: '' };

  public toggle: WritableSignal<boolean> = signal<boolean>(true);

  public openedAccordionItem = signal<string>('0');
  readonly contents = viewChildren<ElementRef<HTMLElement>>('content');

  constructor(private accordionService: AccordionService) {
  }

  public toggleItem(itemId: string): void {

    const elContents = this.contents();
    this.accordionService.jsAccordionToggle(itemId, this.openedAccordionItem, elContents);

  }

  public cmClick(): void {
    this.toggle.set(true);
  }

  public inchClick(): void {
    this.toggle.set(false);
  }
}
