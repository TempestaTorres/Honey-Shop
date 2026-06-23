import { Component, DestroyRef, OnInit, signal, WritableSignal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PopUp } from '../../components/pop-up/pop-up';
import { PopUpService } from '../../components/pop-up/pop-up-service';

@Component({
  selector: 'app-sign-in',
  imports: [RouterLink, PopUp],
  templateUrl: './sign-in.html',
  styleUrl: './sign-in.css',
})
export class SignIn implements OnInit {
  public authBannerUrl: string =
    '--global-auth-image: url("/assets/images/categories/new/NEW_44.jpg");';

  public popUpType: WritableSignal<string> = signal<string>('privacy policy');

  constructor(private destroyRef: DestroyRef, private popupService: PopUpService) {
    this.destroyRef.onDestroy(() => {
      document.body.classList.remove('auth-kit');
    });
  }

  ngOnInit(): void {
    document.body.classList.add('auth-kit');
  }

  public openPopup(): void {
    this.popupService.popUpOpen(this.popUpType());
  }
}
