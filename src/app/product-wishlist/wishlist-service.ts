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
  public wishlistEdited$: BehaviorSubject<boolean>;

  constructor(private authService: AuthService) {
    this.wishlistCount = new BehaviorSubject<number>(0);
    this.customerWishlistsCount = new BehaviorSubject<number>(this.wishlist.length);
    this.wishlistOpen$ = new BehaviorSubject<ProductCartType | null>(null);
    this.wishlistCreateOpen$ = new BehaviorSubject<boolean>(false);
    this.wishlistEdited$ = new BehaviorSubject<boolean>(false);
  }

  public rename(wishlistName: string, wishlistNewName: string): void {

    for (let i = 0; i < this.wishlist.length; i++) {
      if (this.wishlist[i].name === wishlistName) {
        this.wishlist[i].name = wishlistNewName;
        this.wishlistEdited$.next(true);
        break;
      }
    }
  }

  public shift(wishlistName: string, dir: number): void {
    for (let i = 0; i < this.wishlist.length; i++) {
      if (this.wishlist[i].name === wishlistName) {


        if (dir === 1 && i > 0) {

          let item: WishlistType = {
            name: this.wishlist[i].name,
            products: this.wishlist[i].products
          };
          this.wishlist[i].name = this.wishlist[i - 1].name;
          this.wishlist[i].products = this.wishlist[i - 1].products;
          this.wishlist[i - 1].name = item.name;
          this.wishlist[i - 1].products = item.products;
          this.wishlistEdited$.next(true);
        }
        else if (dir === 2 && i < this.wishlist.length - 1) {
          let item: WishlistType = {
            name: this.wishlist[i].name,
            products: this.wishlist[i].products
          };
          this.wishlist[i].name = this.wishlist[i + 1].name;
          this.wishlist[i].products = this.wishlist[i + 1].products;
          this.wishlist[i + 1].name = item.name;
          this.wishlist[i + 1].products = item.products;
          this.wishlistEdited$.next(true);
        }

        break;
      }
    }
  }

  public delete(wishlistName: string): void {
    this.wishlist = this.wishlist.filter((wishlist) => wishlist.name !== wishlistName);
    this.updateWishlistCount();
  }

  public isFirst(wishlistName: string): boolean {

    return this.wishlist[0].name === wishlistName;
  }

  public isLast(wishlistName: string): boolean {

    return this.wishlist[this.wishlist.length - 1].name === wishlistName;
  }

  public getWishlist(wishlistName: string): Observable<WishlistType | null> {

    for (let i = 0; i < this.wishlist.length; i++) {
      if (this.wishlist[i].name === wishlistName) {
        return new Observable<WishlistType | null>(observer => {
          observer.next(this.wishlist[i]);
        });
      }
    }

    return new Observable<WishlistType | null>(observer => {
      observer.next(null);
    });
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
          .filter(p => p.url !== product.url);
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
