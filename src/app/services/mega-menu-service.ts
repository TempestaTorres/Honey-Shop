import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { MenuResponseType } from '../types/menu-request-type';

@Injectable({
  providedIn: 'root',
})
export class MegaMenuService {

  public megaMenuState$: BehaviorSubject<boolean>;
  private megaMenuState: boolean = false;

  public megaDesktopMenuState$: BehaviorSubject<MenuResponseType>;
  private menuResponse: MenuResponseType = {
    open: false,
    type: ''
  }

  constructor() {
    this.megaMenuState$ = new BehaviorSubject<boolean>(this.megaMenuState);
    this.megaDesktopMenuState$ = new BehaviorSubject<MenuResponseType>(this.menuResponse);
  }

  public megaMenuTrigger(): void {
    this.megaMenuState = !this.megaMenuState;
    this.megaMenuState$.next(this.megaMenuState);
    document.body.classList.toggle('mega-menu-opened');
  }

  public megaDesktopMenuTrigger(request: MenuResponseType): void {

    if (request.open && request.type !== this.menuResponse.type) {

      document.body.classList.add('mega-menu-opened');

    }
    else if (!request.open) {
      document.body.classList.remove('mega-menu-opened');
    }

    this.menuResponse = request;
    this.megaDesktopMenuState$.next(request);
  }

  public isMenuOpened(): boolean {
    return document.body.classList.contains('mega-menu-opened');
  }
}
