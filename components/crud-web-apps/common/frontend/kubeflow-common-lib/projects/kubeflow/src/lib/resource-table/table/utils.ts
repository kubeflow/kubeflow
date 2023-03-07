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

export function findSuffix(quantity: string): string {
  let ix = quantity.length - 1;
  while (ix >= 0 && !/[\.0-9]/.test(quantity.charAt(ix))) {
    ix--;
  }
  return ix === -1 ? '' : quantity.substring(ix + 1);
}

export function quantityToScalar(quantity: string): number | bigint {
  if (!quantity) {
    return 0;
  }
  const suffix = findSuffix(quantity);
  if (suffix === '') {
    const num = Number(quantity).valueOf();
    if (isNaN(num)) {
      throw new Error('Unknown quantity ' + quantity);
    }
    return num;
  }
  switch (suffix) {
    case 'n':
      return (
        Number(quantity.substr(0, quantity.length - 1)).valueOf() /
        1_000_000_000.0
      );
    case 'u':
      return (
        Number(quantity.substr(0, quantity.length - 1)).valueOf() / 1_000_000.0
      );
    case 'm':
      return Number(quantity.substr(0, quantity.length - 1)).valueOf() / 1000.0;
    case 'k':
      return Number(quantity.substr(0, quantity.length - 1)) * Number(1000);
    case 'M':
      return (
        Number(quantity.substr(0, quantity.length - 1)) * Number(1000 * 1000)
      );
    case 'G':
      return (
        Number(quantity.substr(0, quantity.length - 1)) *
        Number(1000 * 1000 * 1000)
      );
    case 'T':
      return (
        Number(quantity.substr(0, quantity.length - 1)) *
        Number(1000 * 1000 * 1000) *
        Number(1000)
      );
    case 'P':
      return (
        Number(quantity.substr(0, quantity.length - 1)) *
        Number(1000 * 1000 * 1000) *
        Number(1000 * 1000)
      );
    case 'E':
      return (
        Number(quantity.substr(0, quantity.length - 1)) *
        Number(1000 * 1000 * 1000) *
        Number(1000 * 1000 * 1000)
      );
    case 'Ki':
      return Number(quantity.substr(0, quantity.length - 2)) * Number(1024);
    case 'Mi':
      return (
        Number(quantity.substr(0, quantity.length - 2)) * Number(1024 * 1024)
      );
    case 'Gi':
      return (
        Number(quantity.substr(0, quantity.length - 2)) *
        Number(1024 * 1024 * 1024)
      );
    case 'Ti':
      return (
        Number(quantity.substr(0, quantity.length - 2)) *
        Number(1024 * 1024 * 1024) *
        Number(1024)
      );
    case 'Pi':
      return (
        Number(quantity.substr(0, quantity.length - 2)) *
        Number(1024 * 1024 * 1024) *
        Number(1024 * 1024)
      );
    case 'Ei':
      return (
        Number(quantity.substr(0, quantity.length - 2)) *
        Number(1024 * 1024 * 1024) *
        Number(1024 * 1024 * 1024)
      );
    default:
      throw new Error(`Unknown suffix: ${suffix}`);
  }
}
