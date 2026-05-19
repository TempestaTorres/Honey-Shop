import { Injectable } from '@angular/core';
import { ProductCartType } from '../cart-type/product-cart-type';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductCartService {

  private products: ProductCartType[] = [];

  public cartCount: BehaviorSubject<number>;

  constructor() {
    this.cartCount = new BehaviorSubject<number>(0);
  }

  public addToCart(productCartType: ProductCartType): void {
    this.products.push(productCartType);

    this.cartCount.next(this.products.length);
  }

  public removeFromCart(productCartType: ProductCartType): void {

    if (this.products.length > 1) {
      this.products = this.products.filter(product => product.url !== productCartType.url);
    }
    else if (this.products[0].url === productCartType.url) {
      this.products = [];
    }

    this.cartCount.next(this.products.length);
  }

  public getCartItems(): Observable<ProductCartType[]> {

    return new Observable<ProductCartType[]>(observer => {
      observer.next(this.products);
    });
  }

}
