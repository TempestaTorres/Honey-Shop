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
import {
  AllCollectionsColoursData,
  AllCollectionsData,
  AllSubCollectionsData
} from './data/collections/collections-data';
import { CollectionsNewsType } from './types/collections-news-type';
import { CollectionsNewsData } from './data/collections/collections-news-data';

const ITEMS_PER_PAGE = 80;
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

  public getCollectionColours(collectionUrl: string): Observable<{colorName: string, colorClass: string}[]> {

    let colors: {colorName: string; colorClass: string}[] = [];

    for (let i: number = 0; i < AllCollectionsColoursData.length; i++) {
      if (AllCollectionsColoursData[i].url === collectionUrl) {
        colors = AllCollectionsColoursData[i].colors;
        break;
      }
    }

    return new Observable(observer => {
      observer.next(colors);
    });
  }

  public getCollectionProductTypes(collectionUrl: string): Observable<string[]> {

    let types: string[] = [];

    if (collectionUrl === "all-lingerie") {

      let items: Array<ProductType[]> = [...AllCollectionsData[0].products];

      for (let i: number = 1; i < AllCollectionsData.length; i++) {
        items = items.concat(AllCollectionsData[i].products);
      }

      for (let j: number = 0; j < items.length; j++) {

        let product = items[j];
        let type = product[0].type;
        if (type && type !== 'lingerie-set' && type !== 'video') {

          let found: boolean = types.some(value => value === type);
          if (!found) {
            types.push(type);
          }

        }
      }

      return new Observable<string[]>(observer => {
        observer.next(types);
      });
    }

    if (collectionUrl.includes('collection')) {

      for (let i: number = 0; i < AllCollectionsData.length; i++) {

        if (AllCollectionsData[i].url === collectionUrl) {
          for (let j: number = 0; j < AllCollectionsData[i].products.length; j++) {

            let product = [...AllCollectionsData[i].products[j]];
            let type = product[0].type;

            if (type && type !== 'lingerie-set' && type !== 'video') {

              let found: boolean = types.some(value => value === type);
              if (!found) {
                types.push(type);
              }

            }
          }
          return new Observable<string[]>(observer => {
            observer.next(types);
          });
        }
      }

    }

    for (let i: number = 0; i < AllSubCollectionsData.length; i++) {

      if (AllSubCollectionsData[i].url === collectionUrl) {
        for (let j: number = 0; j < AllSubCollectionsData[i].products.length; j++) {

          let product = [...AllSubCollectionsData[i].products[j]];
          let type = product[0].type;

          if (type !== undefined && type !== 'video') {
            let found: boolean = types.some(value => value === type);
            if (!found) {
              types.push(type);
            }
          }
        }
        return new Observable<string[]>(observer => {
          observer.next(types);
        });
      }
    }

    return new Observable<string[]>(observer => {
      observer.next(types);
    });
  }

  public getCollectionInfoHeader(url: string): Observable<string[]> {

    let description: string[] = [];

    if (url.includes('collection')) {

      for (let i: number = 0; i < AllCollectionsData.length; i++) {

        if (AllCollectionsData[i].url === url) {
          description[0] = AllCollectionsData[i].name;
          description[1] = AllCollectionsData[i].description;
          break;
        }
      }
    }
    else {
      for (let i: number = 0; i < AllSubCollectionsData.length; i++) {

        if (AllSubCollectionsData[i].url === url) {
          description[0] = AllSubCollectionsData[i].name;
          description[1] = AllSubCollectionsData[i].description;
          break;
        }
      }
    }

    return new Observable<string[]>(observer => {
      observer.next(description);
    });
  }

  public getCollection(url: string): Observable<Array<ProductType[]> | null> {

    if (url.includes('collection')) {
      for (let i: number = 0; i < AllCollectionsData.length; i++) {

        if (AllCollectionsData[i].url === url) {

          return new Observable<Array<ProductType[]> | null>(observer => {
            observer.next(AllCollectionsData[i].products);
          });
        }
      }
    }
    else {
      for (let i: number = 0; i < AllSubCollectionsData.length; i++) {

        if (AllSubCollectionsData[i].url === url) {

          return new Observable<Array<ProductType[]> | null>(observer => {
            observer.next(AllSubCollectionsData[i].products);
          });
        }
      }
    }

    return new Observable<Array<ProductType[]> | null>(observer => {
      observer.next(null);
    });
  }

  public getFullSortedCollection(url: string, sortType: string, page: number,
                                 colors: string[] = [], types: string[] = []): Observable<SortedPageType | null> {

    if (url === "all-lingerie") {
      return this.getFullSortedCollectionAll(sortType, page, colors, types);
    }
    if (sortType === 'Featured') {
      return this.getFullCollection(url, page, colors, types);
    }
    if (sortType === 'price-asc') {
      return this.getFullPriceAscCollection(url, page, colors, types);
    }
    if (sortType === 'price-desc') {
      return this.getFullPriceDescCollection(url, page, colors, types);
    }

    return new Observable<SortedPageType | null>(observer => {
      observer.next(null);
    });
  }

  public getFullSortedCollectionAll(sortType: string, page: number, colors: string[] = [], types: string[] = []): Observable<SortedPageType | null> {

    if (sortType === 'Featured') {
      return this.getFullCollectionAll(page, colors, types);
    }
    if (sortType === 'price-asc') {
      return this.getFullPriceAscCollectionAll(page, colors, types);
    }
    if (sortType === 'price-desc') {
     return this.getFullPriceDescCollectionAll(page, colors, types);
    }

    return new Observable<SortedPageType | null>(observer => {
      observer.next(null);
    });
  }

  public getFullCollectionAll(page: number, colors: string[] = [], types: string[] = []): Observable<SortedPageType> {

    let items: Array<ProductType[]> = [...AllCollectionsData[0].products];

    for (let i: number = 1; i < AllCollectionsData.length; i++) {

      let products = [...AllCollectionsData[i].products];
      products = products.filter(product => product[0].type !== 'video');

      items = items.concat(products);
    }
    if (colors.length > 0) {
      items = this.sortByColors(items, colors);
    }
    if (types.length > 0) {
      items = this.sortByTypes(items, types);
    }

    let pages: number = Math.ceil(items.length / ITEMS_PER_PAGE);

    if (page > pages) page = pages;

    let pageItems: Array<ProductType[]> = [];

    if (items.length > 0) {

      let offset: number = ITEMS_PER_PAGE * (page - 1);
      let endOffset: number = page * ITEMS_PER_PAGE;

      for (let j: number = offset; j < items.length && j < endOffset; j++) {
        pageItems.push(items[j]);
      }
    }

    let result: SortedPageType = {
      name: "ALL LINGERIE",
      count: items.length,
      pages: pages,
      items: pageItems
    }

    return new Observable<SortedPageType>(observer => {
      observer.next(result);
    });
  }

  public getFullPriceAscCollectionAll(page: number, colors: string[] = [], types: string[] = []): Observable<SortedPageType> {


    let items: Array<ProductType[]> = [...AllCollectionsData[0].products];

    for (let i: number = 1; i < AllCollectionsData.length; i++) {

      let products = [...AllCollectionsData[i].products];
      products = products.filter(product => product[0].type !== 'video');

      items = items.concat(products);

    }

    if (colors.length > 0) {
      items = this.sortByColors(items, colors);
    }
    if (types.length > 0) {
      items = this.sortByTypes(items, types);
    }

    items = items.sort((a, b) => {
      if (a[0].price && b[0].price)
        return a[0].price - b[0].price;
      else return 0;
    });

    let pageItems: Array<ProductType[]> = [];
    let pages: number = Math.ceil(items.length / ITEMS_PER_PAGE);

    if (page > pages) page = pages;

    if (items.length > 0) {

      let offset: number = ITEMS_PER_PAGE * (page - 1);
      let endOffset: number = page * ITEMS_PER_PAGE;

      for (let j: number = offset; j < items.length && j < endOffset; j++) {
        pageItems.push(items[j]);
      }
    }

    let result: SortedPageType = {
      name: "ALL LINGERIE",
      count: items.length,
      pages: pages,
      items: pageItems
    }

    return new Observable<SortedPageType>(observer => {
      observer.next(result);
    });

  }

  private sortByColors(items: Array<ProductType[]>, colors: string[]): Array<ProductType[]> {

    let filteredItems: Array<ProductType[]> = [];

    for (let j = 0; j < colors.length; j++) {
      let color = colors[j];

      for (let k = 0; k < items.length; k++) {

        let fItem: ProductType[]  = items[k].filter(item => {
          return item.colorName === color;
        });
        if (fItem.length > 0) {
          filteredItems.push(fItem);
        }
      }
    }

    return filteredItems;
  }

  private sortByTypes(items: Array<ProductType[]>, types: string[]): Array<ProductType[]> {

    let filteredItems: Array<ProductType[]> = [];

    for (let j = 0; j < types.length; j++) {
      let type = types[j];

      for (let k = 0; k < items.length; k++) {

        let fItem: ProductType[]  = items[k].filter(item => {
          return item.type === type;
        });
        if (fItem.length > 0) {
          filteredItems.push(fItem);
        }
      }
    }

    return filteredItems;
  }

  public getFullPriceDescCollectionAll(page: number, colors: string[] = [], types: string[] = []): Observable<SortedPageType> {

    let items: Array<ProductType[]> = [...AllCollectionsData[0].products];

    for (let i: number = 1; i < AllCollectionsData.length; i++) {

      let products = [...AllCollectionsData[i].products];
      products = products.filter(product => product[0].type !== 'video');

      items = items.concat(products);
    }

    if (colors.length > 0) {
      items = this.sortByColors(items, colors);
    }
    if (types.length > 0) {
      items = this.sortByTypes(items, types);
    }

    items = items.sort((a, b) => {
      if (a[0].price && b[0].price)
        return b[0].price - a[0].price;
      else return 0;
    });

    let pageItems: Array<ProductType[]> = [];
    let pages: number = Math.ceil(items.length / ITEMS_PER_PAGE);

    if (page > pages) page = pages;

    if (items.length > 0) {
      let offset: number = ITEMS_PER_PAGE * (page - 1);
      let endOffset: number = page * ITEMS_PER_PAGE;

      for (let j: number = offset; j < items.length && j < endOffset; j++) {
        pageItems.push(items[j]);
      }
    }

    let result: SortedPageType = {
      name: "ALL LINGERIE",
      count: items.length,
      pages: pages,
      items: pageItems
    }

    return new Observable<SortedPageType>(observer => {
      observer.next(result);
    });

  }

  public getFullPriceAscCollection(url: string, page: number, colors: string[] = [], types: string[] = []): Observable<SortedPageType | null> {

    if (!url.includes('collection')) {
      return this.getFullPriceAscSubCollection(url, page, colors);
    }

    for (let i: number = 0; i < AllCollectionsData.length; i++) {
      if (AllCollectionsData[i].url === url) {

        let items = [...AllCollectionsData[i].products];

        if (colors.length > 0) {
          items = this.sortByColors(items, colors);
        }
        if (types.length > 0) {
          items = this.sortByTypes(items, types);
        }

        items = items.sort((a, b) => {
          if (a[0].price && b[0].price)
            return a[0].price - b[0].price;
          else return 0;
        });

        let pageItems: Array<ProductType[]> = [];

        let pages: number = Math.ceil(items.length / ITEMS_PER_PAGE);

        if (page > pages) page = pages;

        if (items.length > 0) {
          let offset: number = ITEMS_PER_PAGE * (page - 1);
          let endOffset: number = page * ITEMS_PER_PAGE;

          for (let j: number = offset; j < items.length && j < endOffset; j++) {
            pageItems.push(items[j]);
          }
        }

        let result: SortedPageType = {
          name: AllCollectionsData[i].name,
          count: items.length,
          pages: pages,
          items: pageItems
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

  public getFullPriceAscSubCollection(url: string, page: number, colors: string[] = []): Observable<SortedPageType | null> {

    for (let i: number = 0; i < AllSubCollectionsData.length; i++) {
      if (AllSubCollectionsData[i].url === url) {

        let items = [...AllSubCollectionsData[i].products];

        if (colors.length > 0) {
          items = this.sortByColors(items, colors);
        }

        items = items.sort((a, b) => {
          if (a[0].price && b[0].price)
            return a[0].price - b[0].price;
          else return 0;
        });

        let pageItems: Array<ProductType[]> = [];

        let pages: number = Math.ceil(items.length / ITEMS_PER_PAGE);

        if (page > pages) page = pages;

        if (items.length > 0) {
          let offset: number = ITEMS_PER_PAGE * (page - 1);
          let endOffset: number = page * ITEMS_PER_PAGE;

          for (let j: number = offset; j < items.length && j < endOffset; j++) {
            pageItems.push(items[j]);
          }
        }

        let result: SortedPageType = {
          name: AllSubCollectionsData[i].name,
          count: items.length,
          pages: pages,
          items: pageItems
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

  public getFullPriceDescCollection(url: string, page: number, colors: string[] = [], types: string[] = []): Observable<SortedPageType | null> {

    if (!url.includes('collection')) {
      return this.getFullPriceDescSubCollection(url, page, colors);
    }

    for (let i: number = 0; i < AllCollectionsData.length; i++) {
      if (AllCollectionsData[i].url === url) {

        let items = [...AllCollectionsData[i].products];

        if (colors.length > 0) {
          items = this.sortByColors(items, colors);
        }
        if (types.length > 0) {
          items = this.sortByTypes(items, types);
        }

        items = items.sort((a, b) => {
          if (a[0].price && b[0].price)
            return b[0].price - a[0].price;
          else return 0;
        });

        let pageItems: Array<ProductType[]> = [];

        let pages: number = Math.ceil(items.length / ITEMS_PER_PAGE);

        if (page > pages) page = pages;

        if (items.length > 0) {
          let offset: number = ITEMS_PER_PAGE * (page - 1);
          let endOffset: number = page * ITEMS_PER_PAGE;

          for (let j: number = offset; j < items.length && j < endOffset; j++) {
            pageItems.push(items[j]);
          }
        }

        let result: SortedPageType = {
          name: AllCollectionsData[i].name,
          count: items.length,
          pages: pages,
          items: pageItems
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

  public getFullPriceDescSubCollection(url: string, page: number, colors: string[] = []): Observable<SortedPageType | null> {

    for (let i: number = 0; i < AllSubCollectionsData.length; i++) {
      if (AllSubCollectionsData[i].url === url) {

        let items = [...AllSubCollectionsData[i].products];

        if (colors.length > 0) {
          items = this.sortByColors(items, colors);
        }

        items = items.sort((a, b) => {
          if (a[0].price && b[0].price)
            return b[0].price - a[0].price;
          else return 0;
        });

        let pageItems: Array<ProductType[]> = [];

        let pages: number = Math.ceil(items.length / ITEMS_PER_PAGE);

        if (page > pages) page = pages;

        if (items.length > 0) {
          let offset: number = ITEMS_PER_PAGE * (page - 1);
          let endOffset: number = page * ITEMS_PER_PAGE;

          for (let j: number = offset; j < items.length && j < endOffset; j++) {
            pageItems.push(items[j]);
          }
        }

        let result: SortedPageType = {
          name: AllSubCollectionsData[i].name,
          count: items.length,
          pages: pages,
          items: pageItems
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

  public getFullCollection(url: string, page: number, colors: string[] = [], types: string[] = []): Observable<SortedPageType | null> {

    if (!url.includes('collection')) {
      return this.getFullSubCollection(url, page, colors);
    }

    for (let i: number = 0; i < AllCollectionsData.length; i++) {

      if (AllCollectionsData[i].url === url) {

        let items: Array<ProductType[]> = [...AllCollectionsData[i].products];

        if (colors.length > 0) {
          items = this.sortByColors(items, colors);
        }
        if (types.length > 0) {
          items = this.sortByTypes(items, types);
        }

        let pageItems: Array<ProductType[]> = [];

        let pages: number = Math.ceil(items.length / ITEMS_PER_PAGE);

        if (page > pages) page = pages;

        if (items.length > 0) {
          let offset: number = ITEMS_PER_PAGE * (page - 1);
          let endOffset: number = page * ITEMS_PER_PAGE;

          for (let j: number = offset; j < items.length && j < endOffset; j++) {
            pageItems.push(items[j]);
          }
        }

        let result: SortedPageType = {
          name: AllCollectionsData[i].name,
          count: items.length,
          pages: pages,
          items: pageItems
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

  public getFullSubCollection(url: string, page: number, colors: string[] = []): Observable<SortedPageType | null> {

    for (let i: number = 0; i < AllSubCollectionsData.length; i++) {

      if (AllSubCollectionsData[i].url === url) {

        let items: Array<ProductType[]> = [...AllSubCollectionsData[i].products];

        if (colors.length > 0) {
          items = this.sortByColors(items, colors);
        }

        let pageItems: Array<ProductType[]> = [];

        let pages: number = Math.ceil(items.length / ITEMS_PER_PAGE);

        if (page > pages) page = pages;

        if (items.length > 0) {
          let offset: number = ITEMS_PER_PAGE * (page - 1);
          let endOffset: number = page * ITEMS_PER_PAGE;

          for (let j: number = offset; j < items.length && j < endOffset; j++) {
            pageItems.push(items[j]);
          }
        }

        let result: SortedPageType = {
          name: AllSubCollectionsData[i].name,
          count: items.length,
          pages: pages,
          items: pageItems
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

  public getCollectionItem(collectionUrl: string, itemUrl: string): Observable<ProductType[] | null> {

    for (let i: number = 0; i < AllCollectionsData.length; i++) {

      for (let j: number = 0; j < AllCollectionsData[i].products.length; j++) {

        let item: ProductType[] = [...AllCollectionsData[i].products[j]];

        let product = item.find((item) => item.collection === collectionUrl
        && item.url === itemUrl);


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

        let item: ProductType[] = [...AllCollectionsData[i].products[j]];

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

  public getCompleteLook(collectionUrl: string, productUrl: string, productType: string, colorName: string): Observable<Array<ProductType[]>> {
    let set: Array<ProductType[]> = [];

    if (collectionUrl.includes('collection')) {

      for (let i: number = 0; i < AllCollectionsData.length; i++) {

        if (AllCollectionsData[i].url === collectionUrl) {

          const items: Array<ProductType[]> = [...AllCollectionsData[i].products];

          if (items.length > 1) {

            for (let j: number = 0; j < items.length; j++) {

              let collectionSet: ProductType[] = items[j];

              if (collectionSet[0].type !== productType && collectionSet[0].type !== 'video') {

                set.push(collectionSet);
              }
            }

          }

        }
      }
    }
    else {
      for (let i: number = 0; i < AllSubCollectionsData.length; i++) {
        if (AllSubCollectionsData[i].url === collectionUrl) {

          const items: Array<ProductType[]> = [...AllSubCollectionsData[i].products];

          if (items.length > 1) {

            for (let j: number = 0; j < items.length; j++) {

              let collectionSet: ProductType[] = items[j];

              if (collectionSet[0].type !== 'video') {

                let found: boolean = collectionSet.some((item) => item.url === productUrl);

                if (!found) {
                  set.push(collectionSet);
                }
                else if (found && collectionSet.length > 1) {
                  let filtered = collectionSet
                    .filter((item) => item.colorName !== colorName);

                  if (filtered.length > 0) {
                    set.push(filtered);
                  }
                }
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

    for (let i: number = 0; i < AllSubCollectionsData.length; i++) {

      for (let j: number = 0; j < AllSubCollectionsData[i].products.length; j++) {

        let product: ProductType | undefined = AllSubCollectionsData[i].products[j].find(product => product.url === url);

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

    if (product === null) {

      for (let i: number = 0; i < AllSubCollectionsData.length; i++) {

        for (let j: number = 0; j < AllSubCollectionsData[i].products.length; j++) {

          let item: ProductType | undefined = AllSubCollectionsData[i].products[j].find(product => product.url === url);

          if (item !== undefined) {
            return item;
          }
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
