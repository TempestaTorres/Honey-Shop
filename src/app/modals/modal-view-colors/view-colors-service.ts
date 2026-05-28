import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ProductType } from '../../products/types/product-type';

@Injectable({
  providedIn: 'root',
})
export class ViewColorsService {

  public colorsTriggered$: BehaviorSubject<ProductType[] | null>;

  constructor() {
    this.colorsTriggered$ = new BehaviorSubject<ProductType[] | null>(null);
  }

  public triggerViewColors(productType: ProductType[] | null): void {
    this.colorsTriggered$.next(productType);
  }
}
