import { Component, effect, input, signal, WritableSignal } from '@angular/core';
import { WishlistTabContent } from './wishlist-tab-content/wishlist-tab-content';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { WishlistService } from '../../product-wishlist/wishlist-service';

@Component({
  selector: 'app-wishlist-tab-list',
  imports: [WishlistTabContent, ReactiveFormsModule],
  templateUrl: './wishlist-tab-list.html',
  styleUrl: './wishlist-tab-list.css',
})
export class WishlistTabList {
  wishlists = input.required<{ name: string; count: number }[]>();
  public editName: WritableSignal<boolean> = signal<boolean>(false);

  public activeTab: WritableSignal<number> = signal<number>(0);

  public editForm: FormGroup = new FormGroup({
    editName: new FormControl('', Validators.required),
  });

  constructor(private wishlistService: WishlistService) {

    effect(() => {
      const lists = this.wishlists();
      if (lists.length > 0) {
        this.activeTab.set(0);
      }
    });
  }

  public onTabClick(i: number): void {
    this.activeTab.set(i);
  }

  public onRename(status: boolean): void {
    this.editName.set(status);
  }

  public onSubmit(listName: string): void {

    if (this.editForm.valid) {

      const newName: string = this.editForm.value.editName.trim();

      if (newName !== listName) {
        this.onCancel()
        this.wishlistService.rename(listName, newName);
      }

    }
  }

  public onCancel(): void {
    this.editForm.reset();
    this.editName.set(false);
  }
}
