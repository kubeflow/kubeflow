import {
  PropertyValue,
  TableConfig,
} from 'kubeflow';

export const tableConfig: TableConfig = {
  columns: [
    {
      matHeaderCellDef: $localize`Name`,
      matColumnDef: 'name',
      style: { width: '15%' },
      value: new PropertyValue({
        field: 'name',
        tooltipField: 'name',
        truncate: true,
      }),
    },
    {
      matHeaderCellDef: $localize`storage`,
      matColumnDef: 'storage',
      textAlignment: 'left',
      style: { width: '15%' },
      value: new PropertyValue({ field: 'storage', truncate: true }),
    },
    {
      matHeaderCellDef: $localize`bucket`,
      matColumnDef: 'bucket',
      textAlignment: 'left',
      style: { width: '15%' },
      value: new PropertyValue({ field: 'bucket', truncate: true }),
    },
    {
      matHeaderCellDef: $localize`Created`,
      matColumnDef: 'create',
      textAlignment: 'left',
      style: { width: '10%' },
      value: new PropertyValue({
        field: 'age.uptime',
        tooltipField: 'age.timestamp',
      }),
    },

    // the apps should import the actions they want
  ],
};
