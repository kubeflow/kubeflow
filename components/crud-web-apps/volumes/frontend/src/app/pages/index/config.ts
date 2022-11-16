import {
  PropertyValue,
  StatusValue,
  ActionListValue,
  ActionIconValue,
  TableConfig,
  DateTimeValue,
} from 'kubeflow';
import { quantityToScalar } from '@kubernetes/client-node/dist/util';

export const tableConfig: TableConfig = {
  columns: [
    {
      matHeaderCellDef: $localize`Status`,
      matColumnDef: 'status',
      style: { width: '1%' },
      value: new StatusValue(),
      sort: true,
    },
    {
      matHeaderCellDef: $localize`Name`,
      matColumnDef: 'name',
      style: { width: '25%' },
      value: new PropertyValue({
        field: 'name',
        tooltipField: 'name',
        truncate: true,
      }),
      sort: true,
    },
    {
      matHeaderCellDef: $localize`Created at`,
      matColumnDef: 'age',
      textAlignment: 'right',
      style: { width: '10%' },
      value: new DateTimeValue({
        field: 'age',
      }),
      sort: true,
    },
    {
      matHeaderCellDef: $localize`Size`,
      matColumnDef: 'size',
      textAlignment: 'right',
      style: { width: '10%' },
      value: new PropertyValue({ field: 'capacity', truncate: true }),
      sort: true,
      sortingPreprocessorFn: quantityToScalar,
    },
    {
      matHeaderCellDef: $localize`Access Mode`,
      matColumnDef: 'modes',
      style: { width: '15%' },
      value: new PropertyValue({ field: 'modes', truncate: true }),
      sort: true,
    },
    {
      matHeaderCellDef: $localize`Storage Class`,
      matColumnDef: 'class',
      style: { width: '10%' },
      value: new PropertyValue({ field: 'class', truncate: true }),
      sort: true,
    },

    // the apps should import the actions they want
  ],
};
