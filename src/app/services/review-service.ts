import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ReviewsData, ReviewsType } from '../data/reviews-data';

@Injectable({
  providedIn: 'root',
})
export class ReviewService {

  public getProductReviews(collection: string, offset: number = 0): Observable<ReviewsType> {

    let reviews: ReviewsType = {
      count: ReviewsData.length,
      reviews: []
    };

    if (offset >= 0 && offset <  ReviewsData.length) {

      let end: number = offset + 2;
      for (let index: number = offset; index < ReviewsData.length && index < end; index++) {

        if (ReviewsData[index].collection === collection) {
          reviews.reviews.push(ReviewsData[index]);
        }
      }
    }

    return new Observable<ReviewsType>(observer => {
      observer.next(reviews);
    });
  }
}
