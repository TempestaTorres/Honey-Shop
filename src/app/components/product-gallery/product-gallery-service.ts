import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ProductType } from '../../products/types/product-type';

@Injectable({
  providedIn: 'root',
})
export class ProductGalleryService {

  public galleryTrigger$: BehaviorSubject<ProductType | null>;

  constructor() {
    this.galleryTrigger$ = new BehaviorSubject<ProductType | null>(null);
  }

  public triggerGallery(product: ProductType | null): void {
    this.galleryTrigger$.next(product);
  }
}
