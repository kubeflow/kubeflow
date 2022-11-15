export interface ToolbarButtonConfig {
  icon?: string;
  text: string;
  disabled?: boolean;
  color?: string;
  raised?: boolean;
  stroked?: boolean;
  tooltip?: string;
  fn: () => any;
}

export class ToolbarButton {
  icon: string;
  text: string;
  disabled: boolean;
  color: string;
  raised: boolean;
  stroked: boolean;
  tooltip: string;
  fn: () => any;

  private defaults: ToolbarButtonConfig = {
    icon: '',
    text: '',
    disabled: false,
    color: 'primary',
    raised: true,
    tooltip: '',
    fn: () => {},
  };

  constructor(config: ToolbarButtonConfig) {
    const { icon, text, disabled, color, stroked, raised, tooltip, fn } = {
      ...this.defaults,
      ...config,
    };

    this.icon = icon;
    this.text = text;
    this.disabled = disabled;
    this.color = color;
    this.raised = raised;
    this.tooltip = tooltip;
    this.fn = fn;

    if (stroked) {
      this.raised = false;
      this.stroked = true;
    }
  }

  public namespaceChanged(ns: string | string[], resourceName: string) {
    // enable the button on single namespace
    if (!Array.isArray(ns)) {
      this.disabled = false;
      this.tooltip = '';
      return;
    }

    // all-namespaces was selected
    this.disabled = true;
    this.tooltip = $localize`Select a namespace in which to create a new ${resourceName}.`;
  }
}
