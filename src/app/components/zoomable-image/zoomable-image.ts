import { Component, ElementRef, Input, signal, ViewChild } from '@angular/core';
import { ImageType } from '../../products/types/image-type';
import { ObserveElementDirective } from '../../directives/scroll-observer';

@Component({
  selector: 'app-zoomable-image',
  imports: [ObserveElementDirective],
  templateUrl: './zoomable-image.html',
})
export class ZoomableImage {
  @ViewChild('zoomer') zoomer!: ElementRef;

  @Input() image: ImageType = { src: '', name: '' };

  public isZoomed = signal(false);
  public isLoading = signal(true);

  public zoomIn(): void {
    this.isZoomed.update((value) => !this.isZoomed());

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

  public isIntersecting(status: boolean): void {
    this.isLoading.set(!status);
  }
}
