import { get as getAttributeValue } from 'lodash';
import { STATUS_TYPE, Status } from '../status/types';

export interface StatusConfig {
  field?: string;
  valueFn?: (row: any) => Status;
  fieldPhase?: string;
  fieldMessage?: string;
  fieldState?: string;
  fieldKey?:string;
}

export class StatusValue {
  field: string;
  fieldPhase: string;
  valueFn: (row: any) => Status;
  fieldMessage: string;
  fieldState: string;
  fieldKey:string;

  private defaultValues: StatusConfig = {
    field: 'status',
    fieldPhase: '',
    fieldMessage: '',
    fieldState: '',
    fieldKey:'',
  };

  constructor(config: StatusConfig = {}) {
    const { field, valueFn, fieldPhase, fieldMessage, fieldState, fieldKey } = {
      ...this.defaultValues,
      ...config,
    };
    this.field = field;
    this.valueFn = valueFn;
    this.fieldPhase = fieldPhase;
    this.fieldMessage = fieldMessage;
    this.fieldState = fieldState;
    this.fieldKey = fieldKey;
  }

  getPhase(row: any) {
    if (this.valueFn) {
      return this.valueFn(row).phase;
    }

    if (!this.fieldPhase) {
      return getAttributeValue(row, this.field + '.phase');
    }

    return getAttributeValue(row, this.fieldPhase);
  }

  getState(row: any) {
    if (this.valueFn) {
      return this.valueFn(row).state;
    }

    if (!this.fieldPhase) {
      return getAttributeValue(row, this.field + '.state');
    }

    return getAttributeValue(row, this.fieldState);
  }

  getMessage(row: any) {
    if (this.valueFn) {
      return this.valueFn(row).message;
    }

    if (!this.fieldPhase) {
      return getAttributeValue(row, this.field + '.message');
    }

    return getAttributeValue(row, this.fieldMessage);
  }

  getKey(row: any) {
    if (this.valueFn) {
      return this.valueFn(row).key;
    }

    if (!this.fieldPhase) {
      return getAttributeValue(row, this.field + '.key');
    }

    return getAttributeValue(row, this.fieldKey);
  }

  public getIcon(row: any) { 
    switch (this.getPhase(row)) {
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

  public getCssClasses(row: any): string[] {
    return [this.getPhase(row), 'status'];
  }
  // The key is the string for the message
  public getTooltip(row: any) {
    return this.getKey(row);
  }
}
