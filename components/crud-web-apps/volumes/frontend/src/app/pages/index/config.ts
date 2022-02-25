import {
  PropertyValue,
  StatusValue,
  ActionListValue,
  ActionIconValue,
  TableConfig,
  DateTimeValue,
} from 'kubeflow';

export const tableConfig: TableConfig = {
  columns: [
    {
      matHeaderCellDef: $localize`Status`,
      matColumnDef: 'status',
      style: { width: '1%' },
      value: new StatusValue(),
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
    },
    {
      matHeaderCellDef: $localize`Age`,
      matColumnDef: 'age',
      textAlignment: 'right',
      style: { width: '10%' },
      value: new DateTimeValue({
        field: 'age',
      }),
    },
    {
      matHeaderCellDef: $localize`Size`,
      matColumnDef: 'size',
      textAlignment: 'right',
      style: { width: '10%' },
      value: new PropertyValue({ field: 'capacity', truncate: true }),
    },
    {
      matHeaderCellDef: $localize`Access Mode`,
      matColumnDef: 'modes',
      style: { width: '15%' },
      value: new PropertyValue({ field: 'modes', truncate: true }),
    },
    {
      matHeaderCellDef: $localize`Storage Class`,
      matColumnDef: 'class',
      style: { width: '10%' },
      value: new PropertyValue({ field: 'class', truncate: true }),
    },

    // the apps should import the actions they want
  ],
};
