import { Component, OnInit } from '@angular/core';
import { ScrollingService } from '../../services/scrolling-service';
import { IntersectingService } from '../../services/intersecting-service';

@Component({
  selector: 'app-our-story',
  imports: [],
  templateUrl: './our-story.html',
  styleUrl: './our-story.css',
})
export class OurStory implements OnInit {
  constructor(
    private scrollingService: ScrollingService,
    private intersectingService: IntersectingService,
  ) {}

  ngOnInit() {
    this.scrollingService.toTop();
  }

  public isIntersecting(status: boolean, element: HTMLElement) {
    this.intersectingService.isIntersecting(status, element);
  }
}
