import { Component, OnInit, signal, WritableSignal } from '@angular/core';
import { WishlistService } from '../../product-wishlist/wishlist-service';
import { ScrollingService } from '../../services/scrolling-service';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../auth/auth-service';

@Component({
  selector: 'app-wishlist',
  imports: [RouterLink],
  templateUrl: './wishlist.html',
  styleUrl: './wishlist.css',
})
export class Wishlist implements OnInit {
  public empty: WritableSignal<boolean> = signal<boolean>(true);
  public isLoggedIn: WritableSignal<boolean> = signal<boolean>(false);

  constructor(
    private wishlistService: WishlistService,
    private scrollingService: ScrollingService,
    private authService: AuthService,
  ) {

    this.isLoggedIn.set(this.authService.isLoggedIn());
  }

  ngOnInit(): void {
    this.scrollingService.toTop();
  }
}
