import { Component, Input, OnInit } from '@angular/core';
import { STATUS_TYPE } from '../resource-table/status/types';

@Component({
  selector: 'lib-status-icon',
  templateUrl: './status-icon.component.html',
  styleUrls: ['./status-icon.component.scss'],
})
export class StatusIconComponent implements OnInit {
  @Input() status: STATUS_TYPE;
  @Input() stateChanging: boolean;

  get statusIcon(): string {
    if (this.status === STATUS_TYPE.WARNING) {
      return 'warning';
    }
    if (
      this.status === STATUS_TYPE.WAITING ||
      this.status === STATUS_TYPE.TERMINATING
    ) {
      return 'timelapse';
    } else if (this.status === STATUS_TYPE.READY) {
      return 'check_circle';
    } else if (this.status === STATUS_TYPE.STOPPED) {
      return 'stop_circle';
    } else {
      return STATUS_TYPE.UNINITIALIZED;
    }
  }

  constructor() {}

  ngOnInit(): void {}
}
