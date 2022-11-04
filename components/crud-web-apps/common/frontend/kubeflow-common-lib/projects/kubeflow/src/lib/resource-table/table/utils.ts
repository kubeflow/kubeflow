import { PropertyValue, TableColumn, TableConfig } from '../types';

export function createNamespaceColumn(field: string): TableColumn {
  return {
    matHeaderCellDef: $localize`Namespace`,
    matColumnDef: 'namespace',
    style: { width: '20%' },
    value: new PropertyValue({
      field,
      tooltipField: 'namespace',
      truncate: true,
    }),
  };
}

export function removeColumn(config: TableConfig, name: string) {
  const index = findColumnIndex(config, name);

  if (index !== -1) {
    config.columns.splice(index, 1);
  }
}

export function addColumn(
  config: TableConfig,
  column: TableColumn,
  after: string,
) {
  const index = findColumnIndex(config, after);

  if (index !== -1) {
    config.columns.splice(index + 1, 0, column);
  }
}

function findColumnIndex(config: TableConfig, name: string) {
  return config.columns.findIndex(col => col.matColumnDef === name);
}
