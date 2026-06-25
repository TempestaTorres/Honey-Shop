import { Component, signal, WritableSignal } from '@angular/core';
import { PopUpService } from '../../components/pop-up/pop-up-service';
import { PopUp } from '../../components/pop-up/pop-up';

@Component({
  selector: 'app-account-footer',
  imports: [PopUp],
  templateUrl: './account-footer.html',
  styleUrl: './account-footer.css',
})
export class AccountFooter {
  public popUpType: WritableSignal<string> = signal<string>('');

  constructor(private popupService: PopUpService) {}

  public openPopup(type: string): void {
    this.popUpType.set(type);

    requestAnimationFrame(() => {
      this.popupService.popUpOpen(type);
    });
  }
}
