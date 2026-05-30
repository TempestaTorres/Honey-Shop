import { Component, input } from '@angular/core';
import { ProductType } from '../../products/types/product-type';
import { ModalFeatures } from '../../modals/modal-features/modal-features';
import { FeaturesService } from './features-service';

@Component({
  selector: 'app-product-description',
  imports: [ModalFeatures],
  templateUrl: './product-description.html',
  styleUrl: './product-description.css',
})
export class ProductDescription {
  buyProduct = input.required<ProductType>();

  constructor(private featuresService: FeaturesService) {
  }

  public openModalFeatures(index: string): void {
    this.featuresService.triggerFeatures(index);
  }
}
