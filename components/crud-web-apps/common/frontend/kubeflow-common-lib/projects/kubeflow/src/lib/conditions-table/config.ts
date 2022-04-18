import {
  PropertyValue,
  StatusValue,
  TABLE_THEME,
  TableConfig,
} from '../resource-table/types';
import { DateTimeValue } from '../resource-table/types/date-time';

export function generateConfig(): TableConfig {
  return {
    title: '',
    width: '100%',
    theme: TABLE_THEME.FLAT,
    columns: [
      {
        matHeaderCellDef: 'Status',
        matColumnDef: 'status',
        style: { width: '40px' },
        value: new StatusValue({
          fieldPhase: 'statusPhase',
          fieldMessage: 'statusMessage',
        }),
      },
      {
        matHeaderCellDef: 'Type',
        matColumnDef: 'type',
        style: { width: '150px' },
        value: new PropertyValue({
          field: 'type',
        }),
      },
      {
        matHeaderCellDef: 'Last Transition Time',
        matColumnDef: 'lastTransitionTime',
        style: { width: '150px' },
        value: new DateTimeValue({
          field: 'lastTransitionTime',
        }),
      },
      {
        matHeaderCellDef: 'Reason',
        matColumnDef: 'reason',
        style: { width: '150px' },
        value: new PropertyValue({
          field: 'reason',
        }),
      },
      {
        matHeaderCellDef: 'Message',
        matColumnDef: 'message',
        style: { width: '150px' },
        value: new PropertyValue({
          field: 'message',
        }),
      },
    ],
  };
}
