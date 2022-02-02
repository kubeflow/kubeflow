import { ActionIconValue } from './action-icon-value';
import { ActionButtonValue } from './action-button';

export class ActionListValue {
  constructor(public actions: (ActionIconValue | ActionButtonValue)[]) {}
}

export interface ActionConfig {
  name: string;
  tooltip?: string;
  color: string;
  field?: string;
}
