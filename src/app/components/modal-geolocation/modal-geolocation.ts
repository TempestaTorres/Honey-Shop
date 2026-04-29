import {
  Component,
  OnDestroy,
  OnInit, signal
} from '@angular/core';
import { GeoLocationService } from '../../services/geoloc-service';
import { Subscription } from 'rxjs';
import { GeoLocationType } from '../../types/geoloc-types';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Router } from '@angular/router';

@Component({
  selector: 'app-modal-geolocation',
  imports: [],
  templateUrl: './modal-geolocation.html',
  styleUrl: './modal-geolocation.css',
})
export class ModalGeolocation implements OnInit, OnDestroy {

  protected open = signal(false);
  private geolocation$: Subscription | undefined;
  private geolocations$: Subscription | undefined;
  private geolocationTrigger$: Subscription | undefined;

  public countryName: string = '';
  public country!: SafeHtml;
  public countryLocations: GeoLocationType[] = [];
  public safeHtml: SafeHtml[] = [];

  constructor(
    private geoLocationService: GeoLocationService,
    private sanitizer: DomSanitizer,
    private router: Router,
  ) {}

  ngOnInit(): void {

    this.geolocationTrigger$ = this.geoLocationService.openGeolocation.subscribe(state => {
      this.open.set(state);
    });

    this.geolocation$ = this.geoLocationService.currentLocation.subscribe({
      next: (event: GeoLocationType) => {
        this.countryName = event.name;
        this.country = this.sanitizer.bypassSecurityTrustHtml(event.country);
      },
    });

    this.geolocations$ = this.geoLocationService.getGeoLocations().subscribe((locations) => {
      this.countryLocations = locations;

      for (let i: number = 0, len: number = locations.length; i < len; i++) {
        this.safeHtml[i] = this.sanitizer.bypassSecurityTrustHtml(this.countryLocations[i].country);
      }
    });
  }

  ngOnDestroy() {
    if (this.geolocation$) {
      this.geolocation$.unsubscribe();
    }
    if (this.geolocations$) {
      this.geolocations$.unsubscribe();
    }
    if (this.geolocationTrigger$) {
      this.geolocationTrigger$.unsubscribe();
    }
  }

  public changeGeoLocation(index: number): void {
    this.geoLocationService.updateLocation(index);
  }

  public modalClose(): void {
    this.geoLocationService.triggerGeolocation(false);
  }

  public boutiqueFinderClick(): void {
    this.modalClose();

    setTimeout(() => {
      this.router.navigate(['/boutique-finder']).then(() => {});
    }, 500);
  }
}
