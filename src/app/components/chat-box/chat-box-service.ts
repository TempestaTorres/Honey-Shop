import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ChatBoxService {

  public chatBoxOpen$: BehaviorSubject<boolean>;

  constructor() {
    this.chatBoxOpen$ = new BehaviorSubject(false);
  }

  public openChatBox(): void {
    this.chatBoxOpen$.next(true);
  }
  public closeChatBox(): void {
    this.chatBoxOpen$.next(false);
  }
}
