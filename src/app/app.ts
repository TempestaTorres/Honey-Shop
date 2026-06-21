import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MegaMenu } from './components/mega-menu/mega-menu';
import { ModalGeolocation } from './components/modal-geolocation/modal-geolocation';
import { InstagramFeedModal } from './components/instagram-feed-modal/instagram-feed-modal';
import { LoginAlertModal } from './modals/login-alert-modal/login-alert-modal';
import { SelectSizeModal } from './modals/select-size-modal/select-size-modal';
import { MiniCart } from './modals/mini-cart/mini-cart';
import { SizeGuideModal } from './modals/size-guide-modal/size-guide-modal';
import { SearchModal } from './modals/search-modal/search-modal';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    MegaMenu,
    ModalGeolocation,
    InstagramFeedModal,
    LoginAlertModal,
    SelectSizeModal,
    MiniCart,
    SizeGuideModal,
    SearchModal,
  ],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('Honey-Shop');
}
