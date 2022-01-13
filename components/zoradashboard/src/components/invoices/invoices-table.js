import { useEffect, useState } from 'react';
import Proptypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';
import { format } from 'date-fns';
import numeral from 'numeral';
import {
  Box,
  Checkbox,
  Divider,
  Link,
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel
} from '@material-ui/core';
import { Pagination } from '../pagination';
import { ResourceError } from '../resource-error';
import { ResourceUnavailable } from '../resource-unavailable';
import { Scrollbar } from '../scrollbar';
import { Status } from '../status';
import { InvoiceMenu } from './invoice-menu';

const columns = [
  {
    id: 'id',
    disablePadding: true,
    label: 'Order id'
  },
  {
    id: 'issueDate',
    label: 'Invoice date'
  },
  {
    id: 'dueDate',
    label: 'Due date'
  },
  {
    id: 'totalAmount',
    label: 'Total'
  },
  {
    id: 'paymentMethod',
    label: 'Payment method'
  },
  {
    id: 'status',
    label: 'Status'
  }
];

const statusVariants = [
  {
    color: 'info.main',
    label: 'Ongoing',
    value: 'ongoing'
  },
  {
    color: 'warning.main',
    label: 'Draft',
    value: 'draft'
  },
  {
    color: 'error.main',
    label: 'Overdue',
    value: 'overdue'
  },
  {
    color: 'success.main',
    label: 'Paid',
    value: 'paid'
  }
];

export const InvoicesTable = (props) => {
  const {
    error,
    invoices: invoicesProp,
    invoicesCount,
    isLoading,
    onPageChange,
    onSelect,
    onSelectAll,
    onSortChange,
    page,
    selectedInvoices,
    sort,
    sortBy
  } = props;
  const [invoices, setInvoices] = useState(invoicesProp);

  useEffect(() => {
    setInvoices(invoicesProp);
  }, [invoicesProp]);

  const displayLoading = isLoading;
  const displayError = Boolean(!isLoading && error);
  const displayUnavailable = Boolean(!isLoading && !error && !invoices?.length);

  return (
    <Box
      sx={{
        display: 'flex',
        flex: 1,
        flexDirection: 'column'
      }}
    >
      <Scrollbar>
        <Table sx={{ minWidth: 1000 }}>
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox">
                <Checkbox
                  checked={invoices.length > 0 && selectedInvoices.length === invoices.length}
                  disabled={isLoading}
                  indeterminate={selectedInvoices.length > 0
                  && selectedInvoices.length < invoices.length}
                  onChange={onSelectAll}
                />
              </TableCell>
              {columns.map((column) => (
                <TableCell key={column.id}>
                  <TableSortLabel
                    active={sortBy === column.id}
                    direction={sortBy === column.id ? sort : 'asc'}
                    disabled={isLoading}
                    onClick={(event) => onSortChange(event, column.id)}
                  >
                    {column.label}
                  </TableSortLabel>
                </TableCell>
              ))}
              <TableCell />
            </TableRow>
          </TableHead>
          <TableBody>
            {invoices.map((invoice) => {
              const statusVariant = statusVariants.find((variant) => variant.value
                === invoice.status);

              return (
                <TableRow
                  hover
                  key={invoice.id}
                  selected={!!selectedInvoices.find((selectedCustomer) => selectedCustomer
                    === invoice.id)}
                >
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={!!selectedInvoices.find((selectedCustomer) => selectedCustomer
                        === invoice.id)}
                      onChange={(event) => onSelect(event, invoice.id)}
                    />
                  </TableCell>
                  <TableCell>
                    <Link
                      color="inherit"
                      component={RouterLink}
                      to="/dashboard/invoices/1"
                      underline="none"
                      variant="subtitle2"
                    >
                      #
                      {invoice.id}
                    </Link>
                  </TableCell>
                  <TableCell>
                    {format(invoice.issueDate, 'dd MMM yyyy')}
                  </TableCell>
                  <TableCell>
                    {format(invoice.dueDate, 'dd MMM yyyy')}
                  </TableCell>
                  <TableCell>
                    {numeral(invoice.totalAmount).format(`${invoice.currencySymbol}0,0.00`)}
                  </TableCell>
                  <TableCell>
                    {invoice.paymentMethod}
                  </TableCell>
                  <TableCell>
                    <Status
                      color={statusVariant.color}
                      label={statusVariant.label}
                    />
                  </TableCell>
                  <TableCell>
                    <InvoiceMenu />
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Scrollbar>
      {displayLoading && (
        <Box sx={{ p: 2 }}>
          <Skeleton height={42} />
          <Skeleton height={42} />
          <Skeleton height={42} />
        </Box>
      )}
      {displayError && (
        <ResourceError
          error={error}
          sx={{
            flexGrow: 1,
            m: 2
          }}
        />
      )}
      {displayUnavailable && (
        <ResourceUnavailable
          sx={{
            flexGrow: 1,
            m: 2
          }}
        />
      )}
      <Divider sx={{ mt: 'auto' }} />
      <Pagination
        disabled={isLoading}
        onPageChange={onPageChange}
        page={page}
        rowsCount={invoicesCount}
      />
    </Box>
  );
};

InvoicesTable.defaultProps = {
  invoices: [],
  invoicesCount: 0,
  page: 1,
  selectedInvoices: [],
  sort: 'desc',
  sortBy: 'issueDate'
};

InvoicesTable.propTypes = {
  invoices: Proptypes.array,
  invoicesCount: Proptypes.number,
  error: Proptypes.string,
  isLoading: Proptypes.bool,
  onPageChange: Proptypes.func,
  onSelect: Proptypes.func,
  onSelectAll: Proptypes.func,
  onSortChange: Proptypes.func,
  page: Proptypes.number,
  selectedInvoices: Proptypes.array,
  sort: Proptypes.oneOf(['asc', 'desc']),
  sortBy: Proptypes.string
};
