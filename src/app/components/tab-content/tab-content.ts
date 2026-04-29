import { Component, Input } from '@angular/core';
import { HoneyTab, tabTypes } from '../../types/tabs/tab-types';

@Component({
  selector: 'app-tab-content',
  imports: [],
  templateUrl: './tab-content.html',
  styleUrl: './tab-content.css',
})
export class TabContent {

  @Input()tabsContent: HoneyTab = {type: '', content: undefined};
  public types = tabTypes;
}
