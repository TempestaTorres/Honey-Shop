import { Injectable } from '@angular/core';
import { filter, Observable } from 'rxjs';
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
import { CollectionsNewsType } from './types/collections-news-type';
import { CollectionsNewsData } from './data/collections/collections-news-data';

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

  public getCollectionItem(collectionName: string, itemType: string): Observable<ProductType[] | null> {

    for (let i: number = 0; i < AllCollectionsData.length; i++) {

      for (let j: number = 0; j < AllCollectionsData[i].products.length; j++) {

        let item: ProductType[] = AllCollectionsData[i].products[j];

        let product = item.find((item) => item.name === collectionName
        && item.description === itemType);


        if (product !== undefined) {

          return new Observable<ProductType[]>(observer => {
            observer.next(item);
          });
        }
      }
    }

    return new Observable<ProductType[] | null>(observer => {
      observer.next(null);
    });

  }

  public getCollectionItemByUrl(collectionName: string, url: string): Observable<ProductType[] | null> {

    for (let i: number = 0; i < AllCollectionsData.length; i++) {

      for (let j: number = 0; j < AllCollectionsData[i].products.length; j++) {

        let item: ProductType[] = AllCollectionsData[i].products[j];

        let product = item.find((item) => item.name === collectionName
        && item.url === url);


        if (product !== undefined) {

          return new Observable<ProductType[]>(observer => {
            observer.next(item);
          });
        }
      }
    }

    return new Observable<ProductType[] | null>(observer => {
      observer.next(null);
    });

  }

  public getShopProductSet(collection: string, url: string): Observable<ProductType[]> {
    let set: ProductType[] = [];

    for (let i: number = 0; i < AllCollectionsData.length; i++) {

      if (AllCollectionsData[i].name === collection) {

        for (let j: number = 0; j < AllCollectionsData[i].products.length; j++) {

          let product: ProductType | undefined = AllCollectionsData[i].products[j]
            .find(product => product.type === "lingerie-set" && product.url === url);

          if (product !== undefined && product.setItems !== undefined) {
            set = this.getSet(product.setItems);

            return new Observable<ProductType[]>(observer => {
              observer.next(set);
            });
          }
        }
      }
    }

    return new Observable<ProductType[]>(observer => {
      observer.next(set);
    });
  }

  private getSet(sets: string[]): ProductType[] {
    let set: ProductType[] = [];

    for (let i: number = 0; i < sets.length; i++) {

      let item = this.getProduct(sets[i]);
      if (item !== null) {
        set.push(item);
      }
    }
    return set;
  }

  public getShopProductSets(collection: string, colorName: string): Observable<ProductType[]> {

    let sets: ProductType[] = [];

    for (let i: number = 0; i < AllCollectionsData.length; i++) {

      if (AllCollectionsData[i].name === collection) {

        for (let j: number = 0; j < AllCollectionsData[i].products.length; j++) {

          let product: ProductType | undefined = AllCollectionsData[i].products[j]
            .find(product => product.type === "lingerie-set" && product.colorName === colorName);
          if (product !== undefined) {
            sets.push(product);
          }
        }
      }
    }

    return new Observable<ProductType[]>(observer => {
      observer.next(sets);
    });
  }

  public getCompleteLook(collectionUrl: string, productType: string, colorName: string): Observable<Array<ProductType[]>> {
    let set: Array<ProductType[]> = [];

    for (let i: number = 0; i < AllCollectionsData.length; i++) {

      if (AllCollectionsData[i].url === collectionUrl) {

        for (let j: number = 0; j < AllCollectionsData[i].products.length; j++) {

          if (AllCollectionsData[i].products[j][0].type !== productType) {

            let item = AllCollectionsData[i].products[j]
              .filter(product => product.type !== "lingerie-set");

            if (item !== undefined) {

              let color = item.find((p) => p.colorName === colorName);
              if (color !== undefined) {

                let index: number = item.indexOf(color);
                if (index !== 0) {
                  let p = item[0];
                  item[0] = color;
                  item[index] = p;
                }


                set.push(item);
              }

            }
          }

        }
      }
    }

    return new Observable<Array<ProductType[]>>(observer => {
      observer.next(set);
    });
  }

  public getShopProduct(url: string): Observable<ProductType | null> {

    for (let i: number = 0; i < AllCollectionsData.length; i++) {

      for (let j: number = 0; j < AllCollectionsData[i].products.length; j++) {

        let product: ProductType | undefined = AllCollectionsData[i].products[j].find(product => product.url === url);

        if (product) {
          return new Observable<ProductType | null>(observer => {
            observer.next(product);
          });
        }
      }
    }

    return new Observable<ProductType | null>(observer => {
      observer.next(null);
    })
  }

  private getProduct(url: string): ProductType | null {

    let product: ProductType | null = null;

    for (let i: number = 0; i < AllCollectionsData.length; i++) {

      for (let j: number = 0; j < AllCollectionsData[i].products.length; j++) {

        let item: ProductType | undefined = AllCollectionsData[i].products[j].find(product => product.url === url);

        if (item !== undefined) {
          return item;
        }
      }
    }

    return product;
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

  public getCollectionsNews(): Observable<CollectionsNewsType[]> {

    return new Observable<CollectionsNewsType[]>(observer => {
      observer.next(CollectionsNewsData);
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
