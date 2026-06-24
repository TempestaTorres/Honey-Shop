import { Component, DestroyRef, OnInit, signal, WritableSignal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PopUp } from '../../components/pop-up/pop-up';
import { PopUpService } from '../../components/pop-up/pop-up-service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SigninCodeForm } from '../../components/signin-code-form/signin-code-form';

@Component({
  selector: 'app-sign-in',
  imports: [RouterLink, PopUp, ReactiveFormsModule, SigninCodeForm],
  templateUrl: './sign-in.html',
  styleUrl: './sign-in.css',
})
export class SignIn implements OnInit {
  public authBannerUrl: string =
    '--global-auth-image: url("/assets/images/categories/new/NEW_44.jpg");';

  public popUpType: WritableSignal<string> = signal<string>('');
  public userEmail: WritableSignal<string> = signal<string>('');
  public hasError: WritableSignal<boolean> = signal<boolean>(false);
  public processing: WritableSignal<boolean> = signal<boolean>(false);
  public processingDone: WritableSignal<boolean> = signal<boolean>(false);
  public formActive: WritableSignal<boolean> = signal<boolean>(true);
  public spinnerActive: WritableSignal<boolean> = signal<boolean>(false);

  public authForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    consent: new FormControl(false),
  });

  constructor(
    private destroyRef: DestroyRef,
    private popupService: PopUpService,
  ) {
    this.destroyRef.onDestroy(() => {
      document.body.classList.remove('auth-kit');
    });
  }

  ngOnInit(): void {
    document.body.classList.add('auth-kit');
  }

  get email() {
    return this.authForm.get('email');
  }

  public openPopup(type: string): void {
    this.popUpType.set(type);

    requestAnimationFrame(() => {
      this.popupService.popUpOpen(type);
    });
  }

  public onSubmit(): void {
    if (this.authForm.valid) {
      this.hasError.set(false);

      this.processing.set(true);
      this.userEmail.set(this.authForm.value.email);

      setTimeout(() => {
        this.processing.set(false);
        this.authForm.reset();
        this.formActive.set(false);

        setTimeout(() => {
          this.formActive.set(true);
          this.processingDone.set(true);
        }, 300);
      }, 2000);
    } else {
      this.hasError.set(true);
    }
  }

  public onChange(): void {

    this.spinnerActive.set(true);

  }

  public onSpinner(state: boolean): void {
    this.spinnerActive.set(state);
    this.formActive.set(state);
    this.userEmail.set('');
    this.processingDone.set(state);

    setTimeout(() => {
      this.formActive.set(true);
    }, 300);
  }
}
