import { Component, input } from '@angular/core';
import { ProductType } from '../../products/types/product-type';

@Component({
  selector: 'app-product-description',
  imports: [],
  templateUrl: './product-description.html',
  styleUrl: './product-description.css',
})
export class ProductDescription {

  buyProduct = input.required<ProductType>();
}
