import { Component, Input, HostBinding } from '@angular/core';

@Component({
  selector: 'lib-heading-row',
  templateUrl: './heading-subheading-row.component.html',
  styleUrls: ['./heading-subheading-row.component.scss'],
})
export class HeadingSubheadingRowComponent {
  @Input() heading: string;
  @Input() subHeading: string;
  @Input() tooltip: string;

  @HostBinding('class.lib-heading-row') selfClass = true;
}
