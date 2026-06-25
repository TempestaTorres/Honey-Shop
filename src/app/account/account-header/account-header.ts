import { Component, inject, signal, WritableSignal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-account-header',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './account-header.html',
  styleUrl: './account-header.css',
})
export class AccountHeader {
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  public navOpen: WritableSignal<boolean> = signal<boolean>(false);

  navigateTo(url: string): void {

    if (this.navOpen()) {
      this.triggerMainNavigation();
      setTimeout(() => {
        this.router.navigate([url], { relativeTo: this.route }).then(() => {});
      }, 330);
    }
    else {
      this.router.navigate([url], { relativeTo: this.route }).then(() => {});
    }

  }

  public triggerMainNavigation(): void {
    this.navOpen.update(status => !status);
  }
}
