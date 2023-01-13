import { get as getAttributeValue } from 'lodash';
import { formatBytes, quantityToScalar } from '../table/utils';

export interface MemoryConfig {
  field: string;
}

export class MemoryValue {
  field: string;

  private defaultValues: MemoryConfig = {
    field: '',
  };

  constructor(config: MemoryConfig) {
    const { field } = { ...this.defaultValues, ...config };
    this.field = field;
  }

  getValue(row: any) {
    const rowValue = getAttributeValue(row, this.field);
    const valueToBytes = quantityToScalar(rowValue);

    return valueToBytes;
  }

  getViewValue(row: any) {
    const valueToBytes = this.getValue(row);
    const formattedValue = formatBytes(Number(valueToBytes));

    return formattedValue;
  }
}
