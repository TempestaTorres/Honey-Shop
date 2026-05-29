import { Component, OnDestroy, OnInit, signal, WritableSignal } from '@angular/core';
import { ScrollingService } from '../../services/scrolling-service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ProductsService } from '../../products/products-service';
import { Subscription } from 'rxjs';
import { ProductType } from '../../products/types/product-type';
import { ProductGallery } from '../../components/product-gallery/product-gallery';
import { ModalBio } from '../../modals/modal-bio/modal-bio';
import { ProductInfo } from '../../components/product-info/product-info';
import { CollectionColorButton } from '../../components/collection-color-button/collection-color-button';
import { ProductGalleryService } from '../../components/product-gallery/product-gallery-service';
import { ModalViewColors } from '../../modals/modal-view-colors/modal-view-colors';
import { ViewColorsService } from '../../modals/modal-view-colors/view-colors-service';
import { ProductDetailsType } from '../../types/instagram/instagram-feeds-type';
import { ProductCartType } from '../../product-cart/cart-type/product-cart-type';
import { BuyProductForm } from '../../components/buy-product-form/buy-product-form';

@Component({
  selector: 'app-products',
  imports: [
    ProductGallery,
    ModalBio,
    RouterLink,
    ProductInfo,
    CollectionColorButton,
    ModalViewColors,
    BuyProductForm,
  ],
  templateUrl: './products.html',
  styleUrl: './products.css',
})
export class Products implements OnInit, OnDestroy {
  private productSubscription: Subscription | undefined;
  private collectionSubscription: Subscription | undefined;

  public shopProduct: WritableSignal<ProductType | null> = signal<ProductType | null>(null);
  public collectionItem: WritableSignal<ProductType[] | null> = signal<ProductType[] | null>(null);
  public index: WritableSignal<number> = signal<number>(0);

  public revSelector: string = 'reviews';

  constructor(
    private scrollingService: ScrollingService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private productsService: ProductsService,
    private galleryService$: ProductGalleryService,
    private viewColors$: ViewColorsService,
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      if (params['item']) {
        this.scrollingService.toTop();
        this.getProductType(params['item']);
      }
    });
  }

  ngOnDestroy(): void {
    if (this.productSubscription) {
      this.productSubscription.unsubscribe();
    }
    if (this.collectionSubscription) {
      this.collectionSubscription.unsubscribe();
    }
  }

  public colorSelected(i: number): void {
    const items = this.collectionItem();
    if (items !== null) {
      this.router.navigate(['/products', items[i].url]).then(() => {});
    }
  }

  public openViewColors(): void {
    this.viewColors$.triggerViewColors(this.collectionItem());
  }

  private getProductType(url: string): void {
    if (this.productSubscription) {
      this.productSubscription.unsubscribe();
    }

    this.productsService.getShopProduct(url).subscribe((product) => {
      this.shopProduct.set(product);
      this.galleryService$.triggerGallery(product);

      if (product) {

        if (this.collectionSubscription) {
          this.collectionSubscription.unsubscribe();
        }
        this.collectionSubscription = this.productsService
          .getCollectionItem(product.name, product.description)
          .subscribe((item) => {
            this.collectionItem.set(item);

            if (item) {
              for (let i = 0, len = item.length; i < len; i++) {
                if (item[i].colorName === product.colorName) {
                  this.index.set(i);
                  break;
                }
              }
            }
          });
      }
    });
  }

}
