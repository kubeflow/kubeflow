import { Component, Input } from '@angular/core';
import { STATUS_TYPE } from '../resource-table/status/types';

@Component({
  selector: 'lib-status-icon',
  templateUrl: './status-icon.component.html',
  styleUrls: ['./status-icon.component.scss'],
})
export class StatusIconComponent {
  @Input() phase: STATUS_TYPE;

  STATUS_TYPE = STATUS_TYPE;

  get statusIcon(): string {
    switch (this.phase) {
      case STATUS_TYPE.READY: {
        return 'check_circle';
      }
      case STATUS_TYPE.WARNING: {
        return 'warning';
      }
      case STATUS_TYPE.UNAVAILABLE: {
        return 'timelapse';
      }
      case STATUS_TYPE.ERROR: {
        return 'error';
      }
      default: {
        return 'warning';
      }
    }
  }
}
