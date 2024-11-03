import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { STATUS_TYPE } from '../status/types';
import { Observable, Subject } from 'rxjs';
import { ActionIconValue, ActionEvent } from '../types';
import { get as getAttributeValue } from 'lodash-es';

@Component({
  selector: 'lib-action',
  templateUrl: './action.component.html',
  styleUrls: ['./action.component.scss'],
})
export class ActionComponent implements OnInit {
  // READY: Button will be enabled
  // WAITING: Button will be a Spinner
  // TERMINATING/UNAVAILABLE: Button will be disabled

  private innerData: any = {};
  private clicked = false;
  private cancelWaitingPhase$ = new Subject<boolean>();

  @Input()
  action: ActionIconValue;

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

  // Helpers for handling the Tooltips
  get tooltipInit() {
    if (this.action.tooltip && this.action.tooltip.length > 0) {
      return this.action.tooltip;
    }

    return this.action.tooltipInit;
  }

  get tooltipReady() {
    if (this.action.tooltip && this.action.tooltip.length > 0) {
      return this.action.tooltip;
    }

    return this.action.tooltipReady;
  }

  // Icon handling functions
  public getIcon(icon: string) {
    if (icon.split(':').length !== 2) {
      return '';
    }

    if (this.getCategory(icon) === 'fa') {
      const inpt = icon.split(':');
      return inpt.slice(1, inpt.length);
    }

    return icon.split(':')[1];
  }

  public getCategory(icon) {
    if (icon.split(':').length !== 2) {
      return '';
    }

    return icon.split(':')[0];
  }

  // Helpers for checking the Action's State
  public isPhaseReady(): boolean {
    return this.status === STATUS_TYPE.READY;
  }

  public isPhaseInit(): boolean {
    return this.status === STATUS_TYPE.UNINITIALIZED;
  }

  public isPhaseWaiting(): boolean {
    return this.status === STATUS_TYPE.WAITING;
  }

  public isPhaseDisabled(): boolean {
    return (
      this.status === STATUS_TYPE.TERMINATING ||
      this.status === STATUS_TYPE.UNAVAILABLE
    );
  }

  get status(): STATUS_TYPE {
    const phaseField = this.action.field;

    if (!phaseField) {
      return STATUS_TYPE.READY;
    }

    const status = getAttributeValue(this.data, phaseField);
    return status;
  }
}
