import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ProductCartType } from '../../product-cart/cart-type/product-cart-type';
import { ProductType } from '../../products/types/product-type';
import { NewArrivalData } from '../../products/data/new-arrival-data';

@Injectable({
  providedIn: 'root',
})
export class MiniCartService {

  public miniCartOpen: BehaviorSubject<boolean>;

  constructor() {
    this.miniCartOpen = new BehaviorSubject(false);
  }

  toggleMiniCart(open: boolean): void {
    this.miniCartOpen.next(open);
  }

  public getRecommendedMiniCartItems(): Observable<ProductCartType[]> {

    let items: ProductCartType[] = [];

    const products: ProductType[] = [];

    for (let i: number = 0; i < NewArrivalData.length; i++) {

      const p: ProductType[] = NewArrivalData[i].product;

      for (let j: number = 0; j < p.length; j++) {

        if (p[j].addToCartButton)
          products.push(p[j]);
      }
    }

    for (let i: number = 0; i < 6; i++) {

      let index: number = Math.floor(Math.random() * products.length);

      let item: ProductCartType = {
        name: products[index].name,
        url: products[index].url,
        price: String(products[index].price),
        image: products[index].images[0],
        count: '1',
        type: products[index].type || '',
        color: products[index].colorName
      }

      items.push(item);
    }

    return new Observable<ProductCartType[]>(observer => {
      observer.next(items);
    })
  }
}
