import { Component, OnInit } from '@angular/core';
import { ScrollingService } from '../../services/scrolling-service';

@Component({
  selector: 'app-returns-exchanges',
  imports: [],
  templateUrl: './returns-exchanges.html',
  styleUrl: './returns-exchanges.css',
})
export class ReturnsExchanges implements OnInit {

  constructor(private scrollingService: ScrollingService) {
  }

  ngOnInit() {
    this.scrollingService.toTop();
  }
}
