import { Injectable } from '@angular/core';
import { ProductCartType } from '../product-cart/cart-type/product-cart-type';
import { BehaviorSubject, Observable } from 'rxjs';
import { AuthService } from '../auth/auth-service';
import { WishlistType } from './wishlist-type';

@Injectable({
  providedIn: 'root',
})
export class WishlistService {

  private wishlist: WishlistType[] = [];

  public wishlistCount: BehaviorSubject<number>;
  public customerWishlistsCount: BehaviorSubject<number>;
  public wishlistOpen$: BehaviorSubject<ProductCartType | null>;
  public wishlistCreateOpen$: BehaviorSubject<boolean>;

  constructor(private authService: AuthService) {
    this.wishlistCount = new BehaviorSubject<number>(0);
    this.customerWishlistsCount = new BehaviorSubject<number>(this.wishlist.length);
    this.wishlistOpen$ = new BehaviorSubject<ProductCartType | null>(null);
    this.wishlistCreateOpen$ = new BehaviorSubject<boolean>(false);
  }

  public wishlistCreateToggle(status: boolean): void {
    this.wishlistCreateOpen$.next(status);
  }

  public wishlistToggle(product: ProductCartType | null): void {

    if (this.authService.isLoggedIn()) {

      this.wishlistOpen$.next(product);

    } else {
      this.authService.toggleAlert(true, "wishlist");
    }

  }

  public addToWishlist(wishlistName: string, product: ProductCartType): boolean {

    let result: boolean = false;

    for (let i = 0; i < this.wishlist.length; i++) {

      if (wishlistName === this.wishlist[i].name) {

        let find = this.wishlist[i].products
          .find(p => p.url === product.url);

        if (find === undefined) {
          result = true;
          product.favorite = true;
          this.wishlist[i].products.push(product);
          break;
        }
      }
    }

    if (result) {
      this.updateWishlistCount();
    }

    return result;
  }

  public removeFromWishlist(wishlistName: string,product: ProductCartType): void {

    for (let i = 0; i < this.wishlist.length; i++) {
      if (wishlistName === this.wishlist[i].name) {
        this.wishlist[i].products = this.wishlist[i].products
          .filter(p => p.url === product.url);
      }
    }

    this.updateWishlistCount();
  }

  public getWishlists(): Observable<{name: string, count: number}[]> {

    let wishlist: {name: string, count: number}[] = [];

    for (let i = 0; i < this.wishlist.length; i++) {
      let wishlistType = this.wishlist[i];
      let list: {name: string, count: number} = {
        name: wishlistType.name,
        count: wishlistType.products.length,
      }

      wishlist.push(list);
    }

    return new Observable<{name: string, count: number}[]>(observer => {
      observer.next(wishlist);
    });
  }

  public createWishlist(name: string): void {
    this.wishlist.push({name: name, products: []});
    this.updateWishlistCount();
  }

  private updateWishlistCount(): void {

    let count: number = 0;

    for (let i = 0; i < this.wishlist.length; i++) {
      count += this.wishlist[i].products.length;
    }

    this.wishlistCount.next(count);
    this.customerWishlistsCount.next(this.wishlist.length);
  }
}
