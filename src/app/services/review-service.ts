import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ReviewsData, ReviewsType, ReviewType } from '../data/reviews-data';

@Injectable({
  providedIn: 'root',
})
export class ReviewService {

  public getProductReviews(collection: string, offset: number = 0): Observable<ReviewsType> {

    let reviews: ReviewsType = {
      count: 0,
      reviews: []
    };

    for (let i: number = 0; i < ReviewsData.length; i++) {

      const reviewsData: ReviewType[] = [...ReviewsData[i]];

      if (reviewsData[0].collection === collection) {
        reviews.count = reviewsData.length;

        if (offset >= 0 && offset <  reviewsData.length) {
          let end: number = offset + 2;

          for (let index: number = offset; index < reviewsData.length && index < end; index++) {
            reviews.reviews.push(reviewsData[index]);
          }
        }
      }
    }

    return new Observable<ReviewsType>(observer => {
      observer.next(reviews);
    });
  }
}
