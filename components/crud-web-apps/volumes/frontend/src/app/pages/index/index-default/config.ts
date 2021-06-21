import {
  ActionListValue,
  ActionIconValue,
  TableColumn,
  TableConfig,
} from 'kubeflow';
import { tableConfig } from '../config';

const actionsCol: TableColumn = {
  matHeaderCellDef: '',
  matColumnDef: 'actions',
  value: new ActionListValue([
    new ActionIconValue({
      name: 'delete',
      tooltip: 'volume.index.deleteVolume',
      color: 'warn',
      field: 'deleteAction',
      iconReady: 'material:delete',
    }),
  ]),
};

export const defaultConfig: TableConfig = {
  title: tableConfig.title,
  newButtonText: tableConfig.newButtonText,
  columns: tableConfig.columns.concat(actionsCol),
};
