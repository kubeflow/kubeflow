import { PropertyValue } from './property-value';
import { StatusValue } from './status';
import { ActionListValue } from './action';
import { ActionIconValue } from './action-icon-value';

export interface TableColumn {
  matHeaderCellDef: string;
  matColumnDef: string;
  value: PropertyValue | StatusValue | ActionListValue | ActionIconValue;
}

export interface TableConfig {
  columns: TableColumn[];
  newButtonText: string;
  title: string;
}

// Event type that will be emitted each time a button is pressed on the UI
export class ActionEvent {
  action: string;
  data: any;

  constructor(action, data) {
    this.action = action;
    this.data = data;
  }
}
