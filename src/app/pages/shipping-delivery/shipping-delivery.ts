import { Component, OnInit } from '@angular/core';
import { ScrollingService } from '../../services/scrolling-service';

@Component({
  selector: 'app-shipping-delivery',
  imports: [],
  templateUrl: './shipping-delivery.html',
  styleUrl: './shipping-delivery.css',
})
export class ShippingDelivery implements OnInit {

  constructor(private scrollingService: ScrollingService) {
  }
  ngOnInit() {
    this.scrollingService.toTop();
  }
}
