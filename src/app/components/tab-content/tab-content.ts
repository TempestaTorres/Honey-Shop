import { Component, Input } from '@angular/core';
import { HoneyTab, tabTypes } from '../../types/tabs/tab-types';
import { SizeGuideType } from '../size-guide-type/size-guide-type';

@Component({
  selector: 'app-tab-content',
  imports: [SizeGuideType],
  templateUrl: './tab-content.html',
  styleUrl: './tab-content.css',
})
export class TabContent {
  @Input() tabsContent: HoneyTab = { type: '', content: undefined };
  public types = tabTypes;
}
