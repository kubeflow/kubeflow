import { ActionConfig } from './action';

export interface ActionIconConfig extends ActionConfig {
  tooltipInit?: string;
  tooltipReady?: string;
  iconInit?: string;
  iconReady: string;
}

export class ActionIconValue {
  name: string;
  tooltip: string;
  tooltipInit: string;
  tooltipReady: string;
  color: string;
  field: string;
  iconInit: string;
  iconReady: string;

  private defaultValues: ActionIconConfig = {
    name: '',
    tooltip: '',
    tooltipInit: '',
    tooltipReady: '',
    color: '',
    field: '',
    iconInit: '',
    iconReady: '',
  };

  constructor(config: ActionIconConfig) {
    const {
      name,
      tooltip,
      tooltipInit,
      tooltipReady,
      color,
      field,
      iconInit,
      iconReady,
    } = {
      ...this.defaultValues,
      ...config,
    };

    this.name = name;
    this.tooltip = tooltip;
    this.tooltipInit = tooltipInit;
    this.tooltipReady = tooltipReady;
    this.color = color;
    this.field = field;
    this.iconInit = iconInit;
    this.iconReady = iconReady;

    if (iconInit === '') {
      this.iconInit = iconReady;
    }

    if (tooltip) {
      this.tooltipInit = tooltip;
      this.tooltipReady = tooltip;
    }
  }
}
