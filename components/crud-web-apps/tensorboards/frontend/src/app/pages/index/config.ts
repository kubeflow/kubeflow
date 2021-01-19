import {
  PropertyValue,
  StatusValue,
  ActionListValue,
  ActionIconValue,
  ActionButtonValue,
  TableColumn,
  TRUNCATE_TEXT_SIZE,
  TableConfig,
} from 'kubeflow';

const tableConfig: TableConfig = {
  title: 'Tensorboards',
  newButtonText: 'NEW TENSORBOARD',
  columns: [
    {
      matHeaderCellDef: 'Status',
      matColumnDef: 'status',
      value: new StatusValue(),
    },
    {
      matHeaderCellDef: 'Name',
      matColumnDef: 'name',
      value: new PropertyValue({
        field: 'name',
        tooltipField: 'name',
        truncate: TRUNCATE_TEXT_SIZE.SMALL,
      }),
    },
    {
      matHeaderCellDef: 'Logspath',
      matColumnDef: 'logspath',
      value: new PropertyValue({
        field: 'logspath',
        tooltipField: 'logspath',
        truncate: TRUNCATE_TEXT_SIZE.SMALL,
      }),
    },
    {
      matHeaderCellDef: 'Age',
      matColumnDef: 'age',
      value: new PropertyValue({
        field: 'age.uptime',
        tooltipField: 'age.timestamp',
      }),
    },
  ],
};

const actionsCol: TableColumn = {
  matHeaderCellDef: '',
  matColumnDef: 'actions',
  value: new ActionListValue([
    new ActionButtonValue({
      name: 'connect',
      tooltip: 'Connect to the Tensorboaard Server',
      color: 'primary',
      field: 'connectAction',
      text: 'CONNECT',
    }),
    new ActionIconValue({
      name: 'delete',
      tooltip: 'Delete Tensorboard',
      color: 'warn',
      field: 'deleteAction',
      iconReady: 'material:delete',
    }),
  ]),
};

export const defaultConfig = {
  title: tableConfig.title,
  newButtonText: tableConfig.newButtonText,
  columns: tableConfig.columns.concat(actionsCol),
};
