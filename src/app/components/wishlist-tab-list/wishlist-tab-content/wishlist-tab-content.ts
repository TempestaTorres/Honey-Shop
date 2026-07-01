import {
  Component,
  DestroyRef,
  effect,
  inject,
  input,
  output,
  signal,
  WritableSignal
} from '@angular/core';
import { WishlistService } from '../../../product-wishlist/wishlist-service';
import { WishlistType } from '../../../product-wishlist/wishlist-type';
import { Subscription } from 'rxjs';
import { WishlistProductCard } from '../../wishlist-product-card/wishlist-product-card';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-wishlist-tab-content',
  imports: [WishlistProductCard, RouterLink],
  templateUrl: './wishlist-tab-content.html',
  styleUrl: './wishlist-tab-content.css',
})
export class WishlistTabContent {
  wishlistName = input.required<string>();
  requestRename = output<boolean>();

  private wishlistService$ = inject(WishlistService);
  private wishlistSubscription$: Subscription = new Subscription();

  public wishlist: WritableSignal<WishlistType | null> = signal<WishlistType | null>(null);
  public editorOpen: WritableSignal<boolean> = signal<boolean>(false);
  public isFirst: WritableSignal<boolean> = signal<boolean>(false);
  public isLast: WritableSignal<boolean> = signal<boolean>(false);

  constructor(private destroyRef: DestroyRef) {
    effect(() => {
      const name: string = this.wishlistName();
      const sub = this.wishlistService$.getWishlist(name).subscribe((wishlist) => {
        this.wishlist.set(wishlist);
        this.isFirst.set(this.wishlistService$.isFirst(name));
        this.isLast.set(this.wishlistService$.isLast(name));
      });
      this.wishlistSubscription$.add(sub);
    });

    this.destroyRef.onDestroy(() => {
      this.wishlistSubscription$.unsubscribe();
    });
  }

  public toggleEditor(): void {
    this.editorOpen.update((value) => !value);
  }

  public rename(): void {
    this.requestRename.emit(true);
  }

  public move(direction: number): void {
    const name: string = this.wishlistName();
    this.wishlistService$.shift(name, direction);
  }

  public delete(): void {
    const name: string = this.wishlistName();
    this.wishlistService$.delete(name);
  }
}
