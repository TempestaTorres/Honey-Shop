import { Component, OnInit } from '@angular/core';
import { ScrollingService } from '../../services/scrolling-service';

@Component({
  selector: 'app-size-guide',
  imports: [],
  templateUrl: './size-guide.html',
  styleUrl: './size-guide.css',
})
export class SizeGuide implements OnInit {

  constructor(private scrollingService: ScrollingService) {
  }
  ngOnInit() {
    this.scrollingService.toTop();
  }
}
