import { Component, OnInit } from '@angular/core';
import { ZoomableImage } from '../../components/zoomable-image/zoomable-image';
import { RouterLink } from '@angular/router';
import { ProductForm } from '../../components/product-form/product-form';
import { ScrollingService } from '../../services/scrolling-service';

@Component({
  selector: 'app-online-gift-voucher',
  imports: [ZoomableImage, RouterLink, ProductForm],
  templateUrl: './online-gift-voucher.html',
  styleUrl: './online-gift-voucher.css',
})
export class OnlineGiftVoucher implements OnInit {

  constructor(private scrollingService: ScrollingService) {
  }
  ngOnInit() {
    this.scrollingService.toTop();
  }
}
