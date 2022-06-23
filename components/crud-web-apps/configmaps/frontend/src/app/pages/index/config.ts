import {
  PropertyValue,
  StatusValue,
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
      matHeaderCellDef: $localize`Data`,
      matColumnDef: 'data',
      textAlignment: 'left',
      style: { width: '65%' },
      value: new PropertyValue({ 
        field: 'data', 
        valueFn: (rows) => {
          return JSON.stringify((new Map(Object.entries(rows))).get("data"));
        },
        truncate: true }),
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
