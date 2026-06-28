import {
  afterNextRender,
  Component,
  DestroyRef,
  inject,
  signal,
  WritableSignal,
} from '@angular/core';
import { ActivatedRoute, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../auth/auth-service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-account-header',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './account-header.html',
  styleUrl: './account-header.css',
})
export class AccountHeader {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private authService = inject(AuthService);

  private authSubscription: Subscription | undefined;

  public navOpen: WritableSignal<boolean> = signal<boolean>(false);
  public userLetter: WritableSignal<string | null> = signal<string | null>(null);

  constructor(private destroyRef: DestroyRef) {
    afterNextRender(() => {
      this.authSubscription = this.authService.userNameUpdated$.subscribe((userNameUpdated) => {
        if (userNameUpdated != null) {
          this.userLetter.set(userNameUpdated[0]);
        }
      });
    });

    this.destroyRef.onDestroy(() => {
      if (this.authSubscription) this.authSubscription.unsubscribe();
    });
  }

  navigateTo(url: string): void {
    if (this.navOpen()) {
      this.triggerMainNavigation();
      setTimeout(() => {
        this.router.navigate([url], { relativeTo: this.route }).then(() => {});
      }, 330);
    } else {
      this.router.navigate([url], { relativeTo: this.route }).then(() => {});
    }
  }

  public triggerMainNavigation(): void {
    this.navOpen.update((status) => !status);
  }
}
