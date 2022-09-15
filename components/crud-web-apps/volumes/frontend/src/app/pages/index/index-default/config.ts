import { TableColumn, TableConfig, ComponentValue } from 'kubeflow';
import { tableConfig } from '../config';
import { DeleteButtonComponent } from '../columns/delete-button/delete-button.component';

const customDeleteCol: TableColumn = {
  matHeaderCellDef: '',
  matColumnDef: 'customDelete',
  style: { width: '40px' },
  value: new ComponentValue({
    component: DeleteButtonComponent,
  }),
};

export const defaultConfig: TableConfig = {
  title: tableConfig.title,
  dynamicNamespaceColumn: true,
  newButtonText: tableConfig.newButtonText,
  columns: tableConfig.columns.concat(customDeleteCol),
};
