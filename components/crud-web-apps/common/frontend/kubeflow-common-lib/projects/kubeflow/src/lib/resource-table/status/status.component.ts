import { Component, OnInit, Input } from '@angular/core';
import { Status, STATUS_TYPE } from './types';

@Component({
  selector: 'lib-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.scss'],
})
export class StatusComponent implements OnInit {
  @Input() status: Status;
  STATUS_TYPE = STATUS_TYPE;

  constructor() {}

  ngOnInit() {}

  public getCssClasses(): string[] {
    if (this.noStatus()) {
      return [STATUS_TYPE.WARNING, 'status'];
    }

    return [this.status.phase, 'status'];
  }

  public getTooltip(): string {
    if (this.noStatus()) {
      return 'No status was sent from the backend';
    }

    return this.status.message;
  }

  public getIcon() {
    switch (this.status.phase) {
      case STATUS_TYPE.READY: {
        return 'check_circle';
      }
      case STATUS_TYPE.READY: {
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

  public noStatus(): boolean {
    return typeof this.status === 'undefined';
  }
}
