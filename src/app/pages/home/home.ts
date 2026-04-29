import { Component, OnInit } from '@angular/core';
import { ScrollingService } from '../../services/scrolling-service';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit {



  constructor(private scrollingService: ScrollingService) {
  }

  ngOnInit() {
    this.scrollingService.toTop();
  }
}
