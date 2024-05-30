import {
  PropertyValue,
  StatusValue,
  ActionListValue,
  ActionIconValue,
  ActionButtonValue,
  TableColumn,
  TableConfig,
  DateTimeValue,
  DialogConfig,
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
      tooltip: $localize`Connect to the Tensorboard Server`,
      color: 'primary',
      field: 'connectAction',
      text: $localize`CONNECT`,
    }),
    new ActionIconValue({
      name: 'start-stop',
      tooltipInit: $localize`Stop this Tensorboard server`,
      tooltipReady: $localize`Start this Tensorboard server`,
      color: '',
      field: 'startStopAction',
      iconInit: 'material:stop',
      iconReady: 'material:play_arrow',
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

export function getStopDialogConfig(name: string): DialogConfig {
  return {
    title: $localize`Are you sure you want to stop this tensorboard? ${name}`,
    message: $localize`Warning: Your data might be lost if the tensorboard
                       is not backed by persistent storage.`,
    accept: $localize`STOP`,
    confirmColor: 'primary',
    cancel: $localize`CANCEL`,
    error: '',
    applying: $localize`STOPPING`,
    width: '600px',
  };
}
