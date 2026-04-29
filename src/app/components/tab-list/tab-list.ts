import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnInit,
  signal,
  viewChild,
  viewChildren,
  WritableSignal
} from '@angular/core';
import { HoneyTabs } from '../../types/tabs/tab-types';
import { TabContent } from '../tab-content/tab-content';
import { IntersectingService } from '../../services/intersecting-service';
import { ObserveElementDirective } from '../../directives/scroll-observer';

@Component({
  selector: 'app-tab-list',
  imports: [TabContent, ObserveElementDirective],
  templateUrl: './tab-list.html',
  styleUrl: './tab-list.css',
})
export class TabList implements OnInit, AfterViewInit {
  @Input() tabTitles: string[] = [];
  @Input() tabsContent: HoneyTabs = { type: '', tabs: [] };

  public activeTabs: WritableSignal<boolean>[] = [];
  public activeTabsContent: WritableSignal<boolean>[] = [];

  readonly tabs = viewChildren<ElementRef<HTMLElement>>('tabTitle');
  readonly tabUnderline = viewChild<ElementRef<HTMLElement>>('tabUnderline');

  constructor(private intersectingService: IntersectingService) {}

  ngOnInit() {
    for (let i: number = 0; i < this.tabTitles.length; i++) {
      if (i === 0) {
        this.activeTabs.push(signal<boolean>(true));
        this.activeTabsContent.push(signal<boolean>(true));
      } else {
        this.activeTabs.push(signal<boolean>(false));
        this.activeTabsContent.push(signal<boolean>(false));
      }
    }
  }

  ngAfterViewInit() {
    this.activateTab(0);
  }

  public tabClick(i: number): void {
    this.resetTabs();
    this.activeTabs[i].set(true);
    this.activeTabsContent[i].set(true);

    this.activateTab(i);
  }

  private activateTab(i: number): void {
    const allTabs = this.tabs();
    const firstTab = allTabs[0];
    const activeTab = allTabs[i];

    let startX: number = firstTab.nativeElement.getBoundingClientRect().left;
    let endX: number = activeTab.nativeElement.getBoundingClientRect().left;

    let x: number = Math.ceil(endX - startX);
    let width: number = Math.ceil(activeTab.nativeElement.getBoundingClientRect().width);

    const underline = this.tabUnderline();

    if (underline) {
      underline.nativeElement.style.width = width + 'px';
      underline.nativeElement.style.transform = `translate3d(${x}px, 0, 0)`;
    }
  }

  private resetTabs(): void {
    for (let i: number = 0; i < this.activeTabs.length; i++) {
      this.activeTabs[i].set(false);
      this.activeTabsContent[i].set(false);
    }
  }
  public isIntersecting(status: boolean, element: HTMLElement) {
    this.intersectingService.isIntersecting(status, element);
  }
}
