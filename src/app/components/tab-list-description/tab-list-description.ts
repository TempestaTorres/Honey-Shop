import { Component, effect, EventEmitter, input, Output, signal, WritableSignal } from '@angular/core';

@Component({
  selector: 'app-tab-list-description',
  imports: [],
  templateUrl: './tab-list-description.html',
})
export class TabListDescription {
  @Output() navigate: EventEmitter<string> = new EventEmitter<string>();

  index = input.required<string>();
  public tabIndex: WritableSignal<number> = signal<number>(-1);
  public titles: string[] = [
    "features", "care", "shipping & returns"
  ];

  public fReadMore: WritableSignal<boolean> = signal<boolean>(false);
  public fReadMoreTitle: WritableSignal<string> = signal<string>('Read More');

  constructor() {
    effect(() => {
      let i: string = this.index();
      let currentIndex: number = parseInt(i);
      this.tabIndex.set(currentIndex - 1);
    });
  }

  public tabClick(index: number): void {
    this.tabIndex.set(index);
  }

  public readMore(index: number): void {

    if (index === 0) {
      this.fReadMore.update(value => !value);

      if (this.fReadMore()) {
        this.fReadMoreTitle.set("Read Less");
      }
      else {
        this.fReadMoreTitle.set("Read More");
      }
    }
  }
  public navigateTo(url: string): void {
    this.navigate.emit(url);
  }
}
