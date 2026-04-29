import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ScrollingService {

  constructor() {
  }

  public scrollToPoint(targetEl: HTMLElement, offset: number): void {
    const elementPosition = targetEl.getBoundingClientRect().top + window.scrollY;
    const offsetPosition = elementPosition - offset;

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    });
  }

  public toTop(): void {

    let target: HTMLElement | null = document.getElementById('honey-luxury-lingerie-bras');

    target?.scrollIntoView({
      block: "start",
      inline: "nearest"
    });
  }
  public toTopSmooth(): void {

    let target: HTMLElement | null = document.getElementById('honey-luxury-lingerie-bras');

    target?.scrollIntoView({
      block: "start",
      inline: "nearest",
      behavior: "smooth"
    });
  }
  public toTarget(target: HTMLElement): void {

    target?.scrollIntoView({
      block: "start",
      inline: "nearest",
      behavior: "smooth"
    });
  }
}
