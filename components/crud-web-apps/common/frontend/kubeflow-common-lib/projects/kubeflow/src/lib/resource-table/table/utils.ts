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

export function formatBytes(bytes, si = false, decimals = 1) {
  const thresh = si ? 1000 : 1024;

  if (Math.abs(bytes) < thresh) {
    return bytes + ' B';
  }

  const units = si
    ? ['kB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
    : ['Ki', 'Mi', 'Gi', 'Ti', 'Pi', 'Ei', 'Zi', 'Yi'];
  let u = -1;
  const r = 10 ** decimals;

  do {
    bytes /= thresh;
    ++u;
  } while (
    Math.round(Math.abs(bytes) * r) / r >= thresh &&
    u < units.length - 1
  );

  return bytes.toFixed(decimals) + ' ' + units[u];
}