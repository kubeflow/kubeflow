import {
  ActionListValue,
  ActionIconValue,
  TableColumn,
  TableConfig,
  ComponentValue,
} from 'kubeflow';
import { tableConfig } from '../config';
import { DeleteButtonComponent } from '../columns/delete-button/delete-button.component';

const browseCol: TableColumn = {
  matHeaderCellDef: '',
  matColumnDef: 'browse',
  style: { 'padding-right': '0' },
  value: new ActionListValue([
    new ActionIconValue({
      name: 'edit',
      tooltip: 'Browse',
      color: 'primary',
      field: 'editAction',
      iconInit: 'material:folder',
      iconReady: 'custom:folderSearch',
    }),
  ]),
};

const customDeleteCol: TableColumn = {
  matHeaderCellDef: ' ',
  matColumnDef: 'customDelete',
  style: { width: '40px', 'padding-left': '0' },
  value: new ComponentValue({
    component: DeleteButtonComponent,
  }),
};

export const rokConfig: TableConfig = {
  title: tableConfig.title,
  dynamicNamespaceColumn: true,
  newButtonText: tableConfig.newButtonText,
  columns: tableConfig.columns.concat([browseCol, customDeleteCol]),
};
