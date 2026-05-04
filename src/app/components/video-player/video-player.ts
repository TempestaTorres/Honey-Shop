import { afterNextRender, Component, ElementRef, Input, ViewChild } from '@angular/core';

@Component({
  selector: 'app-video-player',
  imports: [],
  templateUrl: './video-player.html',
})
export class VideoPlayer {

  @ViewChild('video') videoPlayer!: ElementRef;

  @Input()url: string = '';

  constructor() {

    afterNextRender(() => {

      let videoPlayer = this.videoPlayer.nativeElement;
      if (videoPlayer) {

        videoPlayer.muted = true;
        videoPlayer.loop = true;
        videoPlayer.autoplay = true;

      }

    });
  }

}
