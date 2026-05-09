import { Component, ElementRef, OnInit, signal, ViewChild, WritableSignal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ScrollingService } from '../../services/scrolling-service';

@Component({
  selector: 'app-book-return',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './book-return.html',
  styleUrl: './book-return.css',
})
export class BookReturn implements OnInit {

  @ViewChild('submitBtn') submitBtn!: ElementRef;
  public popperActive: WritableSignal<boolean> = signal<boolean>(false);

  public orderForm: FormGroup = new FormGroup({
    order: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
  });

  constructor(private scrollingService: ScrollingService) {
  }

  ngOnInit() {
    this.scrollingService.toTop();
  }

  get order() {
    return this.orderForm.get('order');
  }
  get email() {
    return this.orderForm.get('email');
  }

  public onSubmit() {
    if (this.orderForm.status === 'VALID') {
    }
  }

  public onInputChange() {
    this.submitBtn.nativeElement.disabled = this.orderForm.status === 'INVALID';
  }

  popperTrigger(): void {
    this.popperActive.update((value) => !value);
  }
}
