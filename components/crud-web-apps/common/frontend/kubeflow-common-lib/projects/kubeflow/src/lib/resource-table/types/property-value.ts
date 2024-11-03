import { get as getAttributeValue } from 'lodash-es';

export interface PropertyConfig {
  field?: string;
  valueFn?: (row: any) => any;
  tooltipField?: string;
  popoverField?: string;
  truncate?: boolean /* if set to true, user needs to define max-width */;
  style?: { [prop: string]: string };
}

export class PropertyValue {
  field: string;
  tooltipField: string;
  valueFn?: (row: any) => any;
  popoverField: string;
  truncate: boolean;
  style: { [prop: string]: string };

  private defaultValues: PropertyConfig = {
    field: '',
    tooltipField: '',
    popoverField: '',
    truncate: false,
    style: {},
  };

  constructor(config: PropertyConfig) {
    const { field, valueFn, tooltipField, popoverField, truncate, style } = {
      ...this.defaultValues,
      ...config,
    };
    this.field = field;
    this.valueFn = valueFn;
    this.tooltipField = tooltipField;
    this.popoverField = popoverField;
    this.truncate = truncate;
    this.style = style;
  }

  getClasses() {
    const classes = [];

    if (!this.truncate) {
      return classes;
    }

    classes.push('truncate');
    return classes;
  }

  getTooltip(row: any) {
    if (this.tooltipField.length === 0) {
      return '';
    }

    return getAttributeValue(row, this.tooltipField);
  }

  getPopover(row: any) {
    if (this.popoverField.length === 0) {
      return '';
    }

    return getAttributeValue(row, this.popoverField);
  }

  getValue(row: any) {
    if (this.valueFn) {
      return this.valueFn(row);
    }

    return getAttributeValue(row, this.field);
  }
}
