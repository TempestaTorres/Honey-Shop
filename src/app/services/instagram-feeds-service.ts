import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { InstagramFeedType } from '../types/instagram/instagram-feeds-type';
import { InstagramFeedsData } from '../data/instagram-feeds-data';

@Injectable({
  providedIn: 'root',
})
export class InstagramFeedsService {

  public openedFeed: BehaviorSubject<number>;

  private i: number = -1;

  constructor() {
    this.openedFeed = new BehaviorSubject<number>(-1);
  }

  public getInstagramFeeds(): Observable<InstagramFeedType[]> {

    return new Observable<InstagramFeedType[]>(observer => {
      observer.next(InstagramFeedsData);
    });
  }

  public toggleOpenedFeed(index: number) {
    this.i = index;
    this.openedFeed.next(index);
  }

  public isFeedOpened(): boolean {
    return this.i !== -1;
  }

  public getFeed(index: number): InstagramFeedType | null {

    if (index >= 0 && index < InstagramFeedsData.length) {

      return InstagramFeedsData[index];
    }
    return null;
  }

  public getFeedsCount(): number {return InstagramFeedsData.length;}
}
