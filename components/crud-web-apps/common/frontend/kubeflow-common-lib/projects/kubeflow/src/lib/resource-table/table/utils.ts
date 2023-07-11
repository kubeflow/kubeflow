import { PropertyValue, TableColumn, TableConfig } from '../types';

export const NAMESPACE_COLUMN: TableColumn = {
  matHeaderCellDef: $localize`Namespace`,
  matColumnDef: 'namespace',
  style: { width: '20%' },
  value: new PropertyValue({
    valueFn: (obj: any) => obj?.namespace || obj?.metadata?.namespace,
    tooltipField: 'namespace',
    truncate: true,
  }),
  sort: true,
};

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
