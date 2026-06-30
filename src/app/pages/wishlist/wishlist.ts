import { afterNextRender, Component, DestroyRef, OnInit, signal, WritableSignal } from '@angular/core';
import { WishlistService } from '../../product-wishlist/wishlist-service';
import { ScrollingService } from '../../services/scrolling-service';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../auth/auth-service';
import { Subscription } from 'rxjs';
import { WishlistCreateModal } from '../../modals/wishlist-create-modal/wishlist-create-modal';

@Component({
  selector: 'app-wishlist',
  imports: [RouterLink, WishlistCreateModal],
  templateUrl: './wishlist.html',
  styleUrl: './wishlist.css',
})
export class Wishlist implements OnInit {
  public empty: WritableSignal<boolean> = signal<boolean>(true);
  public isLoggedIn: WritableSignal<boolean> = signal<boolean>(false);

  public wishlists: WritableSignal<{ name: string; count: number }[]> = signal<
    { name: string; count: number }[]
  >([]);

  private wishlistSubscription: Subscription = new Subscription();

  constructor(
    private wishlistService$: WishlistService,
    private scrollingService$: ScrollingService,
    private authService: AuthService,
    private destroyRef: DestroyRef,
  ) {
    afterNextRender(() => {
      this.isLoggedIn.set(this.authService.isLoggedIn());

      const sub = this.wishlistService$.customerWishlistsCount.subscribe((count) => {
        this.empty.update((value) => count === 0);

        if (count > 0) {
          const sub2 = this.wishlistService$.getWishlists().subscribe((wishlists) => {
            this.wishlists.set(wishlists);
          });

          this.wishlistSubscription.add(sub2);
        }
      });

      this.wishlistSubscription.add(sub);
    });

    this.destroyRef.onDestroy(() => {
      this.wishlistSubscription.unsubscribe();
    });
  }

  ngOnInit(): void {
    this.scrollingService$.toTop();
  }

  public addNewWishlist(): void {
    this.wishlistService$.wishlistCreateToggle(true);
  }
}
