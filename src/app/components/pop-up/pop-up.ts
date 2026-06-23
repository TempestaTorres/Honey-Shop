import { afterNextRender, Component, DestroyRef, input, signal, WritableSignal } from '@angular/core';
import { PopUpService } from './pop-up-service';
import { Subscription } from 'rxjs';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-pop-up',
  imports: [RouterLink],
  templateUrl: './pop-up.html',
  styleUrl: './pop-up.css',
})
export class PopUp {
  popupType = input.required<string>();

  public open: WritableSignal<boolean> = signal<boolean>(false);
  public active: WritableSignal<boolean> = signal<boolean>(false);

  private popUpSubscription$: Subscription | undefined;

  constructor(
    private popupService: PopUpService,
    private destroyRef: DestroyRef,
  ) {
    afterNextRender(() => {
      this.popUpSubscription$ = this.popupService.popUpOpen$.subscribe((q) => {
        if (q === 'close' && this.open()) {
          this.toggle(false);
        } else if (q === this.popupType() && !this.open()) {
          this.toggle(true);
        }
      });
    });

    this.destroyRef.onDestroy(() => {
      if (this.popUpSubscription$) this.popUpSubscription$.unsubscribe();
    });
  }

  public popupClose(): void {
    this.popupService.popUpOpen('close');
  }

  public mouseDown(e: MouseEvent): void {
    if (e.target === e.currentTarget) {
      this.popupClose();
    }
  }

  private toggle(state: boolean): void {
    if (state) {
      this.open.set(state);

      setTimeout(() => {
        this.active.set(state);
      }, 300);
    } else {
      this.active.set(state);

      setTimeout(() => {
        this.open.set(state);
      }, 300);
    }
  }
}
