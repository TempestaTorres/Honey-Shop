import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, signal, ViewChild } from '@angular/core';
import { MegaMenuService } from '../../services/mega-menu-service';
import { Subscription } from 'rxjs';
import { Router, RouterLink } from '@angular/router';
import { GeoLocationService } from '../../services/geoloc-service';
import { GeoLocationType } from '../../types/geoloc-types';
import { ProductsService } from '../../products/products-service';
import { NewsType } from '../../products/types/news';

@Component({
  selector: 'app-mega-menu',
  imports: [RouterLink],
  templateUrl: './mega-menu.html',
})
export class MegaMenu implements OnInit, OnDestroy, AfterViewInit {

  @ViewChild('countryName') countryName!: ElementRef;
  @ViewChild('countryFlag') countryFlag!: ElementRef;

  public news: NewsType[] = [];
  public newsLingerie: NewsType[] = [];
  public newsCollections: NewsType[] = [];
  public newsAccessories: NewsType[] = [];
  public newsBoutiques: NewsType[] = [];

  public megaMenuActive = signal<boolean>(false);
  public menuSubmenuItemStates = [
    signal<boolean>(false),
    signal<boolean>(false),
    signal<boolean>(false),
    signal<boolean>(false),
    signal<boolean>(false),
  ]

  private megaMenu$: Subscription | undefined;
  private geolocationType$: Subscription | undefined;
  private subscriptions$: Subscription = new Subscription();

  constructor(private megaMenuService: MegaMenuService,
              private geoLocationService: GeoLocationService,
              private productsService: ProductsService,
              private router: Router) { }

  ngOnInit() {

    this.megaMenu$ = this.megaMenuService.megaMenuState$.subscribe((megaMenuState) => {
      this.megaMenuActive.set(megaMenuState);

      if (!this.megaMenuActive()) {
        for (let i:number = 0; i < this.menuSubmenuItemStates.length; i++) {
          this.menuSubmenuItemStates[i].set(megaMenuState);
        }
      }
    });
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

  ngAfterViewInit() {

    this.geolocationType$ = this.geoLocationService.currentLocation.subscribe({
      next: (event: GeoLocationType) => {
        this.countryName.nativeElement.innerHTML = event.name;
        this.countryFlag.nativeElement.innerHTML = event.country;
      },
    });
  }

  ngOnDestroy() {
    if (this.megaMenu$) {
      this.megaMenu$.unsubscribe();
    }
    if (this.geolocationType$) {
      this.geolocationType$.unsubscribe();
    }

    this.subscriptions$.unsubscribe();
  }

  public subMenuClick(i: number): void {
    this.menuSubmenuItemStates[i].update(value => !value);
  }

  public subMenuCollectionsItemClick(url: string): void {

    this.megaMenuService.megaMenuTrigger();
    this.router.navigate(['/collections', url]).then(() => {});

  }

  public navigateTo(url: string): void {
    this.megaMenuService.megaMenuTrigger();
    this.router.navigate(['/' + url]).then(() => {});
  }

}
