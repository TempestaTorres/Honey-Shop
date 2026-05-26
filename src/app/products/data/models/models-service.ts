import { Injectable } from '@angular/core';
import { ModelBioType } from '../../types/model-bio-type';
import { BehaviorSubject, Observable } from 'rxjs';
import { Models } from './models-data';

@Injectable({
  providedIn: 'root',
})
export class ModelsService {

  public modalBioOpen$: BehaviorSubject<boolean>;

  constructor() {
    this.modalBioOpen$ = new BehaviorSubject(false);
  }

  public triggerModalBio(state: boolean): void {
    this.modalBioOpen$.next(state);
  }

  public getModelsBio(names: string[]): Observable<ModelBioType[]> {

    let models: ModelBioType[] = [];

    for (let index = 0; index < names.length; index++) {
      const name = names[index];

      let bio: ModelBioType | undefined = Models.find(model => model.name === name);
      if (bio) {
        models.push(bio);
      }
    }

    return new Observable<ModelBioType[]>(observer => {
      observer.next(models);
    });
  }
}
