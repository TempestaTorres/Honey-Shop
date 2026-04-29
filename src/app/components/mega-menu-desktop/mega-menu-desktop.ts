import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, signal, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NewsType } from '../../products/types/news';
import { ProductsService } from '../../products/products-service';
import { Subscription } from 'rxjs';
import { MegaMenuService } from '../../services/mega-menu-service';

@Component({
  selector: 'app-mega-menu-desktop',
  imports: [],
  templateUrl: './mega-menu-desktop.html',
})
export class MegaMenuDesktop implements OnInit, OnDestroy, AfterViewInit {

  @ViewChild('megaMenu') megaMenu!: ElementRef;

  public news: NewsType[] = [];
  public newsLingerie: NewsType[] = [];
  public newsCollections: NewsType[] = [];
  public newsAccessories: NewsType[] = [];
  public newsBoutiques: NewsType[] = [];

  public menuItemHidden = [
    signal<boolean>(true),
    signal<boolean>(true),
    signal<boolean>(true),
    signal<boolean>(true),
    signal<boolean>(true),
  ]

  public overlayHidden = signal(true);

  private subscriptions$: Subscription = new Subscription();
  private megaMenu$: Subscription | undefined;

  private isClosing: boolean = false;
  private isOpened: boolean = false;
  private isExpanding: boolean = false;
  private animation!: Animation | null;

  constructor(private router: Router, private productsService: ProductsService,
              private megaMenuService: MegaMenuService) { }

  ngOnInit() {

    // Products
    const sub = this.productsService.getNews().subscribe(news => {
      this.news = news;
    });

    this.subscriptions$.add(sub);

    const sub2 = this.productsService.getNewsLingerie().subscribe(news => {
      this.newsLingerie = news;
    });

    this.subscriptions$.add(sub2);

    const sub3 = this.productsService.getNewsCollections().subscribe(news => {
      this.newsCollections = news;
    });

    this.subscriptions$.add(sub3);

    const sub4 = this.productsService.getNewsAccessories().subscribe(news => {
      this.newsAccessories = news;
    });

    this.subscriptions$.add(sub4);

    const sub5 = this.productsService.getNewsBoutiques().subscribe(news => {
      this.newsBoutiques = news;
    });

    this.subscriptions$.add(sub5);

  }

  ngAfterViewInit(): void {
    // Menu states
    this.megaMenu$ = this.megaMenuService.megaDesktopMenuState$.subscribe(response => {

      if (response.open) {

        this.hide();

        switch (response.type) {
          case 'new':
            this.show(0);
            break;
          case 'lingerie':
            this.show(1);
            break;
          case 'collections':
            this.show(2);
            break;
          case 'accessories':
            this.show(3);
            break;
          case 'boutiques':
            this.show(4);
            break;
        }

        this.menuOpen();
      }
      else {
        this.menuShrink();
      }

    });
  }

  ngOnDestroy() {

    this.subscriptions$.unsubscribe();

    if (this.megaMenu$) {
      this.megaMenu$.unsubscribe();
    }
  }

  public menuCollectionsItemClick(param: string): void {

    this.menuClose();
    this.router.navigate(['/collections', param]).then(() => {});
  }

  public navigateTo(url: string): void {
    this.menuClose();
    this.router.navigate(['/' + url]).then(() => {});
  }

  public menuClose(): void {
    this.megaMenuService.megaDesktopMenuTrigger({open: false, type: ''});
  }

  // Animation menu
  private menuOpen(): void {

    if (this.isClosing || this.isExpanding || this.isOpened) {
      return;
    }

    this.megaMenu.nativeElement.style.overflow = "hidden";
    window.requestAnimationFrame(() => this.expand());

  }

  private expand(): void {

    this.isExpanding = true;
    this.isOpened = true;

    let rect: DOMRect = this.megaMenu.nativeElement.getBoundingClientRect();
    this.megaMenu.nativeElement.style.height = rect.height + 'px';
    const startHeight = '0px';
    const endHeight = `${rect.height}px`;

    this.megaMenu.nativeElement.style.height = '0px';

    if (this.animation) {
      this.animation.cancel();
    }

    this.animation = this.megaMenu.nativeElement.animate(
      {
        height: [startHeight, endHeight],
      },
      {
        duration: 300,
        easing: "ease-out",
      }
    );

    if (this.animation) {
      this.animation.onfinish = () => this.onAnimationFinish(true);
      this.animation.oncancel = (): void => {
        this.isExpanding = false;
      };
    }

  }

  private menuShrink(): void {

    this.isClosing = true;
    this.isOpened = false;

    let rect: DOMRect = this.megaMenu.nativeElement.getBoundingClientRect();
    this.megaMenu.nativeElement.style.height = rect.height + 'px';
    const startHeight = `${rect.height}px`;
    const endHeight = '0px';

    if (this.animation) {
      this.animation.cancel();
    }

    this.animation = this.megaMenu.nativeElement.animate(
      {
        height: [startHeight, endHeight],
      },
      {
        duration: 300,
        easing: "ease",
      }
    );
    if (this.animation) {
      this.animation.onfinish = () => this.onAnimationFinish(false);
      this.animation.oncancel = (): void => {
        this.isClosing = false;
      };
    }
  }

  private onAnimationFinish(open: boolean): void {

    if (!open) {

      this.hide();
      this.overlayHidden.set(true);
    }

    this.animation = null;
    this.isClosing = false;
    this.isExpanding = false;
    this.megaMenu.nativeElement.style.height = this.megaMenu.nativeElement.style.overflow = "";
  }

  //Show or hide menu item
  private hide(): void {
    for (let i:number = 0; i < this.menuItemHidden.length; i++) {
      this.menuItemHidden[i].set(true);
    }
  }

  private show(i: number): void {

    this.menuItemHidden[i].set(false);
    this.overlayHidden.set(false);
  }

}
