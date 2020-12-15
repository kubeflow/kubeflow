export interface ToolbarButtonConfig {
  icon?: string;
  text: string;
  eventName: string;
  disabled?: boolean;
  color?: string;
}

export class ToolbarButton {
  icon: string;
  text: string;
  eventName: string;
  disabled: boolean;
  color: string;

  private defaults: ToolbarButtonConfig = {
    icon: '',
    text: '',
    eventName: '',
    disabled: false,
    color: 'primary',
  };

  constructor(config: ToolbarButtonConfig) {
    const { icon, text, eventName, disabled, color } = {
      ...this.defaults,
      ...config,
    };

    this.icon = icon;
    this.text = text;
    this.eventName = eventName;
    this.disabled = disabled;
    this.color = color;
  }
}
