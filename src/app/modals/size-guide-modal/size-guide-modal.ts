import { Component, OnDestroy, OnInit, signal, WritableSignal } from '@angular/core';
import { Subscription } from 'rxjs';
import { HoneyTabGuideSizes, SizeGuideService } from './size-guide-service';
import { TabList } from '../../components/tab-list/tab-list';
import { ChatBoxService } from '../../components/chat-box/chat-box-service';
import { Router } from '@angular/router';
import { ObserveElementDirective } from '../../directives/scroll-observer';
import { IntersectingService } from '../../services/intersecting-service';

@Component({
  selector: 'app-size-guide-modal',
  imports: [TabList, ObserveElementDirective],
  templateUrl: './size-guide-modal.html',
  styleUrl: './size-guide-modal.css',
})
export class SizeGuideModal implements OnInit, OnDestroy {
  public openType: WritableSignal<string> = signal<string>('size guide modal');
  public open: WritableSignal<boolean> = signal<boolean>(false);
  public sizes: WritableSignal<HoneyTabGuideSizes | null> = signal<HoneyTabGuideSizes | null>(null);

  private subscription: Subscription | undefined;
  private sizeSubscription: Subscription | undefined;

  constructor(
    private sizeGuideService: SizeGuideService,
    private chatboxService$: ChatBoxService,
    private router: Router,
    private intersectingService: IntersectingService,
  ) {}

  ngOnInit(): void {
    this.subscription = this.sizeGuideService.sizeGuideOpen$.subscribe((status) => {
      if (status !== null) {
        this.openType.set(status);

        if (this.sizeSubscription) {
          this.sizeSubscription.unsubscribe();
        }

        this.sizeSubscription = this.sizeGuideService
          .getGuideSizes(status)
          .subscribe((tabSizes) => {
            this.sizes.set(tabSizes);

            setTimeout(() => {
              this.open.set(true);
            }, 400);
          });
      } else {
        this.open.set(false);
        this.sizes.set(status);
        this.openType.set('size guide modal');
      }
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
    if (this.sizeSubscription) {
      this.sizeSubscription.unsubscribe();
    }
  }

  public modalClose(): void {
    this.sizeGuideService.triggerSizeGuide();
  }

  public openChatBox(): void {
    this.chatboxService$.openChatBox();
  }

  public isIntersecting(status: boolean, element: HTMLElement) {
    this.intersectingService.isIntersecting(status, element);
  }

  public navigateTo(url: string) {

    this.modalClose();
    setTimeout(() => {
      this.router.navigate([url]).then(() => {});
    }, 400);
  }
}
