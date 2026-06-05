import { Component, DestroyRef, effect, input, signal, WritableSignal } from '@angular/core';
import { ProductsService } from '../../products/products-service';
import { Subscription } from 'rxjs';
import { RouterLink } from '@angular/router';
declare var Swiper: any;

@Component({
  selector: 'app-collections-header',
  imports: [RouterLink],
  templateUrl: './collections-header.html',
  styleUrl: './collections-header.css',
})
export class CollectionsHeader {
  collectionType = input.required<string>();

  public headerTitle: WritableSignal<string> = signal<string>('');
  public headerDescription: WritableSignal<string> = signal<string>('');
  public navigationNeeded: WritableSignal<boolean> = signal<boolean>(false);

  public plpHeaderData: {name: string, url: string}[] = [
    {
      name: "Best Sellers",
      url: "bestsellers"
    },
    {
      name: "Lace Lingerie",
      url: "lace-lingerie"
    },
    {
      name: "Bondage Lingerie",
      url: "bondage-lingerie"
    },
    {
      name: "Bras",
      url: "bras"
    },
    {
      name: "Bottoms",
      url: "bottoms"
    },
    {
      name: "Briefs",
      url: "briefs"
    },
    {
      name: "Thongs",
      url: "thongs"
    },
    {
      name: "Suspenders",
      url: "suspenders"
    },
    {
      name: "Lingerie Bodysuits",
      url: "bodysuits"
    },
    {
      name: "Bustiers & Corsets",
      url: "bustiers-corset"
    },
    {
      name: "NAKEDS 2.0",
      url: "nakeds-lingerie-collection"
    },
    {
      name: "Stockings",
      url: "stockings"
    },
  ];

  private productsSubscription$: Subscription | undefined;
  private descriptionSubscription$: Subscription | undefined;

  private swiper: any;

  constructor(
    private productsService$: ProductsService,
    private destroyRef: DestroyRef,
  ) {
    effect(() => {
      const type = this.collectionType();

      if (type && type !== '') {
        this.getCollectionType(type);
      }

      const nav = this.navigationNeeded();
      if (nav) {
        setTimeout(() => {
          this.initPlpHeader();
        }, 300);
      }
    });

    this.destroyRef.onDestroy(() => {
      if (this.productsSubscription$) {
        this.productsSubscription$.unsubscribe();
      }
      if (this.descriptionSubscription$) {
        this.descriptionSubscription$.unsubscribe();
      }
      if (this.swiper) {
        this.swiper.destroy();
      }
    });
  }

  private getCollectionType(type: string): void {

    this.navigationNeeded.set(false);
    this.headerTitle.set('');
    this.headerDescription.set('');
    if (this.swiper) {
      this.swiper.destroy();
    }

    if (type === 'all-lingerie') {
      this.headerTitle.set('all lingerie');
      this.navigationNeeded.set(true);

    } else {
      if (this.descriptionSubscription$) {
        this.descriptionSubscription$.unsubscribe();
      }

      this.descriptionSubscription$ = this.productsService$
        .getCollectionInfoHeader(type)
        .subscribe((description) => {
          if (description.length > 0) {
            this.headerTitle.set(description[0]);
            this.headerDescription.set(description[1]);
          }
          if (!type.includes('lingerie-collection')) {
            this.navigationNeeded.set(true);
          }
        });
    }
  }

  private initPlpHeader(): void {
    this.swiper = new Swiper('.js-plp-header', {
      slidesPerView: 'auto',
      spaceBetween: 8,
      keyboard: true,
      centeredSlides: true,
      centeredSlidesBounds: true,
      freeMode: {
        enabled: true,
        sticky: false,
      },

    });
  }
}
