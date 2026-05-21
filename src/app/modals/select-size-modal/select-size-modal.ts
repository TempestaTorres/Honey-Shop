import { Component, OnDestroy, OnInit, signal, WritableSignal } from '@angular/core';
import { SelectSizeService } from './select-size-service';
import { Subscription } from 'rxjs';
import { ImageSwiper } from '../../components/image-swiper/image-swiper';
import { ProductType } from '../../products/types/product-type';

@Component({
  selector: 'app-select-size-modal',
  imports: [ImageSwiper],
  templateUrl: './select-size-modal.html',
})
export class SelectSizeModal implements OnInit, OnDestroy {

  private selectedSizeSubscription$: Subscription | undefined;

  public productDetails: WritableSignal<ProductType | null> =
    signal<ProductType | null>(null);

  constructor(private selectSizeService$: SelectSizeService) {}

  ngOnInit(): void {
    this.selectedSizeSubscription$ = this.selectSizeService$.selectSizeOpen$.subscribe(
      (product) => {
        this.productDetails.set(product);
      },
    );
  }

  ngOnDestroy(): void {
    if (this.selectedSizeSubscription$) {
      this.selectedSizeSubscription$.unsubscribe();
    }
  }

  public modalClose(): void {
    this.selectSizeService$.triggerSizeSelectionChanged(null);
  }
}
