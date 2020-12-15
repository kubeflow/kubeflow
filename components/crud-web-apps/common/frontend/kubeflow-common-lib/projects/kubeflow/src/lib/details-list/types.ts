export type ListValueType = 'string' | 'chip-list';
export type ListValue = string | number | ChipDescriptor[] | any;

export interface ChipDescriptor {
  value: any;
  color: any;
  tooltip?: string;
}

export interface ListEntry {
  key: string;
  value?: ListValue;
  icon?: string;
  keyTooltip?: string;
  valueTooltip?: string;
  chipsList?: ChipDescriptor[];
  topDivider?: boolean;
  bottomDivider?: boolean;
  copyValue?: any;
  keyMinWidth?: string;
}
