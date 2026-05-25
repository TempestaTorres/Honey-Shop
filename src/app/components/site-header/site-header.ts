import { Component, OnDestroy, OnInit, signal, WritableSignal } from '@angular/core';
import { NavigationStart, Router, RouterLink } from '@angular/router';
import { filter, Subscription } from 'rxjs';
import { CartCount } from '../cart-count/cart-count';
import { Location } from '@angular/common';
import { MegaMenuService } from '../../services/mega-menu-service';
import { MegaMenuDesktop } from '../mega-menu-desktop/mega-menu-desktop';
import { headerLocations } from './header-locations';
import { WishlistService } from '../../product-wishlist/wishlist-service';

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

  public wishlistCount: WritableSignal<number> = signal<number>(0);

  private megaMenu$: Subscription | undefined;
  private megaMenuDesktop$: Subscription | undefined;
  private wishlist$: Subscription | undefined;

  constructor(
    private router: Router,
    private location: Location,
    private megaMenuService: MegaMenuService,
    private wishlistService: WishlistService,
  ) {}

  ngOnInit() {

    this.wishlist$ = this.wishlistService.wishlistCount.subscribe((wishlistCount) => {
      this.wishlistCount.set(wishlistCount);
    });

    // Megamenu
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

        //console.log("Url: ",event.url);

        this.updateHeaderState(event.url);

      });

    this.updateHeaderState(this.location.path());

    //console.log("Location: ",this.location.path());

  }

  private updateHeaderState(url: string): void {

    this.isHome.set(this.isHeaderTransparent(url));

    this.isBlackMobile.update(value => {

      if (url === '/online-gift-voucher') {
        return true;
      }
      return url.startsWith('/products');
      }
    );

    this.isHalfInverse.update(value => {

      if (url === '/online-gift-voucher') {
        return true;
      }
      return url.startsWith('/products');
      }
    );

  }

  ngOnDestroy() {
    document.removeEventListener('scroll', this.onScroll.bind(this));

    if (this.megaMenu$) {
      this.megaMenu$.unsubscribe();
    }
    if (this.megaMenuDesktop$) {
      this.megaMenuDesktop$.unsubscribe();
    }
    if (this.wishlist$) {
      this.wishlist$.unsubscribe();
    }
  }

  private isHeaderTransparent(url: string): boolean {
    for (let i = 0; i < headerLocations.length; i++) {
      if (headerLocations[i] === url) {
        return true;
      }
    }

    return url.startsWith('/products');

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
