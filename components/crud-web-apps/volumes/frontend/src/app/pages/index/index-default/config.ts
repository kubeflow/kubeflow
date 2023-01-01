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
      name: 'open-viewer',
      tooltip: 'Browse',
      color: 'primary',
      field: 'openViewerAction',
      iconInit: 'material:folder',
      iconReady: 'custom:folderSearch',
    }),
    new ActionIconValue({
      name: 'close-viewer',
      tooltip: 'Close Viewer',
      color: 'warn',
      field: 'closeViewerAction',
      iconReady: 'material:close',
    }),
    new ActionIconValue({
      name: 'delete',
      tooltip: $localize`Delete Volume`,
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
