import { Component, OnDestroy, OnInit, signal, WritableSignal } from '@angular/core';
import { AuthService } from '../../auth/auth-service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-alert-modal',
  imports: [],
  templateUrl: './login-alert-modal.html',
})
export class LoginAlertModal implements OnInit, OnDestroy {

  private loginAlert$: Subscription | undefined;
  public alertTriggered: WritableSignal<boolean> = signal<boolean>(false);
  public alertType: WritableSignal<string> = signal<string>("");

  constructor(public authService: AuthService, private router: Router) { }

  ngOnInit(): void {

    this.loginAlert$ = this.authService.loginAlert$.subscribe(state => {
      this.alertTriggered.set(state.state);
      this.alertType.set(state.type);

    });
  }

  ngOnDestroy(): void {
    if (this.loginAlert$) {
      this.loginAlert$.unsubscribe();
    }
  }

  public modalClose(): void {
    this.authService.toggleAlert(false);
  }

  public login(): void {
    this.modalClose();

    setTimeout(() => {
      this.router.navigate(['/sign-in']).then(() => {});
    }, 400);
  }
}
