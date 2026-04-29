import { Component, OnDestroy, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from '../header/header';
import { Footer } from '../footer/footer';
import { GeoLocationService } from '../../services/geoloc-service';
import { SiteHeader } from '../../components/site-header/site-header';

@Component({
  selector: 'app-layout',
  imports: [RouterOutlet, Header, Footer, SiteHeader],
  templateUrl: './layout.html',
})
export class Layout implements OnInit, OnDestroy {
  constructor(private geolocation$: GeoLocationService) {}

  ngOnInit() {
    this.geolocation$.setCurrentLocation();
  }
  ngOnDestroy() {
    this.geolocation$.removeGeolocation();
  }
}
