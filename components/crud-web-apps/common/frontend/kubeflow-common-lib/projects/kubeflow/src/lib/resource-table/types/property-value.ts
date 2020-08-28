import { get as getAttributeValue } from 'lodash';

// Single Text field
export enum TRUNCATE_TEXT_SIZE {
  NO_TRUNCATE = 'none',
  SMALL = 'text-small',
  MEDIUM = 'text-medium',
  LARGE = 'text-large',
}

export interface PropertyConfig {
  field: string;
  tooltipField?: string;
  truncate?: TRUNCATE_TEXT_SIZE;
}

export class PropertyValue {
  field: string;
  tooltipField: string;
  truncate: TRUNCATE_TEXT_SIZE;

  private defaultValues: PropertyConfig = {
    field: '',
    tooltipField: '',
    truncate: TRUNCATE_TEXT_SIZE.NO_TRUNCATE,
  };

  constructor(config: PropertyConfig) {
    const { field, tooltipField, truncate } = {
      ...this.defaultValues,
      ...config,
    };
    this.field = field;
    this.tooltipField = tooltipField;
    this.truncate = truncate;
  }

  getClasses() {
    if (this.truncate === TRUNCATE_TEXT_SIZE.NO_TRUNCATE) {
      return [];
    }

    return ['truncate', this.truncate];
  }

  getTooltip(row: any) {
    if (this.tooltipField.length === 0) {
      return '';
    }

    return getAttributeValue(row, this.tooltipField);
  }

  getValue(row: any) {
    return getAttributeValue(row, this.field);
  }
}
