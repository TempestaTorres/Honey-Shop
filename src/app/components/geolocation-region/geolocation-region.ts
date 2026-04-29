import {
  AfterViewInit,
  Component, ElementRef,
  OnDestroy,
  ViewChild
} from '@angular/core';
import { Subscription } from 'rxjs';
import { GeoLocationType } from '../../types/geoloc-types';
import { GeoLocationService } from '../../services/geoloc-service';

@Component({
  selector: 'app-geolocation-region',
  imports: [],
  templateUrl: './geolocation-region.html',
})
export class GeolocationRegion implements AfterViewInit, OnDestroy {

  @ViewChild('countryName') countryName!: ElementRef;
  @ViewChild('countryFlag') countryFlag!: ElementRef;

  private geolocationType$: Subscription | undefined;

  constructor(private geoLocationService: GeoLocationService) {}

  ngAfterViewInit() {

    this.geolocationType$ = this.geoLocationService.currentLocation.subscribe({
      next: (event: GeoLocationType) => {
        this.countryName.nativeElement.innerHTML = event.name;
        this.countryFlag.nativeElement.innerHTML = event.country;
      },
    });
  }

  ngOnDestroy() {
    if (this.geolocationType$) {
      this.geolocationType$.unsubscribe();
    }
  }

  public getGeolocationRegion(): void {
    this.geoLocationService.triggerGeolocation(true);
  }
}
