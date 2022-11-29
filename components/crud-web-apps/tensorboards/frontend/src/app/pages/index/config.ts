import {
  PropertyValue,
  StatusValue,
  ActionListValue,
  ActionIconValue,
  ActionButtonValue,
  TableColumn,
  TableConfig,
  DateTimeValue,
} from 'kubeflow';

const tableConfig: TableConfig = {
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
      style: { width: '15%' },
      textAlignment: 'right',
      value: new DateTimeValue({
        field: 'age',
      }),
      sort: true,
    },
    {
      matHeaderCellDef: $localize`Logspath`,
      matColumnDef: 'logspath',
      style: { width: '40%%' },
      value: new PropertyValue({
        field: 'logspath',
        tooltipField: 'logspath',
        truncate: true,
      }),
      sort: true,
    },
  ],
};

const actionsCol: TableColumn = {
  matHeaderCellDef: '',
  matColumnDef: 'actions',
  value: new ActionListValue([
    new ActionButtonValue({
      name: 'connect',
      tooltip: $localize`Connect to the Tensorboaard Server`,
      color: 'primary',
      field: 'connectAction',
      text: $localize`CONNECT`,
    }),
    new ActionIconValue({
      name: 'delete',
      tooltip: $localize`Delete Tensorboard`,
      color: 'warn',
      field: 'deleteAction',
      iconReady: 'material:delete',
    }),
  ]),
};

export const defaultConfig: TableConfig = {
  title: tableConfig.title,
  dynamicNamespaceColumn: true,
  newButtonText: tableConfig.newButtonText,
  columns: tableConfig.columns.concat(actionsCol),
};
