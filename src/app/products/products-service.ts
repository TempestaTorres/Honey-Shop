import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { NewsType } from './types/news';
import { NewsData } from './data/news-data';
import { LingerieData } from './data/lingerie-data';
import { CollectionsData } from './data/collections-data';
import { AccessoriesData } from './data/accessories-data';
import { BoutiquesData } from './data/boutiques-data';
import { ProductItem, ProductType } from './types/product-type';
import { NewArrivalData } from './data/new-arrival-data';
import { BridalLingerieData } from './data/bridal-lingerie-data';
import { RecommendedData } from './data/recommended-data';
import { AllCollectionsData } from './data/collections/collections-data';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {

  public getCollection(url: string): Observable<Array<ProductType[]> | null> {

    for (let i: number = 0; i < AllCollectionsData.length; i++) {

      if (AllCollectionsData[i].url === url) {

        return new Observable<Array<ProductType[]> | null>(observer => {
          observer.next(AllCollectionsData[i].products);
        });
      }
    }

    return new Observable<Array<ProductType[]> | null>(observer => {
      observer.next(null);
    });
  }

  public getNewArrivals(): Observable<ProductItem[]> {

    return new Observable<ProductItem[]>(observer => {
      observer.next(NewArrivalData);
    });
  }
  public getBridalLingerie(): Observable<ProductItem[]> {

    return new Observable<ProductItem[]>(observer => {
      observer.next(BridalLingerieData);
    });
  }

  public getNews(): Observable<NewsType[]> {

    return new Observable<NewsType[]>(observer => {
      observer.next(NewsData);
    });
  }

  public getRecommended(): Observable<ProductItem[]> {

    return new Observable<ProductItem[]>(observer => {
      observer.next(RecommendedData);
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
