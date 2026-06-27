import { afterNextRender, Component, DestroyRef, input, output, signal, WritableSignal } from '@angular/core';
import { Subscription } from 'rxjs';
import { PopUpService } from '../pop-up/pop-up-service';

@Component({
  selector: 'app-pop-up-confirm',
  imports: [],
  templateUrl: './pop-up-confirm.html',
})
export class PopUpConfirm {

  popupType = input.required<string>();
  popupMessage = input.required<string>();
  onClose = output<boolean>();


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
  public onClick(result: boolean): void {
    this.onClose.emit(result);
    this.popupClose();
  }
}
