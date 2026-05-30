import { Component, input, signal, WritableSignal } from '@angular/core';
import { ProductType } from '../../products/types/product-type';
import { ModalFeatures } from '../../modals/modal-features/modal-features';
import { FeaturesService } from './features-service';
import { TabListDescription } from '../tab-list-description/tab-list-description';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-description',
  imports: [ModalFeatures, TabListDescription],
  templateUrl: './product-description.html',
  styleUrl: './product-description.css',
})
export class ProductDescription {
  buyProduct = input.required<ProductType>();
  index: WritableSignal<string> = signal<string>('1');

  constructor(private featuresService: FeaturesService,
              private router: Router,) {}

  public openModalFeatures(index: string): void {
    this.featuresService.triggerFeatures(index);
  }

  public navigateTo(url: string): void {
    this.router.navigate([url]).then(() => {});
  }
}
