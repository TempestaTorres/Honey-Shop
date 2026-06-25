import {
  Component,
  effect,
  ElementRef,
  EventEmitter,
  input,
  Output,
  signal, viewChild,
  viewChildren,
  WritableSignal
} from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../auth/auth-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin-code-form',
  imports: [ReactiveFormsModule],
  templateUrl: './signin-code-form.html',
  styleUrl: './signin-code-form.css',
})
export class SigninCodeForm {

  @Output() spinnerEnd: EventEmitter<boolean> = new EventEmitter();

  userEmail = input.required<string>();
  spinnerActive = input.required<boolean>();

  public digitActive: WritableSignal<number> = signal<number>(1);
  readonly digits = viewChildren<ElementRef<HTMLElement>>('digit');
  readonly submitBtn = viewChild<ElementRef<HTMLButtonElement>>('submit');

  public codeError: WritableSignal<boolean> = signal<boolean>(false);
  public codeShake: WritableSignal<boolean> = signal<boolean>(false);

  public codeForm: FormGroup = new FormGroup({
    digitInput: new FormControl('', [Validators.required, Validators.maxLength(6)]),
  });

  constructor(private authService: AuthService, private router: Router) {

    effect(() => {
      const sActive = this.spinnerActive();

      if (sActive) {
        setTimeout(() => {
          this.spinnerEnd.emit(false);
        }, 1000);
      }

      const i = this.digitActive();
      if (i > 6) {
        setTimeout(() => {
          const btn = this.submitBtn()?.nativeElement;
          if (btn) {
            btn.click();
          }
        }, 100);
      }
    });
  }

  public onSubmit(): void {

    if (this.codeForm.valid) {

      let value: string = this.codeForm.value.digitInput;

      if (value !== "000000") {
        this.codeShake.set(true);
        this.codeError.set(true);

        setTimeout(() => {
          this.codeShake.set(false);
          this.codeForm.reset();
          this.reset();

        }, 800);
      }
      else {
        // Log in
        this.authService.login(this.userEmail());
        this.router.navigate(['account/orders']).then(() => {});
      }
    }
  }

  private reset(): void {
    const codes = this.digits();
    if (codes.length > 0) {
      for (let i = 0; i < codes.length; i++) {

        const code = codes[i];
        let target = code.nativeElement.firstElementChild?.firstElementChild;

        if (target !== null && target !== undefined) {
          target.innerHTML = '';
          target.classList.remove('digit-enter');
        }
      }
    }
    this.digitActive.set(1);
  }

  public onInputChange(e: KeyboardEvent): void {

    const value = e.key;

    const codes = this.digits();
    if (codes) {
      for (let i = 0; i < codes.length; i++) {

        const code = codes[i];
        const id = code.nativeElement.dataset['id'];

        if (id !== undefined) {
          let index = parseInt(id);

          if (index === this.digitActive()) {

            let target = code.nativeElement.firstElementChild?.firstElementChild;

            if (target !== undefined && target !== null) {

              if (value !== 'Backspace' && !target.classList.contains('digit-enter')) {
                target.innerHTML = value;
                target.classList.add('digit-enter');

                index++;
                this.digitActive.set(index);

              }
              else if (value === 'Backspace' && i > 0 && index > 1) {

                target.innerHTML = '';
                target.classList.remove('digit-enter');
                let backTarget = codes[i - 1].nativeElement;
                let codeTarget = backTarget.firstElementChild?.firstElementChild;

                if (codeTarget !== undefined && codeTarget !== null) {
                  codeTarget.classList.remove('digit-enter');
                  codeTarget.classList.add('digit-exit');

                  setTimeout(() => {
                    codeTarget.innerHTML = '';
                    codeTarget.classList.remove('digit-exit');
                    index--;
                    this.digitActive.set(index);
                  }, 200);
                }

              }

            }


            break;
          }
        }
      }
    }
  }
}
