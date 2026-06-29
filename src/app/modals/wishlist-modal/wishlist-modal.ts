import {
  afterNextRender,
  Component,
  DestroyRef,
  ElementRef,
  inject,
  signal,
  viewChildren,
  WritableSignal
} from '@angular/core';
import { WishlistService } from '../../product-wishlist/wishlist-service';
import { Subscription } from 'rxjs';
import { ProductCartType } from '../../product-cart/cart-type/product-cart-type';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-wishlist-modal',
  imports: [FormsModule],
  templateUrl: './wishlist-modal.html',
  styleUrl: './wishlist-modal.css',
})
export class WishlistModal {
  public open: WritableSignal<boolean> = signal<boolean>(false);
  public wishlist: WritableSignal<{ name: string; count: number }[]> = signal<
    { name: string; count: number }[]
  >([]);
  public productCart: WritableSignal<ProductCartType | null> = signal<ProductCartType | null>(null);

  public needNewWishlist: WritableSignal<boolean> = signal<boolean>(false);
  public newWishlistName: WritableSignal<string> = signal<string>('');
  public listName: string = '';

  public processing: WritableSignal<boolean> = signal<boolean>(false);

  private wishlistService$ = inject(WishlistService);
  private wishlistSubscription$: Subscription = new Subscription();

  readonly wishlistItems = viewChildren<ElementRef<HTMLButtonElement>>('wishlist');

  constructor(private destroyRef: DestroyRef) {
    afterNextRender(() => {
      const sub = this.wishlistService$.wishlistOpen$.subscribe((product) => {
        this.productCart.set(product);

        if (product !== null) {
          const sub2 = this.wishlistService$.getWishlists().subscribe((wishlist) => {
            this.wishlist.set(wishlist);

            setTimeout(() => {
              this.open.set(true);
            }, 300);
          });

          this.wishlistSubscription$.add(sub2);
        } else {
          this.open.set(false);
        }
      });

      this.wishlistSubscription$.add(sub);
    });

    this.destroyRef.onDestroy(() => {
      this.wishlistSubscription$.unsubscribe();
    });
  }

  public modalClose(): void {
    this.wishlistService$.wishlistToggle(null);
  }

  public addNewWishlist(): void {
    this.needNewWishlist.set(true);
  }
  public onInput(): void {
    this.newWishlistName.set(this.listName);
  }

  public onCancel(): void {
    this.listName = '';
    this.newWishlistName.set(this.listName);
    this.needNewWishlist.set(false);
  }

  public onCreate(): void {

    this.processing.set(true);

    setTimeout(() => {

      this.wishlistService$.createWishlist(this.listName);

      const sub = this.wishlistService$.getWishlists().subscribe((wishlist) => {

        this.processing.set(false);
        this.onCancel();
        this.wishlist.set(wishlist);

      });

      this.wishlistSubscription$.add(sub);

    }, 1000);

  }

  public wishlistToggle(wishlistName: string, dataId: number): void {

    let id: string = dataId.toString();
    const lists = this.wishlistItems();

    for (let i = 0; i < lists.length; i++) {

      let item = lists[i];

      if (item && item.nativeElement.dataset['id'] === id) {

        if (!item.nativeElement.classList.contains('checked')) {

          item.nativeElement.classList.add('inactive');
          item.nativeElement.classList.add('checked');

          setTimeout(() => {
            item.nativeElement.classList.remove('inactive');

            const product = this.productCart();

            if (product) {
              let result: boolean = this.wishlistService$.addToWishlist(wishlistName, product);

              if (!result) {
                item.nativeElement.classList.remove('checked');
              }
              else {
                this.updateWishlist();
              }
            }
            else {
              item.nativeElement.classList.remove('checked');
            }


          }, 1000);
        }
        else {
          item.nativeElement.classList.remove('checked');
          const product = this.productCart();
          if (product) {
            this.wishlistService$.removeFromWishlist(wishlistName, product);
            this.updateWishlist();
          }
        }

        break;
      }
    }
  }

  private updateWishlist() {

    const sub = this.wishlistService$.getWishlists().subscribe((wishlist) => {
      this.wishlist.set(wishlist);
    });

    this.wishlistSubscription$.add(sub);
  }
}
