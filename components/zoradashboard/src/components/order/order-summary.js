import PropTypes from 'prop-types';
import numeral from 'numeral';
import {
  Avatar,
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography
} from '@material-ui/core';
import { Scrollbar } from '../scrollbar';

export const OrderSummary = (props) => {
  const { order, ...other } = props;

  return (
    <Scrollbar>
      <Table
        sx={{ minWidth: 500 }}
        {...other}
      >
        <TableHead>
          <TableRow>
            <TableCell>
              Name
            </TableCell>
            <TableCell>
              Cost
            </TableCell>
            <TableCell>
              Qty
            </TableCell>
            <TableCell>
              Total
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {order.lineItems.map((lineItem) => (
            <TableRow key={lineItem.sku}>
              <TableCell>
                <Box
                  sx={{
                    alignItems: 'center',
                    display: 'flex'
                  }}
                >
                  <Avatar
                    src={lineItem.image}
                    sx={{
                      height: 48,
                      mr: 2,
                      width: 48
                    }}
                    variant="rounded"
                  />
                  <div>
                    <Typography
                      color="textPrimary"
                      variant="body2"
                    >
                      {lineItem.name}
                    </Typography>
                    <Typography
                      color="textSecondary"
                      variant="body2"
                    >
                      {`SKU: ${lineItem.sku}`}
                    </Typography>
                  </div>
                </Box>
              </TableCell>
              <TableCell>
                {numeral(lineItem.unitAmount).format(`${lineItem.currencySymbol}0,0.00`)}
              </TableCell>
              <TableCell>
                {lineItem.quantity}
              </TableCell>
              <TableCell>
                {numeral(lineItem.totalAmount).format(`${lineItem.currencySymbol}0,0.00`)}
              </TableCell>
            </TableRow>
          ))}
          <TableRow>
            <TableCell>
              Subtotal
            </TableCell>
            <TableCell />
            <TableCell />
            <TableCell>
              {numeral(order.subtotalAmount).format(`${order.currencySymbol}0,0.00`)}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              Discount (%)
            </TableCell>
            <TableCell />
            <TableCell />
            <TableCell>
              {numeral(order.discountAmount).format(`${order.currencySymbol}0,0.00`)}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              VAT (25%)
            </TableCell>
            <TableCell />
            <TableCell />
            <TableCell>
              {numeral(order.taxAmount).format(`${order.currencySymbol}0,0.00`)}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <Typography
                color="textPrimary"
                variant="subtitle2"
              >
                Total
              </Typography>
            </TableCell>
            <TableCell />
            <TableCell />
            <TableCell>
              <Typography
                color="textPrimary"
                variant="subtitle2"
              >
                {numeral(order.totalAmount).format(`${order.currencySymbol}0,0.00`)}
              </Typography>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </Scrollbar>
  );
};

OrderSummary.propTypes = {
  error: PropTypes.object,
  isLoading: PropTypes.bool,
  order: PropTypes.object
};
