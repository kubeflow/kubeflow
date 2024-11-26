import { ChipDescriptor } from '../../details-list/types';
import { get as getAttributeValue } from 'lodash-es';

export interface ChipsListConfig {
  field?: string;
  valueFn?: (row: any) => ChipDescriptor[];
  maxVisibleChips?: number;
  noValueText: string;
}

export class ChipsListValue {
  field: string;
  valueFn: (row: any) => ChipDescriptor[];
  maxVisibleChips: number;
  noValueText: string;

  private defaultValues: ChipsListConfig = {
    field: '',
    noValueText: 'No items',
    maxVisibleChips: 3,
  };

  constructor(config: ChipsListConfig) {
    const { field, valueFn, noValueText, maxVisibleChips } = {
      ...this.defaultValues,
      ...config,
    };
    this.field = field;
    this.valueFn = valueFn;
    this.noValueText = noValueText;
    this.maxVisibleChips = maxVisibleChips;
  }

  getChips(row: any) {
    if (this.valueFn) {
      return this.valueFn(row);
    }

    return getAttributeValue(row, this.field);
  }
}
