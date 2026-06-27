import { afterNextRender, Component, DestroyRef, ElementRef, signal, viewChild, WritableSignal } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { AuthService } from '../../auth/auth-service';
import { Subscription } from 'rxjs';
import { PopUpService } from '../../components/pop-up/pop-up-service';
import { PopUpEditor } from '../../components/pop-up-editor/pop-up-editor';
import { Router } from '@angular/router';
import { Toaster } from '../../components/toaster/toaster';
import { PopUpConfirm } from '../../components/pop-up-confirm/pop-up-confirm';

@Component({
  selector: 'app-profile',
  imports: [CurrencyPipe, PopUpEditor, Toaster, PopUpConfirm],
  templateUrl: './profile.html',
  styleUrl: './profile.css',
})
export class Profile {

  readonly switcher = viewChild<ElementRef<HTMLInputElement>>('switcher');

  public clubBalance: WritableSignal<number> = signal<number>(0);
  public yearlyProgress: WritableSignal<number> = signal<number>(0);
  public userEmail: WritableSignal<string> = signal<string>('');
  public userName: WritableSignal<string> = signal<string>('Name');
  public popUpType: WritableSignal<string> = signal<string>('');
  public popUpConfirmType: WritableSignal<string> = signal<string>('');
  public popUpConfirmMessage: WritableSignal<string> = signal<string>('');
  public hasUserAddress: WritableSignal<boolean> = signal<boolean>(false);
  public prefUpdated: WritableSignal<boolean> = signal<boolean>(false);

  private authSubscription$: Subscription = new Subscription();

  constructor(
    private authService: AuthService,
    private destroyRef: DestroyRef,
    private popupService: PopUpService,
    private router: Router,
  ) {
    afterNextRender(() => {
      const sub = this.authService.userEmailUpdated$.subscribe((email) => {
        if (email !== null) {
          this.userEmail.set(email);
        }
      });

      this.authSubscription$.add(sub);

      const sub2 = this.authService.userNameUpdated$.subscribe((name) => {
        if (name !== null) {
          this.userName.set(name);
        }
      });
      this.authSubscription$.add(sub2);
    });

    this.destroyRef.onDestroy(() => {
      if (this.authSubscription$) {
        this.authSubscription$.unsubscribe();
      }
    });
  }

  public openPopup(type: string): void {
    this.popUpType.set(type);

    requestAnimationFrame(() => {
      this.popupService.popUpOpen(type);
    });
  }

  public onSignOut(): void {
    this.authService.logout();
    this.router.navigate(['/']).then(() => {});
  }

  public onSwitch(checked: boolean): void {
    if (!checked) {
      this.popUpConfirmMessage.set('You’ll no longer receive email marketing from Honey');
      this.popUpConfirmType.set('unsubscribe from emails');
      requestAnimationFrame(() => {
        this.popupService.popUpOpen(this.popUpConfirmType());
      });
    } else {
      this.activateToaster();
    }
  }

  public onConfirm(result: boolean): void {

    if (!result) {
      const sw = this.switcher()?.nativeElement;
      if (sw) {
        sw.checked = true;
      }
      return;
    }
    this.activateToaster();
  }

  private activateToaster(): void {

    if (!this.prefUpdated()) {
      this.prefUpdated.set(true);

      setTimeout(() => {
        this.prefUpdated.set(false);
      }, 6000);
    }
  }
}
