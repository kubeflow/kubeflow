import { Component, Input } from '@angular/core';
import { STATUS_TYPE, Status } from '../resource-table/status/types';

@Component({
  selector: 'lib-status-info',
  templateUrl: './status-info.component.html',
  styleUrls: ['./status-info.component.scss'],
})
export class StatusInfoComponent {
  @Input() status: Status;

  STATUS_TYPE = STATUS_TYPE;
}
