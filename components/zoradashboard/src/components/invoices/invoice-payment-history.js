import { Fragment } from 'react';
import { formatDistanceToNow, subMinutes } from 'date-fns';
import { Card, CardContent, CardHeader, Divider, Typography } from '@material-ui/core';
import {
  Timeline,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
  TimelineItem
} from '@material-ui/lab';

const items = [
  {
    id: '1',
    type: 'chargeComplete',
    chargeId: 'th_2JCleBj4vHz',
    createdAt: subMinutes(new Date(), 15)
  },
  {
    id: '2',
    actualStatus: 'Complete',
    oldStatus: 'Pending',
    type: 'orderStatus',
    createdAt: subMinutes(new Date(), 53)
  }
];

const getLabel = (item) => {
  if (item.type === 'chargeComplete') {
    return (
      <>
        Stripe charge complete
        <br />
        Charge ID:
        {' '}
        {item.chargeId}
      </>
    );
  }

  return (
    <>
      Order status changed from
      {' '}
      <strong>{item.oldStatus}</strong>
      {' '}
      payment to
      {' '}
      <strong>{item.actualStatus}</strong>
      .
    </>
  );
};

export const InvoicePaymentHistory = () => (
  <Card variant="outlined">
    <CardHeader title="Payment History" />
    <Divider />
    <CardContent>
      <Timeline
        sx={{
          my: 0,
          p: 0
        }}
      >
        {items.map((item, index) => (
          <Fragment key={item.id}>
            <TimelineItem
              sx={{
                alignItems: 'center',
                minHeight: 'auto',
                '&::before': {
                  display: 'none'
                }
              }}
            >
              <TimelineDot
                sx={{
                  alignSelf: 'center',
                  boxShadow: 'none',
                  flexShrink: 0,
                  m: 0
                }}
                variant="outlined"
              />
              <TimelineContent sx={{ pr: 0 }}>
                <Typography
                  color="textSecondary"
                  sx={{ mr: 1 }}
                  variant="body2"
                >
                  {getLabel(item)}
                </Typography>
                <Typography
                  component="p"
                  color="textSecondary"
                  sx={{ whiteSpace: 'nowrap' }}
                  variant="caption"
                >
                  {formatDistanceToNow(item.createdAt)}
                  {' '}
                  ago
                </Typography>
              </TimelineContent>
            </TimelineItem>
            {items.length > index + 1 && (
              <TimelineConnector
                sx={{
                  backgroundColor: 'neutral.200',
                  height: 22,
                  ml: '5px',
                  my: 1
                }}
              />
            )}
          </Fragment>
        ))}
      </Timeline>
    </CardContent>
  </Card>
);
