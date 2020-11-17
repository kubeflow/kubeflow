export interface ToolbarButtonConfig {
  icon?: string;
  text: string;
  disabled?: boolean;
  color?: string;
  raised?: boolean;
  stroked?: boolean;
  fn: () => any;
}

export class ToolbarButton {
  icon: string;
  text: string;
  disabled: boolean;
  color: string;
  raised: boolean;
  stroked: boolean;
  fn: () => {};

  private defaults: ToolbarButtonConfig = {
    icon: '',
    text: '',
    disabled: false,
    color: 'primary',
    raised: true,
    fn: () => {},
  };

  constructor(config: ToolbarButtonConfig) {
    const { icon, text, disabled, color, stroked, raised, fn } = {
      ...this.defaults,
      ...config,
    };

    this.icon = icon;
    this.text = text;
    this.disabled = disabled;
    this.color = color;
    this.raised = raised;
    this.fn = fn;

    if (stroked) {
      this.raised = false;
      this.stroked = true;
    }
  }
}
