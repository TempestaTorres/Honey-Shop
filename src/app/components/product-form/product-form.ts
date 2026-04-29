import { Component, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-product-form',
  imports: [ReactiveFormsModule],
  templateUrl: './product-form.html',
})
export class ProductForm {

  public productForm: FormGroup = new FormGroup({
    amount: new FormControl('', Validators.required),
    name: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required,Validators.email]),
    message: new FormControl('', [Validators.required, Validators.maxLength(200), Validators.minLength(2)]),
  });

  public messageCounter = signal(0);
  public submitDisabled = signal(true);

  public get name() { return this.productForm.get('name'); };
  public get email() { return this.productForm.get('email'); };
  public get message() { return this.productForm.get('message'); };

  public onSubmit(): void {

    if (this.productForm.status === 'VALID') {

      /* Open mini cart
      GIFT CARDONLINE
      $50
      Recipient name: Tempesta
      Recipient email: user@mai.com
      Message: Cool
      */
    }
  }

  public messageInput(): void {
    this.messageCounter.set(this.productForm.value.message.length);
    this.isValid();
  }

  public isValid(): void {
    this.submitDisabled.update(value => this.productForm.status !== 'VALID');
  }
}
