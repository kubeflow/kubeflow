import {
  PropertyValue,
  StatusValue,
  TableConfig,
  DateTimeValue,
  LinkValue,
  LinkType,
  ComponentValue,
} from 'kubeflow';
import { quantityToScalar } from '@kubernetes/client-node/dist/util';
import { UsedByComponent } from './columns/used-by/used-by.component';

export const tableConfig: TableConfig = {
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
      value: new LinkValue({
        field: 'link',
        popoverField: 'name',
        truncate: true,
        linkType: LinkType.Internal,
      }),
      sort: true,
    },
    {
      matHeaderCellDef: $localize`Created at`,
      matColumnDef: 'age',
      textAlignment: 'right',
      style: { width: '10%' },
      value: new DateTimeValue({
        field: 'age',
      }),
      sort: true,
    },
    {
      matHeaderCellDef: $localize`Size`,
      matColumnDef: 'size',
      textAlignment: 'right',
      style: { width: '10%' },
      value: new PropertyValue({ field: 'capacity', truncate: true }),
      sort: true,
      sortingPreprocessorFn: quantityToScalar,
    },
    {
      matHeaderCellDef: $localize`Access Mode`,
      matColumnDef: 'modes',
      style: { width: '15%' },
      value: new PropertyValue({ field: 'modes', truncate: true }),
      sort: true,
    },
    {
      matHeaderCellDef: $localize`Storage Class`,
      matColumnDef: 'class',
      style: { width: '10%' },
      value: new PropertyValue({ field: 'class', truncate: true }),
      sort: true,
    },
    {
      matHeaderCellDef: $localize`Used by`,
      matColumnDef: 'usedBy',
      style: { 'max-width': '60px' },
      value: new ComponentValue({
        component: UsedByComponent,
      }),
      sort: true,
      sortingPreprocessorFn: element => element.notebooks,
      filteringPreprocessorFn: element => element.notebooks,
    },

    // the apps should import the actions they want
  ],
};
