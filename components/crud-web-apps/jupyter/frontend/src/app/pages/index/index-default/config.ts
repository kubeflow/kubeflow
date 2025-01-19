import {
  PropertyValue,
  StatusValue,
  ActionListValue,
  ActionIconValue,
  ActionButtonValue,
  ComponentValue,
  TableConfig,
  DateTimeValue,
  LinkValue,
  LinkType,
  MemoryValue,
  quantityToScalar,
  MenuValue,
} from 'kubeflow';
import { ServerTypeComponent } from './server-type/server-type.component';

// --- Config for the Resource Table ---
export const defaultConfig: TableConfig = {
  dynamicNamespaceColumn: true,
  columns: [
    {
      matHeaderCellDef: $localize`Status`,
      matColumnDef: 'status',
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
      matHeaderCellDef: $localize`Type`,
      matColumnDef: 'type',
      value: new ComponentValue({
        component: ServerTypeComponent,
      }),
      sort: true,
      sortingPreprocessorFn: element => element.serverType,
      filteringPreprocessorFn: element => {
        if (element.serverType === 'group-one') {
          return 'vscode Visual Studio Code';
        } else if (element.serverType === 'group-two') {
          return 'rstudio';
        } else {
          return 'jupyterlab';
        }
      },
    },
    {
      matHeaderCellDef: $localize`Created at`,
      matColumnDef: 'age',
      style: { width: '12%' },
      textAlignment: 'right',
      value: new DateTimeValue({ field: 'age' }),
      sort: true,
    },
    {
      matHeaderCellDef: $localize`Last activity`,
      matColumnDef: 'last_activity',
      textAlignment: 'right',
      value: new DateTimeValue({ field: 'last_activity' }),
      sort: true,
    },
    {
      matHeaderCellDef: $localize`Image`,
      matColumnDef: 'image',
      style: { width: '30%' },
      value: new PropertyValue({
        field: 'shortImage',
        popoverField: 'image',
        truncate: true,
        style: { maxWidth: '300px' },
      }),
      sort: true,
    },
    {
      matHeaderCellDef: $localize`GPUs`,
      matColumnDef: 'gpus',
      style: { width: '8%' },
      textAlignment: 'right',
      value: new PropertyValue({
        field: 'gpus.count',
        tooltipField: 'gpus.message',
      }),
      sort: true,
    },
    {
      matHeaderCellDef: $localize`CPUs`,
      matColumnDef: 'cpu',
      style: { width: '8%' },
      textAlignment: 'right',
      value: new PropertyValue({ field: 'cpu' }),
      sort: true,
      sortingPreprocessorFn: quantityToScalar,
    },
    {
      matHeaderCellDef: $localize`Memory`,
      matColumnDef: 'memory',
      style: { width: '8%' },
      textAlignment: 'right',
      value: new MemoryValue({
        field: 'memory',
      }),
      sort: true,
    },

    {
      matHeaderCellDef: '',
      matColumnDef: 'actions',
      value: new ActionListValue([
        new ActionButtonValue({
          name: 'connect',
          tooltip: $localize`Connect to this notebook server`,
          color: 'primary',
          field: 'connectAction',
          text: $localize`CONNECT`,
        }),
        // 2023/08/29 YCL sharing start //
        new ActionIconValue({
          name: 'share',
          tooltipInit: $localize`Share this notebook`,
          tooltipReady: $localize`Share this notebook`,
          color: '',
          field: 'shareAction',
          iconReady: 'material:screen_share',
        }),
        // 2023/08/29 YCL sharing end //        
        new ActionIconValue({
          name: 'start-stop',
          tooltipInit: $localize`Stop this notebook server`,
          tooltipReady: $localize`Start this notebook server`,
          color: '',
          field: 'startStopAction',
          iconInit: 'material:stop',
          iconReady: 'material:play_arrow',
        }),
        new ActionIconValue({
          name: 'delete',
          tooltip: $localize`Delete this notebook server`,
          color: '',
          field: 'deleteAction',
          iconReady: 'material:delete',
        }),
      ]),
    },
  ],
};

export const defaultAdvancedConfig: TableConfig = {
  columns: [
    {
      matHeaderCellDef: $localize`Status`,
      matColumnDef: 'status',
      value: new StatusValue(),
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
      matHeaderCellDef: $localize`Type`,
      matColumnDef: 'type',
      value: new ComponentValue({
        component: ServerTypeComponent,
      }),
    },
    {
      matHeaderCellDef: $localize`Age`,
      matColumnDef: 'age',
      style: { width: '12%' },
      textAlignment: 'right',
      value: new PropertyValue({ field: 'age', truncate: true }),
    },
    {
      matHeaderCellDef: $localize`Last activity`,
      matColumnDef: 'last_activity',
      value: new DateTimeValue({ field: 'last_activity' }),
    },
    {
      matHeaderCellDef: $localize`Image`,
      matColumnDef: 'image',
      style: { width: '30%' },
      value: new PropertyValue({
        field: 'shortImage',
        popoverField: 'image',
        truncate: true,
        style: { maxWidth: '300px' },
      }),
    },
    {
      matHeaderCellDef: $localize`GPUs`,
      matColumnDef: 'gpus',
      style: { width: '8%' },
      textAlignment: 'right',
      value: new PropertyValue({
        field: 'gpus.count',
        tooltipField: 'gpus.message',
      }),
    },
    {
      matHeaderCellDef: $localize`CPUs`,
      matColumnDef: 'cpu',
      style: { width: '8%' },
      textAlignment: 'right',
      value: new PropertyValue({ field: 'cpu' }),
    },
    {
      matHeaderCellDef: $localize`Memory`,
      matColumnDef: 'memory',
      style: { width: '8%' },
      textAlignment: 'right',
      value: new PropertyValue({ field: 'memory' }),
    },
    /* Lance */
    {
      matHeaderCellDef: $localize`Volumes`,
      matColumnDef: 'volumes',
      value: new MenuValue({ field: 'volumes', itemsIcon: 'storage' }),
    },
    {
      matHeaderCellDef: '',
      matColumnDef: 'actions',
      value: new ActionListValue([
        new ActionButtonValue({
          name: 'template',
          tooltip: $localize`set this notebook as template`,
          color: 'primary',
          field: 'setTemplateAction',
          text: $localize`SET`,
        }),
        new ActionButtonValue({
          name: 'remove-template',
          tooltip: $localize`remove this notebook as template`,
          color: 'primary',
          field: 'removeTemplateAction',
          text: $localize`REMOVE`,
        }),
        new ActionButtonValue({
          name: 'connect',
          tooltip: $localize`Connect to this notebook server`,
          color: 'primary',
          field: 'connectAction',
          text: $localize`CONNECT`,
        }),
        new ActionIconValue({
          name: 'share',
          tooltipInit: $localize`Share this notebook`,
          tooltipReady: $localize`Share this notebook`,
          color: '',
          field: 'shareAction',
          iconReady: 'material:screen_share',
        }),
        new ActionIconValue({
          name: 'start-stop',
          tooltipInit: $localize`Stop this notebook server`,
          tooltipReady: $localize`Start this notebook server`,
          color: '',
          field: 'startStopAction',
          iconInit: 'material:stop',
          iconReady: 'material:play_arrow',
        }),
        new ActionIconValue({
          name: 'delete',
          tooltip: $localize`Delete this notebook server`,
          color: '',
          field: 'deleteAction',
          iconReady: 'material:delete',
        }),
      ]),
    },
  ],
};