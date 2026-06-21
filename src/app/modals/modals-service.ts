import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ModalsService {

  public toggleModalWindow(): void {
    document.body.classList.toggle('js-modal-opened');
  }
}
