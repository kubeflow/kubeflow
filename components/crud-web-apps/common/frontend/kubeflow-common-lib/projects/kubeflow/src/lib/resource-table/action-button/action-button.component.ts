import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { STATUS_TYPE } from '../status/types';
import { ActionButtonValue, ActionEvent } from '../types';

@Component({
  selector: 'lib-action-button',
  templateUrl: './action-button.component.html',
  styleUrls: ['./action-button.component.scss'],
})
export class ActionButtonComponent implements OnInit {
  @Input()
  action: ActionButtonValue;

  @Input()
  data: any;

  @Output()
  emitter = new EventEmitter<ActionEvent>();

  constructor() {}

  ngOnInit() {}

  // Event emitting functions
  public emitClickedEvent() {
    const ev = new ActionEvent(this.action.name, this.data);
    this.emitter.emit(ev);
  }

  // Helpers for checking the Action's State
  public isPhaseReady(): boolean {
    const phaseField = this.action.field;
    const status = this.data[phaseField];

    return status === STATUS_TYPE.READY;
  }
}
