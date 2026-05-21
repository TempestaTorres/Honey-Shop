import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ProductType } from '../../products/types/product-type';

@Injectable({
  providedIn: 'root',
})
export class SelectSizeService {

  public selectSizeOpen$: BehaviorSubject<ProductType | null>;

  constructor() {
    this.selectSizeOpen$ = new BehaviorSubject<ProductType | null>(null);
  }

  public triggerSizeSelectionChanged(sizeSelection: ProductType | null): void {
    this.selectSizeOpen$.next(sizeSelection);
  }
}
