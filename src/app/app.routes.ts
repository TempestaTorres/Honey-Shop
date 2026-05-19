import { Routes } from '@angular/router';
import { Layout } from './layout/layout/layout';
import { Home } from './pages/home/home';
import { BoutiqueFinder } from './pages/boutique-finder/boutique-finder';
import { Collections } from './pages/collections/collections';
import { OnlineGiftVoucher } from './pages/online-gift-voucher/online-gift-voucher';
import { TheHoneyClub } from './pages/the-honey-club/the-honey-club';
import { Services } from './pages/services/services';
import { TermsConditions } from './pages/terms-conditions/terms-conditions';
import { PrivacyPolicy } from './pages/privacy-policy/privacy-policy';
import { ShippingDelivery } from './pages/shipping-delivery/shipping-delivery';
import { ReturnsExchanges } from './pages/returns-exchanges/returns-exchanges';
import { ContactUs } from './pages/contact-us/contact-us';
import { SizeGuide } from './pages/size-guide/size-guide';
import { Sustainability } from './pages/sustainability/sustainability';
import { Faqs } from './pages/faqs/faqs';
import { OurStory } from './pages/our-story/our-story';
import { JoinHoney } from './pages/join-honey/join-honey';
import { Products } from './pages/products/products';
import { BridalEdit } from './pages/bridal-edit/bridal-edit';
import { BookReturn } from './pages/book-return/book-return';
import { Cart } from './pages/cart/cart';
import { SignUp } from './pages/sign-up/sign-up';
import { SignIn } from './pages/sign-in/sign-in';
import { Wishlist } from './pages/wishlist/wishlist';

export const routes: Routes = [
  {
    path: '',
    component: Layout,
    children: [
      {path: '', component: Home},
      {path: 'boutique-finder', component: BoutiqueFinder},
      {path: 'collections/:category', component: Collections},
      {path: 'online-gift-voucher', component: OnlineGiftVoucher},
      {path: 'the-honey-club', component: TheHoneyClub},
      {path: 'terms-conditions', component: TermsConditions},
      {path: 'privacy-policy', component: PrivacyPolicy},
      {path: 'shipping-delivery', component: ShippingDelivery},
      {path: 'returns-exchanges', component: ReturnsExchanges},
      {path: 'contact-us', component: ContactUs},
      {path: 'size-guide', component: SizeGuide},
      {path: 'sustainability', component: Sustainability},
      {path: 'our-story', component: OurStory},
      {path: 'faqs', component: Faqs},
      {path: 'products/:item', component: Products},
      {path: 'bridal-edit', component: BridalEdit},
      {path: 'book-return', component: BookReturn},
      {path: 'cart', component: Cart},
      {path: 'wishlist', component: Wishlist},
      {path: 'sign-up', component: SignUp},
      {path: 'sign-in', component: SignIn},
    ]
  },
  {path: 'services', component: Services},
  {path: 'join-honey', component: JoinHoney},
];
