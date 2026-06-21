import { Component, computed, DestroyRef, signal, WritableSignal } from '@angular/core';
import { ModalsService } from '../modals-service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductType } from '../../products/types/product-type';
import { ProductsService } from '../../products/products-service';
import { Subscription } from 'rxjs';
import { CollectionCard } from '../../components/collection-card/collection-card';

@Component({
  selector: 'app-search-modal',
  imports: [ReactiveFormsModule, CollectionCard],
  templateUrl: './search-modal.html',
  styleUrl: './search-modal.css',
})
export class SearchModal {
  public hasResult: WritableSignal<boolean> = signal<boolean>(false);
  public results: WritableSignal<ProductType[]> = signal<ProductType[]>([]);

  resultCards = computed(() => {
    let items: ProductType[][] = [];

    let cards = this.results();
    for (let i = 0; i < cards.length; i++) {
      items.push([cards[i]]);
    }
    return items;
  });

  private search$: Subscription | undefined;

  public searchForm: FormGroup = new FormGroup({
    search: new FormControl('', [Validators.required]),
  });

  constructor(
    private modalsService: ModalsService,
    private router: Router,
    private productsService: ProductsService,
    private destroyRef: DestroyRef,
  ) {
    this.destroyRef.onDestroy(() => {
      if (this.search$) this.search$.unsubscribe();
    });
  }

  public modalClose(): void {
    this.modalsService.toggleModalWindow();
  }

  public onSubmit(): void {
    if (this.searchForm.status === 'VALID') {
      this.viewAll();
    }
  }

  public viewAll(): void {

    this.modalClose();

    setTimeout(() => {
      const q = this.searchForm.value.search;
      this.searchForm.reset();
      this.results.set([]);
      this.hasResult.set(false);

      this.router.navigate(['/search'], {queryParams: {search: q}}).then(() => {});
    }, 400);
  }

  public onSearch(): void {
    const value = this.searchForm.value.search.trim().toLowerCase();

    if (value.length > 1) {
      if (this.search$) this.search$.unsubscribe();

      this.search$ = this.productsService.search(value).subscribe((results) => {
        this.results.set(results);

        this.hasResult.update((value) => (value = results.length > 0));
      });
    } else {
      this.results.set([]);
      this.hasResult.set(false);
    }
  }

  public navigateTo(collection: string): void {
    this.modalClose();

    setTimeout(() => {
      this.router.navigate(['/collections', collection]).then(() => {});
    }, 400);
  }
}
