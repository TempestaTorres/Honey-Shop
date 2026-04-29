import { Injectable } from '@angular/core';
import { GeoLocationType } from '../types/geoloc-types';
import { geoLocData } from '../data/geoloc-data';
import { BehaviorSubject, Observable } from 'rxjs';
import { WaGeolocationService } from '@ng-web-apis/geolocation';

@Injectable({
  providedIn: 'root',
})
export class GeoLocationService {

  private unsafeUrl: string = '//www.openstreetmap.org/export/embed.html?bbox=';
  private mapKey: string = 'location';
  private longKey: string = 'longitude';
  private latKey: string = 'latitude';
  private mapUrl: string | null = null;
  private currentRegion: number = 0;
  public currentLocation;
  public openGeolocation;

  constructor(private geolocation$: WaGeolocationService) {
    this.currentLocation = new BehaviorSubject<GeoLocationType>(geoLocData[this.currentRegion]);
    this.openGeolocation = new BehaviorSubject<boolean>(false);
  }

  public triggerGeolocation(state: boolean): void {

    this.openGeolocation.next(state);
  }

  public setCurrentLocation(): void {

    this.mapUrl = localStorage.getItem(this.mapKey);

    if (this.mapUrl === null) {
      this.geolocation$.subscribe(param => {

        let mapUrl: string = this.getMapUrl(param.coords.longitude, param.coords.latitude);
        localStorage.setItem(this.mapKey, mapUrl);
        localStorage.setItem(this.longKey, String(param.coords.longitude));
        localStorage.setItem(this.latKey, String(param.coords.latitude));

        const region: string = this.getRegion(param.coords.latitude, param.coords.longitude);

        if (region !== 'Other') {
          this.updateLocation(this.getRegionIndex(region));
        }
      });
    }
    else {
      let position = this.getGeolocation();
      if (position !== null) {
        const region: string = this.getRegion(position.latitude, position.longitude);

        if (region !== 'Other') {
          this.updateLocation(this.getRegionIndex(region));
        }
      }
    }
  }

  private getRegionIndex(name: string): number {

    let region = this.currentRegion;

    for (let i: number = 0; i < geoLocData.length; i++) {
      if (geoLocData[i].name === name) {
        return i;
      }
    }
    return region;
  }

  public getGeolocation(): {longitude: number, latitude: number} | null {
    let lon: string | null = localStorage.getItem(this.longKey);
    let lat: string | null = localStorage.getItem(this.latKey);
    if (lat !== null && lon !== null) {
      let longitude: number = parseFloat(lon);
      let latitude: number = parseFloat(lat);

      return {longitude: longitude, latitude: latitude};
    }
    return null;
  }


  private isInEurope(lat: number, lon: number): boolean {
    // Rough but reliable bounding box for Europe (includes European part of Russia, Turkey, etc.)
    return (
      lat >= 35 && lat <= 71 &&           // Latitude range
      lon >= -25 && lon <= 45             // Longitude range (covers from Iceland to Ural mountains)
    );
  }

  private isInUnitedStates(lat: number, lon: number): boolean {
    // Continental US + Alaska + Hawaii
    const inContinentalUS = lat >= 24.5 && lat <= 49.5 && lon >= -125 && lon <= -66.9;
    const inAlaska = lat >= 51 && lat <= 72 && lon >= -180 && lon <= -129;
    const inHawaii = lat >= 18.9 && lat <= 22.3 && lon >= -160.5 && lon <= -154.5;

    return inContinentalUS || inAlaska || inHawaii;
  }

  private getRegion(lat: number, lon: number): string {
    if (this.isInEurope(lat, lon)) return 'Europe';
    if (this.isInUnitedStates(lat, lon)) return 'United States';
    return 'Other';
  }

  private getRegionFromCountry(country: string | null): string {
    if (!country) return 'Other';

    const europeCountries = [
      'Germany', 'France', 'Italy', 'Spain', 'United Kingdom', 'Netherlands', 'Estonia'
    ];
    const usNames = ['United States', 'USA', 'United States of America'];

    if (usNames.includes(country)) return 'United States';
    if (europeCountries.some(ec => country.includes(ec))) return 'Europe';

    return 'Other';
  }

  public removeGeolocation(): void {
    localStorage.removeItem(this.mapKey);
    localStorage.removeItem(this.longKey);
    localStorage.removeItem(this.latKey);
  }

  private getMapUrl(longitude: number, latitude: number): string {
    let lat2 = latitude + 0.00506445418025;
    let lon2 = longitude + 0.00506445418025;
    return this.unsafeUrl + `${longitude},${latitude},${lon2},${lat2}&marker=${latitude},${longitude}&layer=mapnik`;
  }

  public updateLocation(locationIndex: number): void {
    this.currentRegion = locationIndex;
    this.currentLocation.next(geoLocData[this.currentRegion]);
  }

  public getGeoLocations(): Observable<GeoLocationType[]> {
    return new Observable<GeoLocationType[]>(observer => {
      observer.next(geoLocData);
    });
  }
}
