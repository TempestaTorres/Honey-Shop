import { Component, OnInit } from '@angular/core';
import { ScrollingService } from '../../services/scrolling-service';

@Component({
  selector: 'app-sustainability',
  imports: [],
  templateUrl: './sustainability.html',
  styleUrl: './sustainability.css',
})
export class Sustainability implements OnInit {

  constructor(private scrollingService: ScrollingService) {
  }
  ngOnInit() {
    this.scrollingService.toTop();
  }
}
