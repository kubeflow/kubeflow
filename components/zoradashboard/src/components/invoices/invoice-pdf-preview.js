import PropTypes from 'prop-types';
import { format } from 'date-fns';
import { Box, Card, Paper, Typography } from '@material-ui/core';
import { InvoiceTable } from './invoice-table';

export const InvoicePdfPreview = (props) => {
  const { invoice } = props;

  return (
    <Paper
      elevation={24}
      sx={{ p: 3 }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between'
        }}
      >
        <Typography
          color="textPrimary"
          variant="h4"
        >
          #
          {invoice.id}
        </Typography>
        <Typography
          align="right"
          color="error.main"
          sx={{ textTransform: 'uppercase' }}
          variant="h4"
        >
          {invoice.status}
        </Typography>
      </Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: {
            md: 'space-between',
            xs: 'flex-start'
          },
          flexDirection: {
            md: 'row',
            xs: 'column'
          },
          mt: 1.5
        }}
      >
        <div>
          <Typography
            color="textPrimary"
            gutterBottom
            variant="subtitle2"
          >
            Invoice to
          </Typography>
          <Typography
            color="textSecondary"
            variant="body2"
          >
            Acme LTD GB54423345
            <br />
            340 Lemon St. #5554
            <br />
            Spring Valley, California
            <br />
            United States
          </Typography>
        </div>
        <Box
          sx={{
            textAlign: {
              md: 'right',
              xs: 'left'
            }
          }}
        >
          <Typography
            color="textPrimary"
            gutterBottom
            variant="subtitle2"
          >
            Invoice for
          </Typography>
          <Typography
            color="textSecondary"
            variant="body2"
          >
            Natalie Rusell
            <br />
            3845 Salty Street
            <br />
            Salt Lake City
            <br />
            United States
          </Typography>
        </Box>
      </Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          mt: 6
        }}
      >
        <Box>
          <Typography
            color="textPrimary"
            gutterBottom
            variant="subtitle2"
          >
            Invoice Date
          </Typography>
          <Typography
            color="textSecondary"
            variant="body2"
          >
            {format(invoice.issueDate, 'dd MMM yyyy')}
          </Typography>
        </Box>
        <Box>
          <Typography
            align="right"
            color="textPrimary"
            gutterBottom
            variant="subtitle2"
          >
            Due Date
          </Typography>
          <Typography
            align="right"
            color="textSecondary"
            variant="body2"
          >
            {format(invoice.dueDate, 'dd MMM yyyy')}
          </Typography>
        </Box>
      </Box>
      <Card
        variant="outlined"
        sx={{ my: 4.5 }}
      >
        <InvoiceTable invoice={invoice} />
      </Card>
      <Typography
        color="textPrimary"
        gutterBottom
        variant="subtitle2"
      >
        Notes
      </Typography>
      <Typography
        color="textsecondary"
        variant="body2"
      >
        “
        {invoice.note}
        ”
      </Typography>
    </Paper>
  );
};

InvoicePdfPreview.propTypes = {
  invoice: PropTypes.object.isRequired
};
