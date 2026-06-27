import { afterNextRender, Component, DestroyRef, EventEmitter, Output, signal, WritableSignal } from '@angular/core';
import { AuthService } from '../../auth/auth-service';
import { Subscription } from 'rxjs';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-profile-editor',
  imports: [ReactiveFormsModule],
  templateUrl: './profile-editor.html',
})
export class ProfileEditor {

  @Output() editorClose: EventEmitter<any> = new EventEmitter();

  public userEmail: WritableSignal<string> = signal<string>('');
  public userFirstName: WritableSignal<string> = signal<string>('');
  public userLastName: WritableSignal<string> = signal<string>('');
  public submitDisabled: WritableSignal<boolean> = signal<boolean>(true);
  public processing: WritableSignal<boolean> = signal<boolean>(false);

  public profileForm: FormGroup = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    email: new FormControl('', [Validators.email]),
    consent: new FormControl(false)
  });

  private authSubscription$: Subscription = new Subscription();

  constructor(
    private authService: AuthService,
    private destroyRef: DestroyRef,
  ) {
    afterNextRender(() => {
      const sub = this.authService.userEmailUpdated$.subscribe((email) => {
        if (email !== null) {
          this.userEmail.set(email);
          this.profileForm.patchValue({
            email: email,
          });
        }
      });

      this.authSubscription$.add(sub);

      const sub2 = this.authService.userNameUpdated$.subscribe((name) => {
        if (name !== null) {
          let firstName = name.split(' ')[0];
          this.userFirstName.set(firstName);

          this.profileForm.patchValue({
            firstName: firstName,
          });

          if (name.length > firstName.length) {
            let lastName = name.split(' ')[1];
            this.userLastName.set(lastName);

            this.profileForm.patchValue({
              lastName: lastName,
            });
          }
        }
      });
      this.authSubscription$.add(sub2);
    });

    this.destroyRef.onDestroy(() => {
      this.authSubscription$.unsubscribe();
    });
  }

  get email() {return this.profileForm.get('email');}

  public onSubmit(): void {

    if (this.profileForm.valid) {

      this.processing.set(true);

      setTimeout(() => {
        this.processing.set(false);

        let firstName: string = this.profileForm.value.firstName.trim();
        let lastName: string = this.profileForm.value.lastName.trim();

        if (lastName.length > 0) {
          firstName = firstName + ' ' + lastName;
        }


        let email: string = this.profileForm.value.email.trim();

        this.authService.updateUserName(firstName);
        this.authService.updateUserEmail(email);

        this.onClose();

      }, 2000);

    }
    else {
      this.submitDisabled.set(true);
    }
  }

  public onClose(): void {
    this.profileForm.reset();
    this.editorClose.emit();
  }

  public onInputChange(): void {
    if ((this.profileForm.value.firstName !== this.userFirstName())
      || (this.profileForm.value.lastName !== this.userLastName())
      || (this.profileForm.value.email.length > 0
      && (this.profileForm.value.email !== this.userEmail() && this.profileForm.valid))) {

      this.submitDisabled.set(false);
    }
    else if (!this.profileForm.value.consent) {
      this.submitDisabled.set(true);
    }

  }
  isChecked(): void {
    if (this.profileForm.value.consent) {
      this.submitDisabled.set(false);
    }
    else if (this.profileForm.value.firstName === this.userFirstName()
      && this.profileForm.value.lastName === this.userLastName()
      && (this.profileForm.value.email === this.userEmail() || this.profileForm.value.email === 0)) {
      this.submitDisabled.set(true);
    }
  }
}
