import { afterNextRender, Component, signal, WritableSignal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../products/products-service';
import { CollectionShowCase } from '../../components/collection-show-case/collection-show-case';

@Component({
  selector: 'app-search',
  imports: [CollectionShowCase],
  templateUrl: './search.html',
  styleUrl: './search.css',
})
export class Search {
  public query: WritableSignal<string> = signal<string>('');

  constructor(
    private route: ActivatedRoute,
    private productsService: ProductsService,
  ) {
    afterNextRender(() => {
      this.route.queryParams.subscribe((params) => {
        if (params['search']) {
          this.query.set(params['search']);
        } else {
          this.query.set('');
        }
      });
    });
  }
}
