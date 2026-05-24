import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Observer } from 'rxjs';
import { ShopTheLookData, ShopTheLookType } from './data/shop-the-look-data';

@Injectable({
  providedIn: 'root',
})
export class ShopTheLookService {

  public shopTheLookDataIndex$: BehaviorSubject<string | null>;

  constructor() {
    this.shopTheLookDataIndex$ = new BehaviorSubject<string | null>(null);
  }

  public getShopTheLookData(index: number): Observable<ShopTheLookType> {

    return new Observable((observer: Observer<ShopTheLookType>) => {
      observer.next(ShopTheLookData[index]);
    });
  }

  public triggerShopTheLook(value: string | null): void {
    this.shopTheLookDataIndex$.next(value);
  }
}
