import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MegaMenu } from './components/mega-menu/mega-menu';
import { ModalGeolocation } from './components/modal-geolocation/modal-geolocation';
import { InstagramFeedModal } from './components/instagram-feed-modal/instagram-feed-modal';
import { LoginAlertModal } from './modals/login-alert-modal/login-alert-modal';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MegaMenu, ModalGeolocation, InstagramFeedModal, LoginAlertModal],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('Honey-Shop');
}
