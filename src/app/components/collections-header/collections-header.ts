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
  public plpHeaderBrasData: {name: string, url: string}[] = [
    {
      name: "Lace Bras",
      url: "lace-bras"
    },
    {
      name: "Bondage Bras",
      url: "bondage-bras"
    },
    {
      name: "Underwire Bras",
      url: "underwire-bras"
    },
    {
      name: "Bralettes",
      url: "bralettes"
    },
    {
      name: "Best Sellers",
      url: "bestsellers"
    },
  ];
  public plpHeaderStockingsData: {name: string, url: string}[] = [
    {
      name: "New Lingerie Collections",
      url: "new-lingerie"
    },
    {
      name: "Lingerie Sets",
      url: "lingerie-sets"
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
      name: "Best Sellers",
      url: "bestsellers"
    },
    {
      name: "Suspenders",
      url: "suspenders"
    },
  ];
  public plpHeaderLaceBrasData: {name: string, url: string}[] = [
    {
      name: "New Lingerie Collections",
      url: "new-lingerie"
    },
    {
      name: "Lace Lingerie",
      url: "lace-lingerie"
    },
    {
      name: "Bridal Lingerie",
      url: "bridal-lingerie"
    },
    {
      name: "Best Sellers",
      url: "bestsellers"
    },
  ];
  public plpHeaderBondageBrasData: {name: string, url: string}[] = [
    {
      name: "Bondage Lingerie",
      url: "bondage-lingerie"
    },
    {
      name: "Kukuro",
      url: "kukuro-lingerie-collection"
    },
    {
      name: "Best Sellers",
      url: "bestsellers"
    },
  ];
  public plpHeaderUnderwireBrasData: {name: string, url: string}[] = [
    {
      name: "Bras",
      url: "bras"
    },
    {
      name: "Lace Bras",
      url: "lace-bras"
    },
    {
      name: "Bondage Bras",
      url: "bondage-bras"
    },
    {
      name: "Push up Bras",
      url: "push-up-bras"
    },
  ];
  public plpHeaderPushupBrasData: {name: string, url: string}[] = [
    {
      name: "Bras",
      url: "bras"
    },
    {
      name: "Lace Bras",
      url: "lace-bras"
    },
    {
      name: "Best Sellers",
      url: "bestsellers"
    },
    {
      name: "New Lingerie Collections",
      url: "new-lingerie"
    },
  ];
  public plpHeaderRobesData: {name: string, url: string}[] = [
    {
      name: "Lounge Lingerie",
      url: "loungewear"
    },
    {
      name: "Bridal Lingerie",
      url: "bridal-lingerie"
    },
    {
      name: "Best Sellers",
      url: "bestsellers"
    },
    {
      name: "New Lingerie Collections",
      url: "new-lingerie"
    },
  ];
  public plpHeaderRedLingerieData: {name: string, url: string}[] = [
    {
      name: "Best Sellers",
      url: "bestsellers"
    },
    {
      name: "Black Lingerie",
      url: "black-lingerie"
    },
    {
      name: "New Lingerie Collections",
      url: "new-lingerie"
    },
    {
      name: "Lace Lingerie",
      url: "lace-lingerie"
    },
    {
      name: "Bondage Lingerie",
      url: "bondage-lingerie"
    },
  ];
  public plpHeaderBlackLingerieData: {name: string, url: string}[] = [
    {
      name: "New Lingerie Collections",
      url: "new-lingerie"
    },
    {
      name: "Best Sellers",
      url: "bestsellers"
    },
    {
      name: "Red Lingerie Sets",
      url: "red-lingerie"
    },
    {
      name: "Lace Lingerie",
      url: "lace-lingerie"
    },
    {
      name: "Bondage Lingerie",
      url: "bondage-lingerie"
    },
  ];
  public plpHeaderBridalLingerieData: {name: string, url: string}[] = [
    {
      name: "Lounge Lingerie",
      url: "loungewear"
    },
    {
      name: "Lace Lingerie",
      url: "lace-lingerie"
    },
    {
      name: "Best Sellers",
      url: "bestsellers"
    },
    {
      name: "New Lingerie Collections",
      url: "new-lingerie"
    },
    {
      name: "Bondage Lingerie",
      url: "bondage-lingerie"
    },
    {
      name: "Babydoll Lingerie, Robes & Chemises",
      url: "robes-chemises"
    },
  ];
  public plpHeaderSuspendersData: {name: string, url: string}[] = [
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
      name: "Bras",
      url: "bras"
    },
    {
      name: "Crotchless Lingerie",
      url: "crotchless-lingerie"
    },
    {
      name: "New Lingerie Collections",
      url: "new-lingerie"
    },
    {
      name: "Stockings",
      url: "stockings"
    },
  ];
  public plpHeaderNakedsData: {name: string, url: string}[] = [
    {
      name: "New Lingerie Collections",
      url: "new-lingerie"
    },
    {
      name: "Best Sellers",
      url: "bestsellers"
    },
  ];
  public plpHeaderBottomsData: {name: string, url: string}[] = [
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
      name: "Crotchless Lingerie",
      url: "crotchless-lingerie"
    },
    {
      name: "Bras",
      url: "bras"
    },
    {
      name: "Stockings",
      url: "stockings"
    },
    {
      name: "New Lingerie Collections",
      url: "new-lingerie"
    },
  ];
  public plpHeaderBriefsData: {name: string, url: string}[] = [
    {
      name: "Thongs",
      url: "thongs"
    },
    {
      name: "Suspenders",
      url: "suspenders"
    },
    {
      name: "Crotchless Lingerie",
      url: "crotchless-lingerie"
    },
    {
      name: "Bras",
      url: "bras"
    },
    {
      name: "Stockings",
      url: "stockings"
    },
    {
      name: "New Lingerie Collections",
      url: "new-lingerie"
    },
  ];
  public plpHeaderThongsData: {name: string, url: string}[] = [
    {
      name: "Briefs",
      url: "briefs"
    },
    {
      name: "Suspenders",
      url: "suspenders"
    },
    {
      name: "Crotchless Lingerie",
      url: "crotchless-lingerie"
    },
    {
      name: "Bras",
      url: "bras"
    },
    {
      name: "Stockings",
      url: "stockings"
    },
    {
      name: "New Lingerie Collections",
      url: "new-lingerie"
    },
  ];
  public plpHeaderCrotchlessData: {name: string, url: string}[] = [
    {
      name: "Bottoms",
      url: "bottoms"
    },
    {
      name: "Bras",
      url: "bras"
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
      name: "Stockings",
      url: "stockings"
    },
    {
      name: "New Lingerie Collections",
      url: "new-lingerie"
    },
  ];
  public plpHeaderLingerieSetsData: {name: string, url: string}[] = [
    {
      name: "Bottoms",
      url: "bottoms"
    },
    {
      name: "Bras",
      url: "bras"
    },
    {
      name: "Suspenders",
      url: "suspenders"
    },
    {
      name: "New Lingerie Collections",
      url: "new-lingerie"
    },
    {
      name: "Best Sellers",
      url: "bestsellers"
    },
  ];
  public plpHeaderNewLingerieData: {name: string, url: string}[] = [
    {
      name: "Bras",
      url: "bras"
    },
    {
      name: "Best Sellers",
      url: "bestsellers"
    },
    {
      name: "Lace Lingerie",
      url: "lace-lingerie"
    },
    {
      name: "Bridal Lingerie",
      url: "bridal-lingerie"
    },
    {
      name: "Bondage Lingerie",
      url: "bondage-lingerie"
    },
    {
      name: "NAKEDS 2.0",
      url: "nakeds-lingerie-collection"
    },
  ];
  public plpHeaderBondageLingerieData: {name: string, url: string}[] = [
    {
      name: "Bondage Bras",
      url: "bondage-bras"
    },
    {
      name: "Black Lingerie",
      url: "black-lingerie"
    },
    {
      name: "Kukuro",
      url: "kukuro-lingerie-collection"
    },
  ];
  public plpHeaderBralettesData: {name: string, url: string}[] = [
    {
      name: "Bras",
      url: "bras"
    },
    {
      name: "Lace Bras",
      url: "lace-bras"
    },
    {
      name: "Bondage Bras",
      url: "bondage-bras"
    },
    {
      name: "Underwire Bras",
      url: "underwire-bras"
    },
    {
      name: "Push up Bras",
      url: "push-up-bras"
    },
    {
      name: "Lace Lingerie",
      url: "lace-lingerie"
    },
    {
      name: "Bondage Lingerie",
      url: "bondage-lingerie"
    },
  ];
  public plpHeaderBodysuitsData: {name: string, url: string}[] = [
    {
      name: "New Lingerie Collections",
      url: "new-lingerie"
    },
    {
      name: "Best Sellers",
      url: "bestsellers"
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
      name: "Bustiers & Corsets",
      url: "bustiers-corsets"
    },
  ];
  public plpHeaderCorsetsData: {name: string, url: string}[] = [
    {
      name: "New Lingerie Collections",
      url: "new-lingerie"
    },
    {
      name: "Best Sellers",
      url: "bestsellers"
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
      name: "Lingerie Bodysuits",
      url: "bodysuits"
    },
  ];
  public plpHeaderBestSellersData: {name: string, url: string}[] = [
    {
      name: "New Lingerie Collections",
      url: "new-lingerie"
    },
    {
      name: "Whitney",
      url: "whitney-lingerie-collection"
    },
    {
      name: "Kukuro",
      url: "kukuro-lingerie-collection"
    },
    {
      name: "NAKEDS 2.0",
      url: "nakeds-lingerie-collection"
    },
    {
      name: "Bridal Lingerie",
      url: "bridal-lingerie"
    },
    {
      name: "Bras",
      url: "bras"
    },
  ];
  public plpHeaderLaceLingerieData: {name: string, url: string}[] = [
    {
      name: "Lingerie Sets",
      url: "lingerie-sets"
    },
    {
      name: "Lace Bras",
      url: "lace-bras"
    },
    {
      name: "Best Sellers",
      url: "bestsellers"
    },
    {
      name: "Black Lingerie",
      url: "black-lingerie"
    },
    {
      name: "Red Lingerie Sets",
      url: "red-lingerie"
    },
    {
      name: "Bras",
      url: "bras"
    },
  ];
  public plpHeaderLatexLingerieData: {name: string, url: string}[] = [
    {
      name: "Bondage Lingerie",
      url: "bondage-lingerie"
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

        if (this.swiper) {
          this.swiper.destroy();
        }
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
          if (!type.includes('lingerie-collection') || type === 'nakeds-lingerie-collection') {
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
