import { Component, OnDestroy, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from '../header/header';
import { Footer } from '../footer/footer';
import { GeoLocationService } from '../../services/geoloc-service';
import { SiteHeader } from '../../components/site-header/site-header';
import { ChatBox } from '../../components/chat-box/chat-box';
import { InstagramFeedModal } from '../../components/instagram-feed-modal/instagram-feed-modal';
import { LoginAlertModal } from '../../modals/login-alert-modal/login-alert-modal';
import { MegaMenu } from '../../components/mega-menu/mega-menu';
import { MiniCart } from '../../modals/mini-cart/mini-cart';
import { ModalGeolocation } from '../../components/modal-geolocation/modal-geolocation';
import { SearchModal } from '../../modals/search-modal/search-modal';
import { SelectSizeModal } from '../../modals/select-size-modal/select-size-modal';
import { SizeGuideModal } from '../../modals/size-guide-modal/size-guide-modal';
import { WishlistModal } from '../../modals/wishlist-modal/wishlist-modal';

@Component({
  selector: 'app-layout',
  imports: [
    RouterOutlet,
    Header,
    Footer,
    SiteHeader,
    ChatBox,
    InstagramFeedModal,
    LoginAlertModal,
    MegaMenu,
    MiniCart,
    ModalGeolocation,
    SearchModal,
    SelectSizeModal,
    SizeGuideModal,
    WishlistModal,
  ],
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
