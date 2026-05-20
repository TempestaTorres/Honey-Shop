import { Component, effect, ElementRef, EventEmitter, input, Output, viewChildren } from '@angular/core';
import { ProductDetailsType } from '../../types/instagram/instagram-feeds-type';

@Component({
  selector: 'app-fs-size',
  imports: [],
  templateUrl: './fs-size.html',
})
export class FsSize {

  @Output() cupSize = new EventEmitter<string>();
  @Output() fSize = new EventEmitter<string>();
  productType = input.required<ProductDetailsType>();

  readonly radioCups = viewChildren<ElementRef<HTMLInputElement>>('radioCap');
  readonly radioSizes = viewChildren<ElementRef<HTMLInputElement>>('radioSize');

  private fsSize: string = '';
  private fsCup: string = '';

  constructor() {

    effect(() => {

      if (this.productType()) {
        this.resetSizes();
      }
    });
  }

  public sizeChange(e: Event, product: ProductDetailsType): void {

    let target = e.target as HTMLInputElement;
    if (target !== null) {
      this.fsSize = target.value;

      this.fSize.emit(this.fsSize);
    }

    if (product.type === "bra") {

      this.checkCups(product);
      return;
    }

    if (product.sizes) {

      let productSizes = this.radioSizes();

      for (let i = 0; i < product.sizes[0].sizes.length; i++) {

        const input = productSizes[i].nativeElement;
        input.disabled = false;
      }

      if (product.sizes[0].sizes.length < productSizes.length) {

        for (let k = product.sizes[0].sizes.length; k < productSizes.length; k++) {

          const input = productSizes[k].nativeElement;
          input.disabled = true;
        }
      }
    }

  }

  public cupChange(e: Event, product: ProductDetailsType): void {

    let target = e.target as HTMLInputElement;
    if (target !== null) {
      this.fsCup = target.value;

      this.cupSize.emit(this.fsCup);
    }

    let cupSizes = this.radioSizes();

    if (product.sizes) {

      for (let i = 0; i < product.sizes.length; i++) {

        if (product.sizes[i].key === this.fsCup) {

          for (let j = 0; j < product.sizes[i].sizes.length; j++) {

            const input = cupSizes[j].nativeElement;
            input.disabled = false;
          }

          if (product.sizes[i].sizes.length < cupSizes.length) {

            for (let k = product.sizes[i].sizes.length; k < cupSizes.length; k++) {

              const input = cupSizes[k].nativeElement;
              input.disabled = true;
            }
          }
        }

      }
    }

  }

  private checkCups(product: ProductDetailsType): void {

    let caps = this.radioCups();

    if (product.sizes) {

      for (let i = 0; i < product.sizes.length; i++) {

        let found: boolean = false;

        for (let j = 0; j < product.sizes[i].sizes.length; j++) {

          if (product.sizes[i].sizes[j] === this.fsSize) {
            found = true;
            break;
          }
        }

        const input = caps[i].nativeElement;

        input.disabled = !found;
      }
    }

  }

  private resetSizes(): void {

    const sizes = this.radioSizes();

    if (sizes) {

      sizes.forEach((size) => {
        size.nativeElement.checked = false;
      });
    }

    const cups = this.radioCups();

    if (cups) {
      cups.forEach(cup => {
        cup.nativeElement.checked = false;
      })
    }
  }
}
