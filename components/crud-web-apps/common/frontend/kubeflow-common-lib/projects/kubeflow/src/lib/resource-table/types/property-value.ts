import { get as getAttributeValue } from 'lodash';

export interface PropertyConfig {
  field?: string;
  valueFn?: (row: any) => any;
  tooltipField?: string;
  popoverField?: string;
  truncate?: boolean /* if set to true, user needs to define max-width */;
  isLink?: boolean;
  style?: { [prop: string]: string };
}

export class PropertyValue {
  field: string;
  tooltipField: string;
  valueFn?: (row: any) => any;
  popoverField: string;
  truncate: boolean;
  isLink: boolean;
  style: { [prop: string]: string };

  private defaultValues: PropertyConfig = {
    field: '',
    tooltipField: '',
    popoverField: '',
    truncate: false,
    isLink: false,
    style: {},
  };

  constructor(config: PropertyConfig) {
    const {
      field,
      valueFn,
      tooltipField,
      popoverField,
      truncate,
      isLink,
      style,
    } = {
      ...this.defaultValues,
      ...config,
    };
    this.field = field;
    this.valueFn = valueFn;
    this.tooltipField = tooltipField;
    this.popoverField = popoverField;
    this.truncate = truncate;
    this.isLink = isLink;
    this.style = style;
  }

  getClasses() {
    const classes = [];

    if (this.isLink) {
      classes.push('link');
    }

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
