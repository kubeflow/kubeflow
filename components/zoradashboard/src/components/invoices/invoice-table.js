import PropTypes from 'prop-types';
import numeral from 'numeral';
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography
} from '@material-ui/core';
import { Scrollbar } from '../scrollbar';

export const InvoiceTable = (props) => {
  const { invoice } = props;

  return (
    <div>
      <Scrollbar>
        <Table sx={{ minWidth: 500 }}>
          <TableHead>
            <TableRow>
              <TableCell>
                Item
              </TableCell>
              <TableCell>
                Qty
              </TableCell>
              <TableCell>
                Total
              </TableCell>
              <TableCell>
                Tax
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {invoice.lineItems.map((item) => (
              <TableRow key={item.name}>
                <TableCell>
                  <Box>
                    <Typography
                      color="inherit"
                      variant="body2"
                    >
                      {item.name}
                    </Typography>
                    <Typography
                      color="textSecondary"
                      variant="body2"
                    >
                      {`${item.currency}  ${numeral(item.unitAmount).format(`${item.currencySymbol}0,0.00`)}`}
                    </Typography>
                  </Box>
                </TableCell>
                <TableCell>
                  {item.quantity}
                </TableCell>
                <TableCell>
                  {numeral(item.subtotalAmount).format(`${item.currencySymbol}0,0.00`)}
                </TableCell>
                <TableCell sx={{ width: 150 }}>
                  {numeral(item.taxAmount).format(`${item.currencySymbol}0,0.00`)}
                </TableCell>
              </TableRow>
            ))}
            <TableRow>
              <TableCell />
              <TableCell />
              <TableCell />
              <TableCell>
                <Box
                  sx={{
                    alignItems: 'center',
                    display: 'flex'
                  }}
                >
                  <Typography
                    color="textSecondary"
                    sx={{ mr: 1 }}
                    variant="subtitle2"
                  >
                    Tax
                  </Typography>
                  <Typography
                    color="textPrimary"
                    variant="subtitle2"
                  >
                    {numeral(invoice.taxAmount).format(`${invoice.currencySymbol}0,0.00`)}
                  </Typography>
                </Box>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell />
              <TableCell />
              <TableCell />
              <TableCell>
                <Box
                  sx={{
                    alignItems: 'center',
                    display: 'flex'
                  }}
                >
                  <Typography
                    color="textSecondary"
                    sx={{ mr: 1 }}
                    variant="subtitle2"
                  >
                    Total
                  </Typography>
                  <Typography
                    color="textPrimary"
                    variant="h6"
                  >
                    {numeral(invoice.totalAmount).format(`${invoice.currencySymbol}0,0.00`)}
                  </Typography>
                </Box>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Scrollbar>
    </div>
  );
};

InvoiceTable.propTypes = {
  invoice: PropTypes.object.isRequired
};
