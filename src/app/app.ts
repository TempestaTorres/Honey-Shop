import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MegaMenu } from './components/mega-menu/mega-menu';
import { ModalGeolocation } from './components/modal-geolocation/modal-geolocation';
import { InstagramFeedModal } from './components/instagram-feed-modal/instagram-feed-modal';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MegaMenu, ModalGeolocation, InstagramFeedModal],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('Honey-Shop');
}
