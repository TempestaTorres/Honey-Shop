import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { catchError, debounceTime, map, Observable, of } from 'rxjs';
import { FeaturesType } from '../types/geoloc-types';

export interface ReverseResult {
  country: string | null;
  city: string | null;
  state: string | null;
  fullAddress: string | null;
  name: string | null;
  feature: any;
}

@Injectable({
  providedIn: 'root',
})
export class PhotonService {
  private readonly API_URL = 'https://photon.komoot.io/api/';
  private readonly REVERSE_URL = 'https://photon.komoot.io/reverse';

  constructor(private http: HttpClient) {}

  search(query: string, lat: number, lon: number, limit = 8, zoom = 14): Observable<any> {
    if (!query || query.length < 3) return new Observable((sub) => sub.next({ features: [] }));

    const params = new HttpParams()
      .set('q', query)
      .set('lat', lat.toString())
      .set('lon', lon.toString())
      .set('limit', limit.toString())
      .set('zoom', zoom.toString())
      .set('lang', 'en');

    return this.http.get<any>(this.API_URL, { params }).pipe(
      debounceTime(500),
      map((resp) => resp.features),
    );
  }

  public getCountry(lat: number, lon: number): Observable<string | null> {

    const params = new HttpParams()
      .set('lat', lat.toString())
      .set('lon', lon.toString())
      .set('limit', '1')           // We only need the closest result
      .set('lang', 'en');          // Optional: you can change or remove this

    // Use the correct reverse endpoint
    return this.http.get<any>(this.REVERSE_URL, { params }).pipe(
      map((response: any) => {
        const feature = response?.features?.[0];
        if (!feature?.properties) return null;

        // Photon returns country in properties.country
        return feature.properties.country || null;
      }),
      catchError((err) => {
        console.error('Reverse geocoding error:', err);
        return of(null);
      })
    );
  }

  public getCountryCode(lat: number, lon: number): Observable<string | null> {

    const params = new HttpParams()
      .set('lat', lat.toString())
      .set('lon', lon.toString())
      .set('limit', '1')           // We only need the closest result
      .set('lang', 'en');          // Optional: you can change or remove this

    // Use the correct reverse endpoint
    return this.http.get<any>(this.REVERSE_URL, { params }).pipe(
      map((response: any) => {
        const feature = response?.features?.[0];
        if (!feature?.properties) return null;

        // Photon returns country in properties.country
        return feature.properties.countrycode || null;
      }),
      catchError((err) => {
        console.error('Reverse geocoding error:', err);
        return of(null);
      })
    );
  }

  public reverseGeocode(lat: number, lon: number): Observable<ReverseResult | null> {
    const params = new HttpParams()
      .set('lat', lat.toString())
      .set('lon', lon.toString())
      .set('limit', '1')
      .set('lang', 'en');   // change to user language if needed

    return this.http.get<any>(this.REVERSE_URL, { params }).pipe(
      map((response: any) => {
        const feature = response?.features?.[0];
        if (!feature?.properties) return null;

        const p = feature.properties;
        const fullAddress = [
          p.name,
          p.housenumber && p.street ? `${p.housenumber} ${p.street}`.trim() : p.street,
          p.postcode,
          p.city || p.county,
          p.state,
          p.country
        ].filter(Boolean).join(', ');

        return {
          country: p.country || null,
          city: p.city || p.county || null,
          state: p.state || null,
          fullAddress: fullAddress || null,
          name: p.name || null,
          feature: feature
        };
      }),
      catchError(err => {
        console.error('Reverse geocoding failed:', err);
        return of(null);
      })
    );
  }

  public toString(suggestion: FeaturesType): string {
    return [
      suggestion.city ? suggestion.city : false,
      suggestion.country ? suggestion.country : false,
      suggestion.district ? suggestion.district : false,
      suggestion.county ? suggestion.county : false,
      suggestion.state ? suggestion.state : false,
      suggestion.street ? suggestion.street : false,
    ]
      .filter(Boolean)
      .join(', ');
  }

  public getSuggestions(features: any[]): FeaturesType[] {
    let result: FeaturesType[] = [];

    if (Array.isArray(features) && features.length > 0) {
      for (let feature of features) {
        let suggestion: FeaturesType = {};

        suggestion.city = feature.properties.city || '';
        suggestion.country = feature.properties.country || '';
        suggestion.countrycode = feature.properties.countrycode || '';
        suggestion.county = feature.properties.county || '';
        suggestion.district = feature.properties.district || '';
        suggestion.state = feature.properties.state || '';
        suggestion.housenumber = feature.properties.housenumber || '';
        suggestion.postcode = feature.properties.postcode || '';
        suggestion.street = '';

        if (
          feature.properties.type &&
          (feature.properties.type === 'street' || feature.properties.type === 'other')
        ) {
          suggestion.street = feature.properties.name || '';
        }

        if (feature.properties.type && feature.properties.type === 'house') {
          suggestion.street = feature.properties.street || '';
        }

        suggestion.coordinates = [];
        suggestion.coordinates[0] = feature.geometry.coordinates[0] || 0;
        suggestion.coordinates[1] = feature.geometry.coordinates[1] || 0;

        suggestion.selected = false;

        result.push(suggestion);
      }
    }

    return result;
  }
}
