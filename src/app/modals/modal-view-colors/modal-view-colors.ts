import { Component, OnDestroy, OnInit, signal, WritableSignal } from '@angular/core';
import { ViewColorsService } from './view-colors-service';
import { Subscription } from 'rxjs';
import { ProductType } from '../../products/types/product-type';
import { Router } from '@angular/router';

@Component({
  selector: 'app-modal-view-colors',
  imports: [],
  templateUrl: './modal-view-colors.html',
})
export class ModalViewColors implements OnInit, OnDestroy {

  public open: WritableSignal<boolean> = signal<boolean>(false);
  public colors: WritableSignal<ProductType[] | null> = signal<ProductType[] | null>(null);

  private viewColors$: Subscription | undefined;

  constructor(private viewColorsService$: ViewColorsService,
              private router: Router) {
  }

  ngOnInit(): void {

    this.viewColors$ = this.viewColorsService$.colorsTriggered$.subscribe(colors => {

      this.colors.set(colors);

      if (colors !== null && colors.length > 0) {

        setTimeout(() => {
          this.open.set(true);
        }, 400);
      }
      else {
        this.open.set(false);
      }
    });
  }

  ngOnDestroy(): void {
    if (this.viewColors$) {
      this.viewColors$.unsubscribe();
    }
  }

  public modalClose(): void {
    this.viewColorsService$.triggerViewColors(null);
  }

  public navigateToProducts(url: string): void {

    this.modalClose();
    setTimeout(() => {
      this.router.navigate(['/products', url]).then(() => {});
    }, 400);
  }
}
