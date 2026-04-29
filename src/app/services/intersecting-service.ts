import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class IntersectingService {

  public isIntersecting (status: boolean, element: HTMLElement) {
    if (status) {
      element.classList.remove('app-invisible');
    }
  }
}
