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
import { CollectionsNewsType } from './types/collections-news-type';
import { CollectionsNewsData } from './data/collections/collections-news-data';

export interface SortedPageType {
  name: string,
  count: number,
  pages: number,
  items: Array<ProductType[]>
}
@Injectable({
  providedIn: 'root',
})
export class ProductsService {

  public getCollectionInfoHeader(url: string): Observable<string[]> {

    let description: string[] = [];

    for (let i: number = 0; i < AllCollectionsData.length; i++) {

      if (AllCollectionsData[i].url === url) {
        description[0] = AllCollectionsData[i].name;
        description[1] = AllCollectionsData[i].description;
        break;
      }
    }

    return new Observable<string[]>(observer => {
      observer.next(description);
    });
  }

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

  public getFullSortedCollection(url: string, sortType: string, page: number): Observable<SortedPageType | null> {

    if (url === "all-lingerie") {
      return this.getFullSortedCollectionAll(sortType, page);
    }
    if (sortType === 'Featured') {
      return this.getFullCollection(url, page);
    }
    if (sortType === 'price-asc') {
      return this.getFullPriceAscCollection(url, page);
    }
    if (sortType === 'price-desc') {
      return this.getFullPriceDescCollection(url, page);
    }

    return new Observable<SortedPageType | null>(observer => {
      observer.next(null);
    });
  }

  public getFullSortedCollectionAll(sortType: string, page: number): Observable<SortedPageType | null> {

    if (sortType === 'Featured') {
      return this.getFullCollectionAll(page);
    }
    if (sortType === 'price-asc') {
      return this.getFullPriceAscCollectionAll(page);
    }
    if (sortType === 'price-desc') {
     return this.getFullPriceDescCollectionAll(page);
    }

    return new Observable<SortedPageType | null>(observer => {
      observer.next(null);
    });
  }

  public getFullCollectionAll(page: number): Observable<SortedPageType> {

    let items: Array<ProductType[]> = [...AllCollectionsData[0].products];

    for (let i: number = 1; i < AllCollectionsData.length; i++) {

      items = items.concat(AllCollectionsData[i].products);

    }

    let pageItems: Array<ProductType[]> = [];
    let offset: number = 40 * (page - 1);
    let endOffset: number = page * 40;

    for (let j: number = offset; j < items.length && j < endOffset; j++) {

      pageItems.push(items[j]);

    }

    let result: SortedPageType = {
      name: "ALL LINGERIE",
      count: items.length,
      pages: Math.ceil(items.length / 40),
      items: pageItems
    }

    return new Observable<SortedPageType>(observer => {
      observer.next(result);
    });
  }

  public getFullPriceAscCollectionAll(page: number): Observable<SortedPageType> {


    let items: Array<ProductType[]> = [...AllCollectionsData[0].products];

    for (let i: number = 1; i < AllCollectionsData.length; i++) {

      items = items.concat(AllCollectionsData[i].products);

    }

    items = items.sort((a, b) => {
      if (a[0].price && b[0].price)
        return a[0].price - b[0].price;
      else return 0;
    });

    let pageItems: Array<ProductType[]> = [];
    let offset: number = 40 * (page - 1);
    let endOffset: number = page * 40;

    for (let j: number = offset; j < items.length && j < endOffset; j++) {

      pageItems.push(items[j]);

    }

    let result: SortedPageType = {
      name: "ALL LINGERIE",
      count: items.length,
      pages: Math.ceil(items.length / 40),
      items: pageItems
    }

    return new Observable<SortedPageType>(observer => {
      observer.next(result);
    });

  }

  public getFullPriceDescCollectionAll(page: number): Observable<SortedPageType> {


    let items: Array<ProductType[]> = [...AllCollectionsData[0].products];

    for (let i: number = 1; i < AllCollectionsData.length; i++) {

      items = items.concat(AllCollectionsData[i].products);

    }

    items = items.sort((a, b) => {
      if (a[0].price && b[0].price)
        return b[0].price - a[0].price;
      else return 0;
    });

    let pageItems: Array<ProductType[]> = [];
    let offset: number = 40 * (page - 1);
    let endOffset: number = page * 40;

    for (let j: number = offset; j < items.length && j < endOffset; j++) {

      pageItems.push(items[j]);

    }

    let result: SortedPageType = {
      name: "ALL LINGERIE",
      count: items.length,
      pages: Math.ceil(items.length / 40),
      items: pageItems
    }

    return new Observable<SortedPageType>(observer => {
      observer.next(result);
    });

  }

