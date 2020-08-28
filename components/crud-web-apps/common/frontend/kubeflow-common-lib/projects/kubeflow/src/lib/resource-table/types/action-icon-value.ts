import { ActionConfig } from './action';

export interface ActionIconConfig extends ActionConfig {
  iconInit?: string;
  iconReady: string;
}

export class ActionIconValue {
  name: string;
  tooltip: string;
  color: string;
  field: string;
  iconInit: string;
  iconReady: string;

  private defaultValues: ActionIconConfig = {
    name: '',
    tooltip: '',
    color: '',
    field: '',
    iconInit: '',
    iconReady: '',
  };

  constructor(config: ActionIconConfig) {
    const { name, tooltip, color, field, iconInit, iconReady } = {
      ...this.defaultValues,
      ...config,
    };

    this.name = name;
    this.tooltip = tooltip;
    this.color = color;
    this.field = field;
    this.iconInit = iconInit;
    this.iconReady = iconReady;

    if (iconInit === '') {
      this.iconInit = iconReady;
    }
  }
}
