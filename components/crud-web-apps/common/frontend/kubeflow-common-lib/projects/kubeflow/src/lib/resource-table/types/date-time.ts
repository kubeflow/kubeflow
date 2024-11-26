import { get as getAttributeValue } from 'lodash-es';

export interface DateTimeConfig {
  field: string;
}

export class DateTimeValue {
  field: string;

  private defaultValues: DateTimeConfig = {
    field: '',
  };

  constructor(config: DateTimeConfig) {
    const { field } = { ...this.defaultValues, ...config };
    this.field = field;
  }

  getValue(row: any) {
    return getAttributeValue(row, this.field);
  }
}
