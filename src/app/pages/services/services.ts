import { Component, OnInit } from '@angular/core';
import { ScrollingService } from '../../services/scrolling-service';

@Component({
  selector: 'app-services',
  imports: [],
  templateUrl: './services.html',
  styleUrl: './services.css',
})
export class Services implements OnInit {

  constructor(private scrollingService: ScrollingService) {
  }
  ngOnInit() {
    this.scrollingService.toTop();
  }
}
