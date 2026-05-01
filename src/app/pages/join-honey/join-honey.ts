import { Component, ElementRef, OnDestroy, OnInit, signal, ViewChild, WritableSignal } from '@angular/core';
import { ScrollingService } from '../../services/scrolling-service';
import { RouterLink } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../auth/auth-service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-join-honey',
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './join-honey.html',
  styleUrl: './join-honey.css',
})
export class JoinHoney implements OnInit, OnDestroy {

  @ViewChild('submitButton')submitButton!: ElementRef;

  public loginForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
  });

  public fieldValid = signal<boolean>(false);
  public fieldHasValue = signal<boolean>(false);
  public isLoading = signal<boolean>(false);
  public isLogged = signal<boolean>(false);

  private msgError: string = 'Please ensure all fields are correct';
  private msgUserError: string = 'This email is not exists';
  public toastMessage: string = '';
  public typeError: WritableSignal<boolean> = signal<boolean>(false);
  public isNotReady: WritableSignal<boolean> = signal<boolean>(true);

  private auth$: Subscription | undefined;

  constructor(private scrollingService: ScrollingService,
              private authService$: AuthService) {}

  get email() { return this.loginForm.get('email'); };

  ngOnInit() {
    this.scrollingService.toTop();
  }

  ngOnDestroy() {
    if (this.auth$) {
      this.auth$.unsubscribe();
    }
  }

  public onSubmit(): void {

    if (this.loginForm.status === 'VALID') {

      if (this.auth$) {
        this.auth$.unsubscribe();
      }

      this.auth$ = this.authService$.isUserExist(this.loginForm.value.email.trim())
        .subscribe(isUserExist => {

          this.isLoading.set(isUserExist);

          if (!isUserExist) {
            this.toastMessage = this.msgUserError;
            this.triggerToaster();
          }
          else {
            setTimeout(() => {
              this.isLoading.set(false);
              this.isLogged.set(true);
            }, 3000);
          }
        });

    }
    else {
      this.toastMessage = this.msgError;
      this.triggerToaster();
    }
  }

  private triggerToaster(): void {
    this.isNotReady.set(false);
    this.typeError.set(true);

    setTimeout(() => {
      this.isNotReady.set(true);
    }, 2000);
  }

  public emailInput(): void {
    if (this.loginForm.value.email.trim().length > 0) {
      this.fieldHasValue.set(true);
    }
    else {
      this.fieldHasValue.set(false);
    }
  }

  public buttonClicked(): void {
    this.submitButton.nativeElement.click();
  }
}
