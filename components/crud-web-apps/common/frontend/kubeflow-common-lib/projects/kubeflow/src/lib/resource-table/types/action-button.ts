import { ActionConfig } from './action';

export interface ActionButtonConfig extends ActionConfig {
  text: string;
}

export class ActionButtonValue {
  name: string;
  tooltip: string;
  color: string;
  field: string;
  text: string;

  private defaultValues: ActionButtonConfig = {
    name: '',
    tooltip: '',
    color: '',
    field: '',
    text: '',
  };

  constructor(config: ActionButtonConfig) {
    const { name, tooltip, color, field, text } = {
      ...this.defaultValues,
      ...config,
    };

    this.name = name;
    this.tooltip = tooltip;
    this.color = color;
    this.field = field;
    this.text = text;
  }
}
