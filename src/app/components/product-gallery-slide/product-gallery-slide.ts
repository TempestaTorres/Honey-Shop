import { Component, ElementRef, input, signal, ViewChild } from '@angular/core';

@Component({
  selector: 'app-product-gallery-slide',
  imports: [],
  templateUrl: './product-gallery-slide.html',
})
export class ProductGallerySlide {

  @ViewChild('zoomer') zoomer!: ElementRef;
  slideImage = input.required<string>();

  public isZoomed = signal(false);

  public zoomIn(): void {
    this.isZoomed.update((value) => !value);

    this.zoomer.nativeElement.style.transform = this.isZoomed() ? 'scale(2)' : 'scale(1)';
  }

  public onMouseMove(e: MouseEvent): void {
    const o: DOMRect = this.zoomer.nativeElement.getBoundingClientRect();

    if (e.offsetX > 55 && e.offsetX < o.width - 55) {
      let res: { xPercent: number; yPercent: number } = this.calculateMousePosition(
        o,
        e.clientX,
        e.clientY,
      );

      this.zoomer.nativeElement.style.transformOrigin = `${res.xPercent}% ${res.yPercent}%`;
    } else {
      this.reset();
    }
  }

  public calculateMousePosition(
    o: DOMRect,
    clientX: number,
    clientY: number,
  ): { xPercent: number; yPercent: number } {
    let n: number = clientX - o.left;
    let r: number = clientY - o.top;
    return {
      xPercent: (n / o.width) * 100,
      yPercent: (r / o.height) * 100,
    };
  }

  public reset(): void {
    this.zoomer.nativeElement.style.transform = 'scale(1)';
    this.zoomer.nativeElement.style.transformOrigin = 'center center 0px';
    this.isZoomed.set(false);
  }
}
