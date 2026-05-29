import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HoneyTabs } from '../../types/tabs/tab-types';
import {
  HoneyBodysuitSize,
  HoneyBraletteSize,
  HoneyBraSize,
  HoneyBriefSize,
  HoneyChemiseSize, HoneyHosierySize,
  HoneyRobeSize, HoneySuspenderSize
} from '../../data/honey-club-data';

export interface HoneyTabGuideSizes {
  sizeTabTitles: string[],
  tabContent: HoneyTabs
}
@Injectable({
  providedIn: 'root',
})
export class SizeGuideService {

  public sizeGuideOpen$: BehaviorSubject<string | null>;

  constructor() {
    this.sizeGuideOpen$ = new BehaviorSubject<string | null>(null);
  }

  public triggerSizeGuide(state: string | null = null): void {
    this.sizeGuideOpen$.next(state);
  }

  public getGuideSizes(type: string): Observable<HoneyTabGuideSizes> {

    let sizes: HoneyTabGuideSizes = {
      sizeTabTitles: [],
      tabContent: {
        type: "",
        tabs: []
      }
    };

    if (type === 'bralette') {
      sizes.sizeTabTitles = ['size guide', 'size conversion', 'how to measure'];
      sizes.tabContent = HoneyBraletteSize;
    }
    else if (type === 'bra') {
      sizes.sizeTabTitles = ['size guide', 'size conversion', 'how to measure'];
      sizes.tabContent = HoneyBraSize;
    }
    else if (type === 'thong' || type === 'brief') {
      sizes.sizeTabTitles = ['size guide', 'size conversion', 'how to measure'];
      sizes.tabContent = HoneyBriefSize;
    }
    else if (type === 'chemise') {
      sizes.sizeTabTitles = ['size guide', 'size conversion'];
      sizes.tabContent = HoneyChemiseSize;
    }
    else if (type === 'robe') {
      sizes.sizeTabTitles = ['size guide', 'size conversion'];
      sizes.tabContent = HoneyRobeSize;
    }
    else if (type === 'bodysuit' || type === 'corset') {
      sizes.sizeTabTitles = ['size guide', 'size conversion', 'how to measure'];
      sizes.tabContent = HoneyBodysuitSize;
    }
    else if (type === 'suspender') {
      sizes.sizeTabTitles = ['size guide', 'size conversion', 'how to measure'];
      sizes.tabContent = HoneySuspenderSize;
    }
    else if (type === 'stockings') {
      sizes.sizeTabTitles = ['size guide', 'size conversion'];
      sizes.tabContent = HoneyHosierySize;
    }

    return new Observable<HoneyTabGuideSizes>(observer => {
      observer.next(sizes);
    })
  }
}