  public getFullPriceAscCollection(url: string, page: number): Observable<SortedPageType | null> {


    for (let i: number = 0; i < AllCollectionsData.length; i++) {
      if (AllCollectionsData[i].url === url) {

        let items = [...AllCollectionsData[i].products];
        items = items.sort((a, b) => {
          if (a[0].price && b[0].price)
            return a[0].price - b[0].price;
          else return 0;
        });

        let result: SortedPageType = {
          name: AllCollectionsData[i].name,
          count: AllCollectionsData[i].products.length,
          pages: Math.ceil(AllCollectionsData[i].products.length / 40),
          items: items
        }

        if (items.length > 40) {

          let pageItems: Array<ProductType[]> = [];
          let offset: number = 40 * (page - 1);
          let endOffset: number = page * 40;

          for (let j: number = offset; j < items.length && j < endOffset; j++) {

            pageItems.push(items[j]);

          }
          result.items = pageItems;
        }

        return new Observable<SortedPageType | null>(observer => {
          observer.next(result);
        });
      }
    }

    return new Observable<SortedPageType | null>(observer => {
      observer.next(null);
    });

  }


  public getFullPriceDescCollection(url: string, page: number): Observable<SortedPageType | null> {


    for (let i: number = 0; i < AllCollectionsData.length; i++) {
      if (AllCollectionsData[i].url === url) {

        let items = [...AllCollectionsData[i].products];
        items = items.sort((a, b) => {
          if (a[0].price && b[0].price)
            return b[0].price - a[0].price;
          else return 0;
        });

        let result: SortedPageType = {
          name: AllCollectionsData[i].name,
          count: AllCollectionsData[i].products.length,
          pages: Math.ceil(AllCollectionsData[i].products.length / 40),
          items: items
        }

        if (items.length > 40) {

          let pageItems: Array<ProductType[]> = [];
          let offset: number = 40 * (page - 1);
          let endOffset: number = page * 40;

          for (let j: number = offset; j < items.length && j < endOffset; j++) {

            pageItems.push(items[j]);

          }
          result.items = pageItems;
        }

        return new Observable<SortedPageType | null>(observer => {
          observer.next(result);
        });
      }
    }

    return new Observable<SortedPageType | null>(observer => {
      observer.next(null);
    });

  }

  public getFullCollection(url: string, page: number): Observable<SortedPageType | null> {

    for (let i: number = 0; i < AllCollectionsData.length; i++) {

      if (AllCollectionsData[i].url === url) {

        let result: SortedPageType = {
          name: AllCollectionsData[i].name,
          count: AllCollectionsData[i].products.length,
          pages: Math.ceil(AllCollectionsData[i].products.length / 40),
          items: AllCollectionsData[i].products
        }

        if (AllCollectionsData[i].products.length > 40) {

          let pageItems: Array<ProductType[]> = [];
          let offset: number = 40 * (page - 1);
          let endOffset: number = page * 40;

          for (let j: number = offset; j < AllCollectionsData[i].products.length && j < endOffset; j++) {

            pageItems.push(AllCollectionsData[i].products[j]);

          }
          result.items = pageItems;
        }

        return new Observable<SortedPageType | null>(observer => {
          observer.next(result);
        });

      }
    }

    return new Observable<SortedPageType | null>(observer => {
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

          if (productType.includes('lingerie-collection')) {

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
                }
                set.push(item);
              }
            }

          }
          else {
            let item = AllCollectionsData[i].products[j];
            let color = item.find((p) => p.colorName === colorName);
            if (color !== undefined) {

              let index: number = item.indexOf(color);
              if (index !== 0) {
                let p = item[0];
                item[0] = color;
                item[index] = p;
              }
            }
            set.push(item);
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
