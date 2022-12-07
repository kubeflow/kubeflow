import { PropertyValue, TableConfig, DateTimeValue } from 'kubeflow';

// --- Config for the Resource Table ---
export const defaultConfig: TableConfig = {
  dynamicNamespaceColumn: true,
  columns: [
    {
      matHeaderCellDef: $localize`Type`,
      matColumnDef: 'type',
      style: { width: '12%' },
      value: new PropertyValue({
        field: 'type',
        tooltipField: 'type',
        truncate: true,
      }),
      sort: true,
    },
    {
      matHeaderCellDef: $localize`Reason`,
      matColumnDef: 'reason',
      style: { width: '12%' },
      value: new PropertyValue({
        field: 'reason',
        tooltipField: 'reason',
        truncate: true,
      }),
      sort: true,
    },
    {
      matHeaderCellDef: $localize`Created at`,
      matColumnDef: 'age',
      style: { width: '12%' },
      value: new DateTimeValue({ field: 'metadata.creationTimestamp' }),
      sort: true,
    },
    {
      matHeaderCellDef: $localize`Message`,
      matColumnDef: 'message',
      value: new PropertyValue({
        field: 'message',
        tooltipField: 'message',
        truncate: true,
      }),
      sort: true,
    },
  ],
};
