import { Component, DestroyRef, effect, input, signal, WritableSignal } from '@angular/core';
import { ProductType } from '../../products/types/product-type';
import { ReviewService } from '../../services/review-service';
import { Subscription } from 'rxjs';
import { ReviewType } from '../../data/reviews-data';

@Component({
  selector: 'app-product-review',
  imports: [],
  templateUrl: './product-review.html',
  styleUrl: './product-review.css',
})
export class ProductReview {

  productItem = input.required<ProductType>();
  private reviewSubscription: Subscription = new Subscription();
  private offset: number = 0;
  private count: number = 0;

  public reviews: WritableSignal<ReviewType[]> = signal<ReviewType[]>([]);
  public averageRating: WritableSignal<number> = signal<number>(1);
  public reviewCount: WritableSignal<string> = signal<string>('0');
  public loading: WritableSignal<boolean> = signal<boolean>(false);
  public loadingDisabled: WritableSignal<boolean> = signal<boolean>(true);

  constructor(private reviewService: ReviewService,
              private destroyRef: DestroyRef) {

    effect(() => {

      const product = this.productItem();
      if (product.ratings) {
        this.offset = 0;
        let sum  = product.ratings.stars.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
        this.averageRating.set(sum);
        this.reviewCount.set(product.ratings.score);
        this.reviews.set([]);

        this.getReviews(product);
      }
    });

    this.destroyRef.onDestroy(() => {

      if (this.reviewSubscription) {
        this.reviewSubscription.unsubscribe();
      }
    })
  }

  public loadReviews(): void {

    const product = this.productItem();
    this.getReviews(product);

  }

  private getReviews(product: ProductType): void {

    this.loading.set(true);

    setTimeout(() => {
      if (this.reviewSubscription) {
        this.reviewSubscription.unsubscribe();
      }

      this.reviewSubscription = this.reviewService.getProductReviews(product.collection, this.offset)
        .subscribe(reviews => {
          this.reviews.update((value) => {

            if (reviews.reviews.length > 0) {
              let items = value as ReviewType[];

              return items.concat(reviews.reviews);
            }
            return value;
          });

          this.count = reviews.count;
          if (this.count > 2 && this.loading()) {
            this.loadingDisabled.set(false);
          }

          this.offset += reviews.reviews.length;

          if (this.offset >= this.count) {
            this.loadingDisabled.set(true);
          }

          this.loading.set(false);
        });

    }, 1000);
  }

}
