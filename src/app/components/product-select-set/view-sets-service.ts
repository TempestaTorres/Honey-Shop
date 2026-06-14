import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ProductType } from '../../products/types/product-type';

@Injectable({
  providedIn: 'root',
})
export class ViewSetsService {

  public viewSetsTriggered$: BehaviorSubject<ProductType[] | null>;

  constructor() {
    this.viewSetsTriggered$ = new BehaviorSubject<ProductType[] | null>(null);
  }

  public triggerViewSets(productType: ProductType[] | null): void {
    this.viewSetsTriggered$.next(productType);
  }
}
