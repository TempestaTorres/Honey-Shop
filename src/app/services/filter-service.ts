import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface FilterType {
  filter: string,
  value: string,
}

@Injectable({
  providedIn: 'root',
})
export class FilterService {

  public filterOpen$: BehaviorSubject<boolean>;
  public appliedFilters$: BehaviorSubject<boolean>;

  constructor() {
    this.filterOpen$ = new BehaviorSubject(false);
    this.appliedFilters$ = new BehaviorSubject<boolean>(false);
  }

  public triggerFilter(open: boolean): void {
    this.filterOpen$.next(open);
  }

  public applyFilters(apply: boolean): void {
    this.appliedFilters$.next(apply);
  }
}
