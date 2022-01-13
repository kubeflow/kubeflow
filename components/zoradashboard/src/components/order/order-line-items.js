import PropTypes from 'prop-types';
import { Card, CardHeader, Divider } from '@material-ui/core';
import { OrderSummary } from './order-summary';

export const OrderLineItems = (props) => {
  const { order, ...other } = props;

  return (
    <Card
      variant="outlined"
      {...other}
    >
      <CardHeader title="Line Items" />
      <Divider />
      <OrderSummary order={order} />
    </Card>
  );
};

OrderLineItems.propTypes = {
  order: PropTypes.object
};
