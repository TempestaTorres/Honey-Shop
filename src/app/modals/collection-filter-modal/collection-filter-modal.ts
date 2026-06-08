import {
  afterNextRender,
  Component,
  DestroyRef,
  effect,
  ElementRef,
  OnInit,
  signal,
  viewChildren,
  WritableSignal
} from '@angular/core';
import { FilterService } from '../../services/filter-service';
import { Subscription } from 'rxjs';
import { AccordionService } from '../../services/accordion-service';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductType } from '../../products/types/product-type';
import { ProductsService } from '../../products/products-service';

@Component({
  selector: 'app-collection-filter-modal',
  imports: [],
  templateUrl: './collection-filter-modal.html',
  styleUrl: './collection-filter-modal.css',
})
export class CollectionFilterModal implements OnInit {
  public open: WritableSignal<boolean> = signal<boolean>(false);
  public openedFilterItem = signal<string>('0');

  readonly contents = viewChildren<ElementRef<HTMLElement>>('content');
  readonly coloursFilters = viewChildren<ElementRef<HTMLInputElement>>('colourFilter');
  readonly typesFilters = viewChildren<ElementRef<HTMLInputElement>>('typeFilter');

  private filterSubscription$: Subscription | undefined;
  private productSubscription$: Subscription  = new Subscription();

  public filtersCount: WritableSignal<number> = signal<number>(0);
  public filterTypesCount: WritableSignal<number> = signal<number>(0);
  public totalFiltersCount: WritableSignal<number> = signal<number>(0);

  private colourFilterTriggered: WritableSignal<boolean> = signal<boolean>(false);
  private typeFilterTriggered: WritableSignal<boolean> = signal<boolean>(false);

  public availableColours: WritableSignal<{colorName: string, colorClass: string}[]> = signal<{colorName: string, colorClass: string}[]>([]);
  public availableTypes: WritableSignal<string[]> = signal<string[]>([]);

  private colours: string[] = [];
  private types: string[] = [];

  constructor(
    private filterService: FilterService,
    private destroyRef: DestroyRef,
    private accordionService: AccordionService,
    private router: Router,
    private route: ActivatedRoute,
    private productsService: ProductsService,
  ) {
    effect(() => {
      const coloursChanged = this.colourFilterTriggered();
      if (coloursChanged) {
        this.checkColourFilters();
      }
      const typesChanged = this.typeFilterTriggered();
      if (typesChanged) {
        this.checkTypesFilters();
      }
    });

    this.destroyRef.onDestroy(() => {
      if (this.filterSubscription$) {
        this.filterSubscription$.unsubscribe();
      }
      if (this.productSubscription$) {
        this.productSubscription$.unsubscribe();
      }
    });

    afterNextRender(() => {
      this.route.queryParams.subscribe((params) => {
        if (params['colors'] && this.colours.length === 0) {
          const colors = params['colors'];

          let appliedColors = Array.isArray(colors) ? colors : [colors];


          const filters = this.coloursFilters();

          for (let i = 0; i < filters.length; i++) {
            const filter = filters[i];

            for (let j = 0; j < appliedColors.length; j++) {
              if (filter.nativeElement.value === appliedColors[j]) {
                filter.nativeElement.checked = true;
                break;
              }
            }
          }

          this.colours = appliedColors;
          this.filtersCount.set(appliedColors.length);
          this.totalFiltersCount.set(appliedColors.length + this.types.length);

        }
        else if (params['types'] && this.types.length === 0) {

          const types = params['types'];

          let appliedTypes = Array.isArray(types) ? types : [types];


          const filters = this.typesFilters();

          for (let i = 0; i < filters.length; i++) {
            const filter = filters[i];

            for (let j = 0; j < appliedTypes.length; j++) {
              if (filter.nativeElement.value === appliedTypes[j]) {
                filter.nativeElement.checked = true;
                break;
              }
            }
          }

          this.types = appliedTypes;
          this.filterTypesCount.set(appliedTypes.length);
          this.totalFiltersCount.set(appliedTypes.length + this.colours.length);
        }
      });
    });
  }

  ngOnInit(): void {
    this.filterSubscription$ = this.filterService.filterOpen$.subscribe((open) => {
      this.open.set(open);
    });

    this.route.params.subscribe((params) => {
      if (params['type']) {
        let type: string = params['type'];

        if (type && type !== '') {
          if (this.productSubscription$) {
            this.productSubscription$.unsubscribe();
          }
          const sub = this.productsService
            .getCollectionColours(type)
            .subscribe(colours => {
              this.availableColours.set(colours);
            });
          this.productSubscription$.add(sub);

          const sub2 = this.productsService
            .getCollectionProductTypes(type).subscribe(types => {
              this.availableTypes.set(types);
            });
          this.productSubscription$.add(sub2);
        }
      }

    });
  }

  public closeModal(): void {
    this.filterService.triggerFilter(false);
  }

  public toggleItem(itemId: string): void {
    const elContents = this.contents();
    this.accordionService.jsAccordionToggle(itemId, this.openedFilterItem, elContents);
  }

  public colourFilterChanged(): void {
    this.colourFilterTriggered.set(true);
  }

  public typeFilterChanged(): void {
    this.typeFilterTriggered.set(true);
  }

  public applyFilters(): void {
    this.closeModal();
    this.filterService.applyFilters(true);

    setTimeout(() => {

      this.router.navigate([], {
        relativeTo: this.route,
        queryParams: {
          colors: this.colours.length ? this.colours : null,
          types: this.types.length ? this.types : null,
          page: 1
        },
        queryParamsHandling: 'merge',
        replaceUrl: true
      }).then();

    }, 300);

  }

  public resetAllFilters(): void {
    this.colours = [];
    this.types = [];
    this.filtersCount.set(0);
    this.filterTypesCount.set(0);
    this.totalFiltersCount.set(0);

    const filters = this.coloursFilters();

    if (filters && filters.length > 0) {
      for (let i = 0; i < filters.length; i++) {
        const filter = filters[i];
        if (filter.nativeElement.checked) {
          filter.nativeElement.checked = false;
        }
      }
    }

    const typeFilters = this.typesFilters();

    if (typeFilters && typeFilters.length > 0) {
      for (let j = 0; j < typeFilters.length; j++) {
        const f = typeFilters[j];
        if (f.nativeElement.checked) {
          f.nativeElement.checked = false;
        }
      }
    }
  }

  private checkColourFilters(): void {
    this.colours = [];
    const filters = this.coloursFilters();

    for (let i = 0; i < filters.length; i++) {
      const filter = filters[i];
      if (filter.nativeElement.checked) {
        this.colours.push(filter.nativeElement.value);
      }
    }

    this.filtersCount.set(this.colours.length);
    this.totalFiltersCount.set(this.colours.length + this.types.length);
    this.colourFilterTriggered.set(false);
  }

  private checkTypesFilters(): void {
    this.types = [];
    const filters = this.typesFilters();

    for (let i = 0; i < filters.length; i++) {
      const filter = filters[i];
      if (filter.nativeElement.checked) {
        this.types.push(filter.nativeElement.value);
      }
    }

    this.filterTypesCount.set(this.types.length);
    this.totalFiltersCount.set(this.colours.length + this.types.length);
    this.typeFilterTriggered.set(false);
  }
}
