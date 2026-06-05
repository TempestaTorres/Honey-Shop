import {
  Component,
  computed,
  DestroyRef,
  effect,
  ElementRef,
  input, OnInit,
  signal, viewChild,
  viewChildren,
  WritableSignal
} from '@angular/core';
import { ProductType } from '../../products/types/product-type';
import { ProductsService } from '../../products/products-service';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CollectionCard } from '../collection-card/collection-card';
import { SwiperService } from '../../services/swiper-service';
import { inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ScrollingService } from '../../services/scrolling-service';

@Component({
  selector: 'app-collection-show-case',
  imports: [RouterLink, CollectionCard],
  templateUrl: './collection-show-case.html',
  styleUrl: './collection-show-case.css',
})
export class CollectionShowCase implements OnInit {
  readonly collectionContainer = viewChild<ElementRef<HTMLElement>>('collection');
  collectionType = input.required<string>();

  private route = inject(ActivatedRoute);
  private router = inject(Router);
  // Convert queryParams Observable to Signal
  private queryParams = toSignal(this.route.queryParams, {
    initialValue: {sort: 'Featured'}
  });

  // Computed signal for current sort (clean and reactive)
  sort = computed(() => {
    const sortParam = this.queryParams()?.['sort'] as string;
    return sortParam || 'Featured';
  });

  public collectionName: WritableSignal<string> = signal<string>('');
  public collectionProducts: WritableSignal<Array<ProductType[]> | null> = signal<Array<
    ProductType[]
  > | null>(null);
  public itemsCount: WritableSignal<number> = signal<number>(0);
  public layoutSwitcher: WritableSignal<number> = signal<number>(1);
  public sortOpen: WritableSignal<boolean> = signal<boolean>(false);
  public currentPage: WritableSignal<number> = signal<number>(1);
  public totalPages: WritableSignal<number> = signal<number>(0);
  public totalPageButtons: WritableSignal<boolean[]> = signal<boolean[]>([]);

  readonly sortSelectButtons = viewChildren<ElementRef<HTMLElement>>('jsSelectSortButton');

  private productsSubscription$: Subscription | undefined;

  constructor(
    private destroyRef: DestroyRef,
    private productsService: ProductsService,
    private swiperService: SwiperService,
    private scrollingService: ScrollingService,
  ) {
    effect(() => {

      const currentSort = this.sort();
      let sortValue: string = currentSort;

      if (sortValue === "price-asc") {
        sortValue = 'Price – low to high';
      }
      else if (sortValue === "price-desc") {
        sortValue = 'Price – High to Low';
      }
      this.resetButtons(sortValue);

      const collectionType: string = this.collectionType();
      const page = this.currentPage();

      setTimeout(() => {
        this.setCollection(collectionType, currentSort, page);
      }, 500);

    });

    this.destroyRef.onDestroy(() => {
      if (this.productsSubscription$) {
        this.productsSubscription$.unsubscribe();
      }
    });
  }

  ngOnInit(): void {
    this.scrollingService.toTop();
  }

  private reset(): void {
    this.collectionProducts.set(null);
    this.collectionName.set('');
    this.itemsCount.set(0);
    this.totalPages.set(0);
    this.totalPageButtons.set([]);

  }

  private setCollection(type: string, sortType: string, page: number): void{

    this.reset();

    if (this.productsSubscription$) {
      this.productsSubscription$.unsubscribe();
    }

    this.productsSubscription$ = this.productsService
      .getFullSortedCollection(type, sortType, page)
      .subscribe((collection) => {

        if (collection !== null) {
          this.collectionName.set(collection.name);
          this.collectionProducts.set(collection.items);
          this.itemsCount.set(collection.count);
          this.totalPages.set(collection.pages);

          this.totalPageButtons.update(buttons => {
            for (let i: number = 0; i < collection.pages; i++) {
              buttons[i] = i === page - 1;
            }

            return buttons;
          });
        }
      });

  }

  public nextPage(): void {
    this.scroll();
    this.currentPage.update(page => page + 1);
  }
  public prevPage(): void {
    this.scroll();
    this.currentPage.update(page => page - 1);
  }

  public pageClicked(page: number): void {
    this.scroll();
    this.currentPage.set(page);
  }

  private scroll(): void {
    const target = this.collectionContainer();
    if (target) {
      this.scrollingService.scrollToPoint(target.nativeElement, 66);
    }
  }

  public switchLayoutSwitcher(type: number): void {

    if (this.layoutSwitcher() === type) return;
    this.swiperService.needResizing();
    this.layoutSwitcher.set(type);

  }

  public triggerFilter(): void {
    console.log('trigger filter');
  }

  public sortOpenClick(): void {
    this.sortOpen.update((value) => !value);
  }

  private resetButtons(sortType: string): void {
    const buttons = this.sortSelectButtons();

    for (let i = buttons.length - 1; i >= 0; i--) {
      const button = buttons[i];
      if (button.nativeElement.dataset['value'] === sortType) {
        button.nativeElement.classList.add('active');
      } else {
        button.nativeElement.classList.remove('active');
      }
    }
  }

  public selectSortClick(value: string): void {

    this.scroll();
    const currentSort = this.sort();
    if (currentSort === value) return;

    let sortValue: string | null = null;

    if (value === "Price – low to high") {
      sortValue = 'price-asc';
    }
    else if (value === "Price – High to Low") {
      sortValue = 'price-desc';
    }

    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { sort: sortValue },
      queryParamsHandling: 'merge',
      replaceUrl: true
    }).then();
  }
}
