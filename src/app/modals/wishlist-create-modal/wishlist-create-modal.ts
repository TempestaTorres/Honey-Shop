import { afterNextRender, Component, DestroyRef, inject, signal, WritableSignal } from '@angular/core';
import { WishlistService } from '../../product-wishlist/wishlist-service';
import { Subscription } from 'rxjs';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-wishlist-create-modal',
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './wishlist-create-modal.html',
  styleUrl: './wishlist-create-modal.css',
})
export class WishlistCreateModal {
  public open: WritableSignal<boolean> = signal<boolean>(false);
  public processing: WritableSignal<boolean> = signal<boolean>(false);
  public newWishlistName: WritableSignal<string> = signal<string>('');

  private wishlistService$ = inject(WishlistService);
  private wishlistSubscription$: Subscription = new Subscription();

  public wishlistForm: FormGroup = new FormGroup({
    wishlistName: new FormControl(''),
  });

  constructor(private destroyRef: DestroyRef) {
    afterNextRender(() => {
      const sub = this.wishlistService$.wishlistCreateOpen$.subscribe((status) => {
        this.open.set(status);

        if (status) {
          this.wishlistForm.reset();
          this.newWishlistName.set('');
        }
      });

      this.wishlistSubscription$.add(sub);
    });

    this.destroyRef.onDestroy(() => {
      this.wishlistSubscription$.unsubscribe();
    });
  }

  public modalClose(): void {
    this.wishlistService$.wishlistCreateToggle(false);
  }

  public onCreate(): void {

    this.processing.set(true);

    setTimeout(() => {

      this.wishlistService$.createWishlist(this.newWishlistName());
      this.processing.set(false);

      this.modalClose();
    }, 1000);
  }

  public onInput(): void {
    this.newWishlistName.set(this.wishlistForm.value.wishlistName.trim());
  }

}
