import { Component, OnInit } from '@angular/core';
import { ScrollingService } from '../../services/scrolling-service';

@Component({
  selector: 'app-our-story',
  imports: [],
  templateUrl: './our-story.html',
  styleUrl: './our-story.css',
})
export class OurStory implements OnInit {
  constructor(
    private scrollingService: ScrollingService,
  ) {}

  ngOnInit() {
    this.scrollingService.toTop();
  }

}
