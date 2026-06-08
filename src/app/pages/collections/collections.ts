import { Component, OnInit, signal, WritableSignal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ScrollingService } from '../../services/scrolling-service';
import { CollectionsHeader } from '../../components/collections-header/collections-header';
import { CollectionShowCase } from '../../components/collection-show-case/collection-show-case';
import { ProductCarousel } from '../../components/product-carousel/product-carousel';

@Component({
  selector: 'app-collections',
  imports: [CollectionsHeader, CollectionShowCase, ProductCarousel],
  templateUrl: './collections.html',
  styleUrl: './collections.css',
})
export class Collections implements OnInit {
  public collectionType: WritableSignal<string> = signal<string>('');

  constructor(
    private activatedRoute: ActivatedRoute,
    private scrollingService: ScrollingService,
  ) {}

  ngOnInit() {
    this.scrollingService.toTop();

    this.activatedRoute.params.subscribe((params) => {
      if (params['type']) {
        let type: string = params['type'];

        if (type && type !== '') {
          this.scrollingService.toTop();
          this.collectionType.set(type);
        }
      }
    });
  }
}
