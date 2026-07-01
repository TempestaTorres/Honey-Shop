import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, signal, ViewChild } from '@angular/core';
import { GeoLocationService } from '../../services/geoloc-service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PhotonService } from '../../services/photon-service';
import { Subscription } from 'rxjs';
import { FeaturesType } from '../../types/geoloc-types';
import * as L from 'leaflet';
import 'leaflet-defaulticon-compatibility';
//import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css';
import { ScrollingService } from '../../services/scrolling-service';

@Component({
  selector: 'app-boutique-finder',
  imports: [ReactiveFormsModule],
  templateUrl: './boutique-finder.html',
  styleUrl: './boutique-finder.css',
})
export class BoutiqueFinder implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('mapContainer', { static: true }) mapContainer!: ElementRef;
  @ViewChild('stockResults', { static: true }) stockResults!: ElementRef;
  @ViewChild('autocomplete', { static: true }) autocomplete!: ElementRef;

  //private unsafeUrl: string = '//www.openstreetmap.org/export/embed.html?bbox=';
  //public safeUrl!: SafeResourceUrl;

  public inputFocused = signal(false);
  public fieldTouched = signal(false);

  public usePoweredBy = signal(false);

  public suggestions: FeaturesType[] = [];

  public queryForm: FormGroup = new FormGroup({
    search: new FormControl('', Validators.required),
  });

  private userLat: number = 0;
  private userLong: number = 0;
  private currentAccuracy = 0;
  private map!: L.Map;
  private userMarker?: L.Marker;
  private resultMarker?: L.Marker;
  private accuracyCircle?: L.Circle;

  private photonSubscriptions: Subscription = new Subscription();

  //inject private sanitizer: DomSanitizer, if we use iframe map
  constructor(
    private geolocation$: GeoLocationService,
    private photon: PhotonService,
    private scrollingService: ScrollingService,
  ) {}

  ngOnInit() {

    this.scrollingService.toTop();

    let coords: { longitude: number; latitude: number } | null = this.geolocation$.getGeolocation();

    if (coords !== null) {
      this.userLong = coords.longitude;
      this.userLat = coords.latitude;


    }

    /* For iframe map
    <iframe [src]="safeUrl" frameborder="0" width="640" height="480" marginwidth="0" scrolling="no"></iframe>
    let mapUrl: string | null = this.geolocation$.getCurrentLocation();
    if (mapUrl !== null) {
      this.safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(mapUrl);
    } else {
      this.safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.unsafeUrl);
    }
     */
  }

  ngAfterViewInit() {

    this.initMap();
  }

  ngOnDestroy() {
    this.photonSubscriptions.unsubscribe();
    if (this.map) this.map.remove();
  }

  private initMap(): void {
    this.map = L.map(this.mapContainer.nativeElement, {
      center: [this.userLat, this.userLong],
      zoom: 14,
      zoomControl: true
    });

    // OpenStreetMap tiles
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors',
      maxZoom: 19
    }).addTo(this.map);

    // Show user position
    this.updateUserMarker(this.userLat, this.userLong, 'Your approximate location');
  }

  private updateUserMarker(lat: number, lon: number, popupText: string = 'You are here', accuracy?: number): void {
    this.userLat = lat;
    this.userLong = lon;
    if (accuracy !== undefined) this.currentAccuracy = accuracy;

    const popupContent = popupText.includes('<br>')
      ? popupText
      : `<b>${popupText}</b>`;

    if (this.userMarker) {
      this.userMarker.setLatLng([lat, lon]);
      this.userMarker.setPopupContent(popupContent);

    } else {
      this.userMarker = L.marker([lat, lon], { title: 'Your location', riseOnHover: true })
        .addTo(this.map)
        .bindPopup(popupContent, {
          closeButton: true,
          autoClose: false,     // optional: prevent closing when clicking elsewhere
          closeOnClick: false   // optional
        });
    }

    // === Accuracy Circle Logic ===
    if (accuracy && accuracy > 0) {
      if (this.accuracyCircle) {
        this.accuracyCircle.setLatLng([lat, lon]);
        this.accuracyCircle.setRadius(accuracy);
      } else {
        this.accuracyCircle = L.circle([lat, lon], {
          radius: accuracy,
          color: '#3388ff',        // blue border
          fillColor: '#3388ff',    // blue fill
          fillOpacity: 0.15,       // translucent
          weight: 2,
          opacity: 0.6
        }).addTo(this.map);
      }
    } else if (this.accuracyCircle) {
      // Remove circle if we have no accuracy (fallback position)
      this.map.removeLayer(this.accuracyCircle);
      this.accuracyCircle = undefined;
    }
    // Open immediately after adding to map
    setTimeout(() => {
      this.userMarker?.openPopup();
    }, 100);
    // Optional: gently fly to the new position
    this.map.flyTo([lat, lon], 15, { duration: 1.2, easeLinearity: 0.25 });
  }

  public onSearchSubmit(): void {

    if (this.queryForm.status === 'VALID') {

      this.stockResults.nativeElement.classList.add('loading');
      console.log(this.queryForm.value.search);

      setTimeout(() => {
        this.stockResults.nativeElement.classList.remove('loading');
      }, 1000);
    }
  }

  useMyLocation(): void {

    if (!navigator.geolocation) {
      alert('Geolocation is not supported by your browser.');
      return;
    }
    this.stockResults.nativeElement.classList.add('loading');

      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude, accuracy } = position.coords;

          this.updateUserMarker(latitude, longitude,
            `You are here<br>Accuracy: ~${Math.round(accuracy)} meters`
          , accuracy);

          // Re-trigger search with new coordinates (optional)
          if (this.queryForm.value.search.length > 0) {
            this.queryForm.setValue({
              search: "",
            });
          }
          this.stockResults.nativeElement.classList.remove('loading');
        },
        (error) => {
          let message = 'Unable to get your location.';
          switch (error.code) {
            case error.PERMISSION_DENIED:
              message = 'Location access was denied.';
              break;
            case error.POSITION_UNAVAILABLE:
              message = 'Location information is unavailable.';
              break;
            case error.TIMEOUT:
              message = 'Location request timed out.';
              break;
          }
          this.stockResults.nativeElement.classList.remove('loading');
          alert(message);
          console.error('Geolocation error:', error);
        },
        {
          enableHighAccuracy: true,   // Use GPS if available
          timeout: 10000,             // 10 seconds
          maximumAge: 60000           // Accept cached position up to 1 minute old
        }
      );
  }

  public onFocus(): void {
    this.inputFocused.set(true);

    if (this.suggestions.length > 0 && !this.autocomplete.nativeElement.classList.contains('active')) {
      this.autocomplete.nativeElement.classList.add('active');
    }
  }

  public onBlur(): void {
    this.inputFocused.set(false);
    this.autocomplete.nativeElement.classList.remove('active');
  }

  public onInputChange(): void {
    this.fieldTouched.update(value => this.queryForm.value.search !== '' && this.queryForm.value.search.length > 3);

    if (this.fieldTouched()) {
      const sub = this.photon
        .search(this.queryForm.value.search, this.userLat, this.userLong)
        .subscribe((result) => {
          this.suggestions = this.photon.getSuggestions(result);

          if (this.suggestions.length > 1 && !this.autocomplete.nativeElement.classList.contains('active')) {
            this.autocomplete.nativeElement.classList.add('active');
          }

        });

      this.photonSubscriptions.add(sub);

    } else {
      this.suggestions = [];
      this.autocomplete.nativeElement.classList.remove('active');
    }
  }

  public selectSuggestion(index: number): void {

    this.stockResults.nativeElement.classList.add('loading');

    setTimeout(() => {
      this.stockResults.nativeElement.classList.remove('loading');

      for (let i: number = 0; i < this.suggestions.length; i++) {
        this.suggestions[i].selected = i === index;
      }

      let value: string = this.photon.toString(this.suggestions[index]);

      this.queryForm.setValue({
        search: value,
      });

      // Remove previous result marker
      if (this.resultMarker) {
        this.map.removeLayer(this.resultMarker);
      }

      if (this.suggestions[index].coordinates) {

        const lon = this.suggestions[index].coordinates[0];
        const lat = this.suggestions[index].coordinates[1];

        // Add new marker and fly to location
        this.setMarker(lat, lon, value, this.suggestions[index].street)

      }
    }, 1000);

  }

  private setMarker(lat: number, lon: number,value: string, name: string | undefined): void {
    this.resultMarker = L.marker([lat, lon])
      .addTo(this.map)
      .bindPopup(`
        <b>${name || 'Place'}</b><br>
        ${value}
      `)
      .openPopup();

    this.map.flyTo([lat, lon], 16, {
      duration: 1.2
    });
  }

  public clear(): void {
    this.queryForm.patchValue({
      search: '',
    });
    this.fieldTouched.set(false);
    this.autocomplete.nativeElement.classList.remove('active');
    this.suggestions = [];
  }
}
