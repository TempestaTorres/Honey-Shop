import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MegaMenu } from './components/mega-menu/mega-menu';
import { ModalGeolocation } from './components/modal-geolocation/modal-geolocation';
import { InstagramFeedModal } from './components/instagram-feed-modal/instagram-feed-modal';
import { LoginAlertModal } from './modals/login-alert-modal/login-alert-modal';
import { SelectSizeModal } from './modals/select-size-modal/select-size-modal';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    MegaMenu,
    ModalGeolocation,
    InstagramFeedModal,
    LoginAlertModal,
    SelectSizeModal,
  ],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('Honey-Shop');
}
