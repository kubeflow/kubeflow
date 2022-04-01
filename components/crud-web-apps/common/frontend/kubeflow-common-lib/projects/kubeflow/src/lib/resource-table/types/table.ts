import { PropertyValue } from './property-value';
import { StatusValue } from './status';
import { ActionListValue } from './action';
import { ActionIconValue } from './action-icon-value';
import { DateTimeValue } from './date-time';
import { TemplateValue } from './template';
import { ChipsListValue } from './chip-list';
import { ComponentValue } from './component-value';
import { MenuValue } from './menu-value';

export type TextAlignment = 'left' | 'right';

export interface TableColumn {
  matHeaderCellDef: string;
  matColumnDef: string;
  value:
    | PropertyValue
    | StatusValue
    | ActionListValue
    | ActionIconValue
    | DateTimeValue
    | MenuValue
    | ChipsListValue
    | ComponentValue
    | TemplateValue;
  textAlignment?: TextAlignment;
  style?: { [prop: string]: string };
  sort?: boolean;
  sortingPreprocessorFn?: (prop: any) => any;
  filteringPreprocessorFn?: (prop: any) => any;
}

export interface TableConfig {
  columns: TableColumn[];
  title?: string;
  newButtonText?: string;
  width?: string;
  theme?: TABLE_THEME;
  dynamicNamespaceColumn?: boolean;
}

export enum TABLE_THEME {
  CARD = 'card',
  FLAT = 'flat',
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
