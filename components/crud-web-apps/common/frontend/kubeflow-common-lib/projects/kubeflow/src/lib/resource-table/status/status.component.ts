import { Component, Input } from '@angular/core';
import { StatusValue } from '../types';

@Component({
  selector: 'lib-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.scss'],
})
export class StatusComponent {
  @Input() row: any;
  @Input() config: StatusValue;
}
