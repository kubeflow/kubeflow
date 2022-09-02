import {
  PropertyValue,
  StatusValue,
  ActionListValue,
  ActionIconValue,
  TRUNCATE_TEXT_SIZE,
  TableConfig,
} from 'kubeflow';

export const tableConfig: TableConfig = {
  title: $localize`Volumes`,
  newButtonText: $localize`NEW VOLUME`,
  columns: [
    {
      matHeaderCellDef: $localize`Status`,
      matColumnDef: 'status',
      value: new StatusValue(),
    },
    {
      matHeaderCellDef: $localize`Name`,
      matColumnDef: 'name',
      value: new PropertyValue({
        field: 'name',
        tooltipField: 'name',
        truncate: TRUNCATE_TEXT_SIZE.SMALL,
      }),
    },
    {
      matHeaderCellDef: $localize`Age`,
      matColumnDef: 'age',
      value: new PropertyValue({
        field: 'age.uptime',
        tooltipField: 'age.timestamp',
      }),
    },
    {
      matHeaderCellDef: $localize`Size`,
      matColumnDef: 'size',
      value: new PropertyValue({ field: 'capacity' }),
    },
    {
      matHeaderCellDef: $localize`Access Mode`,
      matColumnDef: 'modes',
      value: new PropertyValue({ field: 'modes' }),
    },
    {
      matHeaderCellDef: $localize`Storage Class`,
      matColumnDef: 'class',
      value: new PropertyValue({ field: 'class' }),
    },

    // the apps should import the actions they want
  ],
};
