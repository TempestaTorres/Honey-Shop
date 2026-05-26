import { Component, OnDestroy, OnInit, signal, WritableSignal } from '@angular/core';
import { ScrollingService } from '../../services/scrolling-service';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductsService } from '../../products/products-service';
import { Subscription } from 'rxjs';
import { ProductType } from '../../products/types/product-type';
import { ProductGallery } from '../../components/product-gallery/product-gallery';
import { ModalBio } from '../../modals/modal-bio/modal-bio';

@Component({
  selector: 'app-products',
  imports: [ProductGallery, ModalBio],
  templateUrl: './products.html',
  styleUrl: './products.css',
})
export class Products implements OnInit, OnDestroy {
  private productSubscription: Subscription | undefined;
  private collectionSubscription: Subscription | undefined;

  public shopProduct: WritableSignal<ProductType | null> = signal<ProductType | null>(null);
  public collectionItem: WritableSignal<ProductType[] | null> = signal<ProductType[] | null>(null);
  public index: WritableSignal<number> = signal<number>(0);

  constructor(
    private scrollingService: ScrollingService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private productsService: ProductsService,
  ) {}

  ngOnInit(): void {
    this.scrollingService.toTop();

    this.activatedRoute.params.subscribe((params) => {
      if (params['item']) {

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

  private getProductType(url: string): void {
    if (this.productSubscription) {
      this.productSubscription.unsubscribe();
    }

    this.productsService.getShopProduct(url).subscribe((product) => {
      this.shopProduct.set(product);

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
