import { Component, DestroyRef, OnInit, signal, WritableSignal } from '@angular/core';
import { ProductType } from '../../products/types/product-type';
import { Subscription } from 'rxjs';
import { ViewSetsService } from '../../components/product-select-set/view-sets-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-modal-view-sets',
  imports: [],
  templateUrl: './modal-view-sets.html',
})
export class ModalViewSets implements OnInit {

  public open: WritableSignal<boolean> = signal<boolean>(false);
  public sets: WritableSignal<ProductType[] | null> = signal<ProductType[] | null>(null);

  private viewSets$: Subscription | undefined;

  constructor(private viewSetsService: ViewSetsService,
              private destroyRef: DestroyRef,
              private router: Router,) {

    this.destroyRef.onDestroy(() => {

      if (this.viewSets$) {
        this.viewSets$.unsubscribe();
      }
    });
  }

  ngOnInit(): void {

    this.viewSets$ = this.viewSetsService.viewSetsTriggered$.subscribe(sets => {

      this.sets.set(sets);

      if (sets !== null && sets.length > 0) {

        setTimeout(() => {
          this.open.set(true);
        }, 400);
      }
      else {
        this.open.set(false);
      }
    });
  }

  public modalClose(): void {
    this.viewSetsService.triggerViewSets(null);
  }

  public navigateToProducts(url: string): void {

    this.modalClose();
    setTimeout(() => {
      this.router.navigate(['/products', url]).then(() => {});
    }, 400);
  }
}
