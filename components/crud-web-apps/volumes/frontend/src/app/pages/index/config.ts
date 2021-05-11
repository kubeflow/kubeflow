import {
  PropertyValue,
  StatusValue,
  ActionListValue,
  ActionIconValue,
  TRUNCATE_TEXT_SIZE,
  TableConfig,
} from 'kubeflow';

export const tableConfig: TableConfig = {
  title: 'common.volumes',
  newButtonText: 'volume.newVolumeCaps',
  columns: [
    {
      matHeaderCellDef: 'common.status',
      matColumnDef: 'status',
      value: new StatusValue(),
    },
    {
      matHeaderCellDef: 'common.name',
      matColumnDef: 'name',
      value: new PropertyValue({
        field: 'name',
        tooltipField: 'name',
        truncate: TRUNCATE_TEXT_SIZE.SMALL,
      }),
    },
    {
      matHeaderCellDef: 'common.age',
      matColumnDef: 'age',
      value: new PropertyValue({
        field: 'age.uptime',
        tooltipField: 'age.timestamp',
      }),
    },
    {
      matHeaderCellDef: 'common.size',
      matColumnDef: 'size',
      value: new PropertyValue({ field: 'capacity' }),
    },
    {
      matHeaderCellDef: 'volume.accessMode',
      matColumnDef: 'modes',
      value: new PropertyValue({ field: 'modes' }),
    },
    {
      matHeaderCellDef: 'volume.storageClass',
      matColumnDef: 'class',
      value: new PropertyValue({ field: 'class' }),
    },

    // the apps should import the actions they want
  ],
};
