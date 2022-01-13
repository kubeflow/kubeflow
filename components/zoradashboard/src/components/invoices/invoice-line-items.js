import PropTypes from 'prop-types';
import { Card, CardHeader, Divider } from '@material-ui/core';
import { InvoiceTable } from './invoice-table';

export const InvoiceLineItems = (props) => {
  const { invoice } = props;

  return (
    <Card variant="outlined">
      <CardHeader title="Line Items" />
      <Divider />
      <InvoiceTable invoice={invoice} />
    </Card>
  );
};

InvoiceLineItems.propTypes = {
  invoice: PropTypes.object.isRequired
};
