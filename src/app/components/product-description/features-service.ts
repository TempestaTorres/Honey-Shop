import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FeaturesService {

  public featuresOpen$: BehaviorSubject<string | null>;

  constructor() {
    this.featuresOpen$ = new BehaviorSubject<string | null>(null);
  }

  public triggerFeatures(index: string | null = null): void {
    this.featuresOpen$.next(index);
  }
}
