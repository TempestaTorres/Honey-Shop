import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { NewsType } from './types/news';
import { NewsData } from './data/news-data';
import { LingerieData } from './data/lingerie-data';
import { CollectionsData } from './data/collections-data';
import { AccessoriesData } from './data/accessories-data';
import { BoutiquesData } from './data/boutiques-data';
import { ProductItem } from './types/product-type';
import { NewArrivalData } from './data/new-arrival-data';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {

  public getNewArrivals(): Observable<ProductItem[]> {

    return new Observable<ProductItem[]>(observer => {
      observer.next(NewArrivalData);
    });
  }

  public getNews(): Observable<NewsType[]> {

    return new Observable<NewsType[]>(observer => {
      observer.next(NewsData);
    });
  }

  public getNewsLingerie(): Observable<NewsType[]> {

    return new Observable<NewsType[]>(observer => {
      observer.next(LingerieData);
    });
  }

  public getNewsCollections(): Observable<NewsType[]> {

    return new Observable<NewsType[]>(observer => {
      observer.next(CollectionsData);
    });
  }

  public getNewsAccessories(): Observable<NewsType[]> {

    return new Observable<NewsType[]>(observer => {
      observer.next(AccessoriesData);
    });
  }

  public getNewsBoutiques(): Observable<NewsType[]> {

    return new Observable<NewsType[]>(observer => {
      observer.next(BoutiquesData);
    });
  }
}
