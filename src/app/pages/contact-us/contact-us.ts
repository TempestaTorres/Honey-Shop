import { Component, OnInit } from '@angular/core';
import { ScrollingService } from '../../services/scrolling-service';

@Component({
  selector: 'app-contact-us',
  imports: [],
  templateUrl: './contact-us.html',
  styleUrl: './contact-us.css',
})
export class ContactUs implements OnInit {

  constructor(private scrollingService: ScrollingService) {
  }
  ngOnInit() {
    this.scrollingService.toTop();
  }
}
