import { Component, input, OnDestroy, OnInit, signal, WritableSignal } from '@angular/core';
import { ProductType } from '../../products/types/product-type';
import { Subscription } from 'rxjs';
import { FeaturesService } from '../../components/product-description/features-service';
import { TabListDescription } from '../../components/tab-list-description/tab-list-description';
import { Router } from '@angular/router';

@Component({
  selector: 'app-modal-features',
  imports: [TabListDescription],
  templateUrl: './modal-features.html',
  styleUrl: './modal-features.css',
})
export class ModalFeatures implements OnInit, OnDestroy {
  productItem = input.required<ProductType>();
  public open: WritableSignal<boolean> = signal<boolean>(false);
  public index: WritableSignal<string> = signal<string>('0');

  private subscription$: Subscription | undefined;

  constructor(private featureService: FeaturesService,
              private router: Router,) {
    // Make features requests
  }

  ngOnInit(): void {
    this.subscription$ = this.featureService.featuresOpen$.subscribe((features) => {
      if (features !== null) {
        this.index.set(features);

        requestAnimationFrame(() => this.open.set(true));
      } else {
        this.open.set(false);
        this.index.set('0');
      }
    });
  }

  ngOnDestroy(): void {
    if (this.subscription$) {
      this.subscription$.unsubscribe();
    }
  }

  public closeModal(): void {
    this.featureService.triggerFeatures();
  }

  public navigateTo(url: string): void {
    this.closeModal();
    setTimeout(() => {
      this.router.navigate([url]).then(() => {});
    },400);
  }
}
