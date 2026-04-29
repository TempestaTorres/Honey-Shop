import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ScrollingService } from '../../services/scrolling-service';

@Component({
  selector: 'app-collections',
  imports: [],
  templateUrl: './collections.html',
  styleUrl: './collections.css',
})
export class Collections implements OnInit, OnDestroy {

  constructor(private router: Router, private activatedRoute: ActivatedRoute,
              private scrollingService: ScrollingService) { }

  ngOnInit() {

    this.scrollingService.toTop();

    this.activatedRoute.params.subscribe(params => {

      if (params['category']) {
        let category: string = params['category'];

        console.log(category);
      }
    })
  }
  ngOnDestroy() {

  }
}
