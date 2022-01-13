import PropTypes from 'prop-types';
import { format } from 'date-fns';
import { Card, CardHeader, Divider, Grid } from '@material-ui/core';
import { PropertyList } from '../property-list';
import { PropertyListItem } from '../property-list-item';

export const InvoiceDetails = (props) => {
  const { invoice } = props;

  return (
    <Card variant="outlined">
      <CardHeader title="Invoice Details" />
      <Divider />
      <Grid container>
        <Grid
          item
          md={6}
          xs={12}
        >
          <PropertyList>
            <PropertyListItem
              label="Customer Name"
              value={invoice.customerName}
            />
            <PropertyListItem
              label="Invoice Number"
              value={`#${invoice.id}`}
            />
            <PropertyListItem
              label="Invoice Date"
              value={format(invoice.issueDate, 'dd MMM yyyy')}
            />
          </PropertyList>
        </Grid>
        <Grid
          item
          md={6}
          xs={12}
        >
          <PropertyList>
            <PropertyListItem
              label="Due Date"
              value={format(invoice.dueDate, 'dd MMM yyyy')}
            />
            <PropertyListItem
              label="Notes"
              value={`“${invoice.note}”`}
            />
          </PropertyList>
        </Grid>
      </Grid>
    </Card>
  );
};

InvoiceDetails.propTypes = {
  invoice: PropTypes.object.isRequired
};
