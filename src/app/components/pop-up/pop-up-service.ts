import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PopUpService {
  public popUpOpen$: BehaviorSubject<string>;

  constructor() {
    this.popUpOpen$ = new BehaviorSubject<string>('close');
  }

  public popUpOpen(query: string): void {
    this.popUpOpen$.next(query);

    /*
    if (query === 'close') {
      document.body.style = '';
    } else {
      let y = window.scrollY * -1;
      document.body.style = `position: fixed; top: ${y}px; overflow: hidden; width: 100%; height: 100%;`;
    }

     */
  }
}
