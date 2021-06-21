import {
  PropertyValue,
  StatusValue,
  ActionListValue,
  ActionIconValue,
  ActionButtonValue,
  TableColumn,
  TRUNCATE_TEXT_SIZE,
  TableConfig,
  DateTimeValue,
} from 'kubeflow';

const tableConfig: TableConfig = {
  title: 'tensorboard.tensorboards',
  newButtonText: 'tensorboard.newTensorboardCaps',
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
      value: new DateTimeValue({
        field: 'age',
      }),
    },
    {
      matHeaderCellDef: 'tensorboard.logspath',
      matColumnDef: 'logspath',
      value: new PropertyValue({
        field: 'logspath',
        tooltipField: 'logspath',
        truncate: TRUNCATE_TEXT_SIZE.SMALL,
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
      tooltip: 'tensorboard.index.connectTensorboard',
      color: 'primary',
      field: 'connectAction',
      text: 'common.connectCaps',
    }),
    new ActionIconValue({
      name: 'delete',
      tooltip: 'tensorboard.index.deleteTensorboard',
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
