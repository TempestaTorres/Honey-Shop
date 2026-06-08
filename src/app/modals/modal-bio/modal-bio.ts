import { Component, input, OnDestroy, OnInit, signal, WritableSignal } from '@angular/core';
import { ProductType } from '../../products/types/product-type';
import { ModelsService } from '../../products/data/models/models-service';
import { ModelBioType } from '../../products/types/model-bio-type';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-modal-bio',
  imports: [],
  templateUrl: './modal-bio.html',
})
export class ModalBio implements OnDestroy, OnInit {
  product = input.required<ProductType>();
  public models: WritableSignal<ModelBioType[]> = signal<ModelBioType[]>([]);
  public open: WritableSignal<boolean> = signal<boolean>(false);

  private modelsSubscription: Subscription | undefined;
  private openModalSubscription: Subscription | undefined;

  constructor(private modelsService: ModelsService) {

  }

  ngOnInit(): void {

    this.openModalSubscription = this.modelsService.modalBioOpen$.subscribe(state => {

      if (state) {
        this.getBios();

        setTimeout(() => {
          this.open.set(state);
        },300);
      }else {
        this.open.set(state);
      }
    });
  }

  ngOnDestroy(): void {
    if (this.modelsSubscription) {
      this.modelsSubscription.unsubscribe();
    }
    if (this.openModalSubscription) {
      this.openModalSubscription.unsubscribe();
    }
  }

  public closeModal(): void {
    this.modelsService.triggerModalBio(false);
  }

  private getBios(): void {
    if (this.modelsSubscription) {
      this.modelsSubscription.unsubscribe();
    }

    const modelNames: string[] | undefined = this.product().models;

    if (modelNames !== undefined) {
      this.modelsService.getModelsBio(modelNames).subscribe((models) => {
        this.models.set(models);

      });
    }
  }
}
