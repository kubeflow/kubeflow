import { get as getAttributeValue } from 'lodash-es';

export enum LinkType {
  Internal = 'internal',
  External = 'external',
}

export interface LinkConfig {
  field: string;
  valueFn?: (row: any) => any;
  tooltipField?: string;
  popoverField?: string;
  truncate?: boolean /* if set to true, user needs to define max-width */;
  style?: { [prop: string]: string };
  linkType: LinkType;
}

export class LinkValue {
  field: string;
  valueFn?: (row: any) => any;
  tooltipField: string;
  popoverField: string;
  truncate: boolean;
  style: { [prop: string]: string };
  linkType: LinkType;

  private defaultValues: LinkConfig = {
    field: '',
    tooltipField: '',
    popoverField: '',
    truncate: false,
    style: {},
    linkType: LinkType.Internal,
  };

  constructor(config: LinkConfig) {
    const {
      field,
      valueFn,
      tooltipField,
      popoverField,
      truncate,
      style,
      linkType,
    } = {
      ...this.defaultValues,
      ...config,
    };
    this.field = field;
    this.valueFn = valueFn;
    this.tooltipField = tooltipField;
    this.popoverField = popoverField;
    this.truncate = truncate;
    this.style = style;
    this.linkType = linkType;
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

    return getAttributeValue(row, this.field).text;
  }

  getUrl(row: any) {
    return getAttributeValue(row, this.field).url;
  }

  getQueryParams(row: any) {
    return getAttributeValue(row, this.field)?.queryParams;
  }
}
