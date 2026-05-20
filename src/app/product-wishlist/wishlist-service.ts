import { Injectable } from '@angular/core';
import { ProductCartType } from '../product-cart/cart-type/product-cart-type';
import { BehaviorSubject, Observable } from 'rxjs';
import { AuthService } from '../auth/auth-service';

@Injectable({
  providedIn: 'root',
})
export class WishlistService {

  private products: ProductCartType[] = [];

  public wishlistCount: BehaviorSubject<number>;

  constructor(private authService: AuthService) {
    this.wishlistCount = new BehaviorSubject<number>(0);
  }

  public wishlistToggle(product: ProductCartType) {

    if (this.authService.isLoggedIn()) {

      this.proceedWishlist(product);

    } else {
      this.authService.toggleAlert(true, "wishlist");
    }

  }

  private proceedWishlist(product: ProductCartType): void {
    if (product.favorite === undefined) {
      product.favorite = false;
    }
    product.favorite = !product.favorite;

    this.wishlistAddRemove(product);
  }


  public wishlistAddRemove(item: ProductCartType) {
    if (item.favorite)
      this.addToWishlist(item);
    else
      this.wishlistRemove(item);
  }

  public addToWishlist(productCartType: ProductCartType): void {
    this.products.push(productCartType);

    this.wishlistCount.next(this.products.length);
  }

  public wishlistRemove(productCartType: ProductCartType): void {

    if (this.products.length > 1) {
      this.products = this.products.filter(product => product.url !== productCartType.url);
    }
    else if (this.products[0].url === productCartType.url) {
      this.products = [];
    }

    this.wishlistCount.next(this.products.length);
  }

  public getWishlist(): Observable<ProductCartType[]> {

    return new Observable<ProductCartType[]>(observer => {
      observer.next(this.products);
    });
  }
}
