import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'lib-content-list-item',
  templateUrl: './content-list-item.component.html',
  styleUrls: ['./content-list-item.component.scss'],
})
export class ContentListItemComponent implements OnInit {
  @Input() key: string;
  @Input() keyTooltip: string;
  @Input() topDivider = false;
  @Input() bottomDivider = true;
  @Input() keyMinWidth = '250px';
  @Input() loadErrorMsg = 'Resources not available';

  constructor() {}

  ngOnInit(): void {}
}
