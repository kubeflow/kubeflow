import {
  PropertyValue,
  StatusValue,
  TRUNCATE_TEXT_SIZE,
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
        width: '40px',
        value: new StatusValue({
          fieldPhase: 'statusPhase',
          fieldMessage: 'statusMessage',
        }),
      },
      {
        matHeaderCellDef: 'Type',
        matColumnDef: 'type',
        width: '150px',
        value: new PropertyValue({
          field: 'type',
        }),
      },
      {
        matHeaderCellDef: 'Last Transition Time',
        matColumnDef: 'lastTransitionTime',
        width: '160px',
        value: new DateTimeValue({
          field: 'lastTransitionTime',
        }),
      },
      {
        matHeaderCellDef: 'Reason',
        matColumnDef: 'reason',
        width: '150px',
        value: new PropertyValue({
          field: 'reason',
        }),
      },
      {
        matHeaderCellDef: 'Message',
        matColumnDef: 'message',
        minWidth: '150px',
        value: new PropertyValue({
          field: 'message',
        }),
      },
    ],
  };
}
