import { get as getAttributeValue } from 'lodash';

// Single Text field
export enum TRUNCATE_TEXT_SIZE {
  NO_TRUNCATE = 'none',
  SMALL = 'text-small',
  MEDIUM = 'text-medium',
  LARGE = 'text-large',
}

export interface PropertyConfig {
  field?: string;
  valueFn?: (row: any) => any;
  tooltipField?: string;
  popoverField?: string;
  truncate?: TRUNCATE_TEXT_SIZE;
  isLink?: boolean;
}

export class PropertyValue {
  field: string;
  tooltipField: string;
  valueFn?: (row: any) => any;
  popoverField: string;
  truncate: TRUNCATE_TEXT_SIZE;
  isLink: boolean;

  private defaultValues: PropertyConfig = {
    field: '',
    tooltipField: '',
    popoverField: '',
    truncate: TRUNCATE_TEXT_SIZE.NO_TRUNCATE,
    isLink: false,
  };

  constructor(config: PropertyConfig) {
    const { field, valueFn, tooltipField, popoverField, truncate, isLink } = {
      ...this.defaultValues,
      ...config,
    };
    this.field = field;
    this.valueFn = valueFn;
    this.tooltipField = tooltipField;
    this.popoverField = popoverField;
    this.truncate = truncate;
    this.isLink = isLink;
  }

  getClasses() {
    const classes = [];

    if (this.isLink) {
      classes.push('link');
    }

    if (this.truncate === TRUNCATE_TEXT_SIZE.NO_TRUNCATE) {
      return classes;
    }

    classes.push(...['truncate', this.truncate]);
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
