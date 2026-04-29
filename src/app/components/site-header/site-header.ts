import { Component, OnDestroy, OnInit,signal } from '@angular/core';
import { NavigationStart, Router, RouterLink } from '@angular/router';
import { filter, Subscription } from 'rxjs';
import { CartCount } from '../cart-count/cart-count';
import { Location } from '@angular/common';
import { MegaMenuService } from '../../services/mega-menu-service';
import { MegaMenuDesktop } from '../mega-menu-desktop/mega-menu-desktop';
import { headerLocations } from './header-locations';

@Component({
  selector: 'app-site-header',
  imports: [RouterLink, CartCount, MegaMenuDesktop],
  templateUrl: './site-header.html',
  styleUrl: './site-header.css',
})
export class SiteHeader implements OnInit, OnDestroy {
  private readonly headerStickySolidOffset: number = 40;
  public isSticky = signal(false);
  public isGroupActive = [
    signal(false),
    signal(false),
    signal(false),
    signal(false),
    signal(false),
  ];

  public isHome = signal(true);
  public isHalfInverse = signal(false);
  public isBlackMobile = signal(false);
  public isMenuActive = signal(false);

  private megaMenu$: Subscription | undefined;
  private megaMenuDesktop$: Subscription | undefined;

  constructor(
    private router: Router,
    private location: Location,
    private megaMenuService: MegaMenuService,
  ) {}

  ngOnInit() {
    this.megaMenu$ = this.megaMenuService.megaMenuState$.subscribe((megaMenuState) => {
      this.isMenuActive.set(megaMenuState);
    });

    this.megaMenuDesktop$ = this.megaMenuService.megaDesktopMenuState$.subscribe((megaMenuDesktopState) => {

      if (!megaMenuDesktopState.open) {
        this.reset();
      }
    });

    document.addEventListener('scroll', this.onScroll.bind(this));

    this.router.events
      .pipe(filter((event) => event instanceof NavigationStart))
      .subscribe((event) => {
        // this only fires for `NavigationStart` and no other events

        this.isHome.set(this.isHeaderTransparent(event.url));

        this.isBlackMobile.update(value => event.url === '/online-gift-voucher');
        this.isHalfInverse.update(value => event.url === '/online-gift-voucher');

      });

    this.isHome.set(this.isHeaderTransparent(this.location.path()));

    this.isBlackMobile.update(value => this.location.path() === '/online-gift-voucher');
    this.isHalfInverse.update(value => this.location.path() === '/online-gift-voucher');

  }

  ngOnDestroy() {
    document.removeEventListener('scroll', this.onScroll.bind(this));

    if (this.megaMenu$) {
      this.megaMenu$.unsubscribe();
    }
    if (this.megaMenuDesktop$) {
      this.megaMenuDesktop$.unsubscribe();
    }
  }

  private isHeaderTransparent(url: string): boolean {
    for (let i = 0; i < headerLocations.length; i++) {
      if (headerLocations[i] === url) {
        return true;
      }
    }
    return false;
  }

  private onScroll(): void {
    let t: number = window.scrollY;

    this.isSticky.update((value) => t > this.headerStickySolidOffset);

    let pos: number = 0;
    if (t <= this.headerStickySolidOffset) {
      pos = Math.floor(this.headerStickySolidOffset - t);
    }

    if (this.isHome()) document.body.style = `--header-offset-top: ${pos}px; --header-height: 0px;`;
    else document.body.style = `--header-offset-top: ${pos}px; --header-height: 66px;`;
  }

  public groupHover(i: number, name: string): void {
    this.reset();

    if (i === -1 && this.megaMenuService.isMenuOpened()) {
      this.megaMenuService.megaDesktopMenuTrigger({open: false, type: name});
      return;
    }
    if (i < 0 || i >= this.isGroupActive.length) {
      return;
    }

    this.isGroupActive[i].set(true);
    this.megaMenuService.megaDesktopMenuTrigger({open: true, type: name});
  }

  public navLinkCollectionsClick(param: string): void {
    this.reset();
    this.megaMenuService.megaDesktopMenuTrigger({open: false, type: ''});

    this.router.navigate(['/collections', param]).then(() => {});
  }

  public navLinkRouteClick(url: string): void {
    this.reset();
    this.megaMenuService.megaDesktopMenuTrigger({open: false, type: ''});

    this.router.navigate([url]).then(() => {});
  }

  public logoClick(): void {
    if (this.megaMenuService.isMenuOpened()) {
      this.navLinkRouteClick('/');
    }
    else {
      this.router.navigate(['/']).then(() => {});
    }
  }

  public menuTrigger(): void {
    this.megaMenuService.megaMenuTrigger();
  }

  private reset(): void {
    for (let i:number = 0; i < this.isGroupActive.length; i++) {
      this.isGroupActive[i].set(false);
    }
  }
}
