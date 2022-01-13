import { useState, useEffect, useCallback } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link as RouterLink } from 'react-router-dom';
import { format } from 'date-fns';
import numeral from 'numeral';
import {
  Box,
  Card,
  Link,
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
  Typography
} from '@material-ui/core';
import { customerApi } from '../api/customer';
import { CustomerOrderMenu } from '../components/customer/customer-order-menu';
import { ResourceError } from '../components/resource-error';
import { ResourceUnavailable } from '../components/resource-unavailable';
import { Scrollbar } from '../components/scrollbar';
import { Status } from '../components/status';
import { useMounted } from '../hooks/use-mounted';
import gtm from '../lib/gtm';

const columns = [
  {
    id: 'id',
    label: 'Order ID'
  },
  {
    id: 'createdAt',
    label: 'Created'
  },
  {
    id: 'distribution',
    label: 'Distribution'
  },
  {
    id: 'status',
    label: 'Status'
  },
  {
    id: 'totalAmount',
    label: 'Total Amount'
  }
];

const statusVariants = [
  {
    color: 'info.main',
    label: 'Placed',
    value: 'placed'
  },
  {
    color: 'error.main',
    label: 'Processed',
    value: 'processed'
  },
  {
    color: 'warning.main',
    label: 'Delivered',
    value: 'delivered'
  },
  {
    color: 'success.main',
    label: 'Complete',
    value: 'complete'
  }
];

export const CustomerOrders = () => {
  const mounted = useMounted();
  const [controller, setController] = useState({
    sort: 'desc',
    sortBy: 'createdAt'
  });
  const [ordersState, setOrdersState] = useState({ isLoading: true });

  const getOrders = useCallback(async () => {
    setOrdersState(() => ({ isLoading: true }));

    try {
      const result = await customerApi.getCustomerOrders({
        sort: controller.sort,
        sortBy: controller.sortBy
      });

      if (mounted.current) {
        setOrdersState(() => ({
          isLoading: false,
          data: result
        }));
      }
    } catch (err) {
      console.error(err);

      if (mounted.current) {
        setOrdersState(() => ({
          isLoading: false,
          error: err.message
        }));
      }
    }
  }, [controller]);

  useEffect(() => {
    getOrders().catch(console.error);
  }, [controller]);

  useEffect(() => {
    gtm.push({ event: 'page_view' });
  }, []);

  const displayLoading = ordersState.isLoading;
  const displayError = Boolean(!ordersState.isLoading && ordersState.error);
  const displayUnavailable = Boolean(!ordersState.isLoading
    && !ordersState.error
    && !ordersState.data?.length);

  const handleSortChange = (event, property) => {
    const isAsc = controller.sortBy === property && controller.sort === 'asc';

    setController({
      ...controller,
      sort: isAsc ? 'desc' : 'asc',
      sortBy: property
    });
  };

  return (
    <>
      <Helmet>
        <title>Customer: Orders | Carpatin Dashboard</title>
      </Helmet>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          height: '100%'
        }}
      >
        <Card
          variant="outlined"
          sx={{
            display: 'flex',
            flexDirection: 'column',
            flexGrow: 1
          }}
        >
          <Scrollbar>
            <Table sx={{ minWidth: 1000 }}>
              <TableHead>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell key={column.id}>
                      <TableSortLabel
                        active={controller.sortBy === column.id}
                        direction={controller.sortBy === column.id
                          ? controller.sort
                          : 'asc'}
                        disabled={ordersState.isLoading}
                        onClick={(event) => handleSortChange(event, column.id)}
                      >
                        {column.label}
                      </TableSortLabel>
                    </TableCell>
                  ))}
                  <TableCell />
                </TableRow>
              </TableHead>
              <TableBody>
                {ordersState.data?.map((order) => {
                  const statusVariant = statusVariants.find((variant) => variant.value
                    === order.status);

                  return (
                    <TableRow key={order.id}>
                      <TableCell>
                        <Link
                          color="inherit"
                          component={RouterLink}
                          to="/dashboard/orders/1"
                          underline="none"
                          variant="subtitle2"
                        >
                          {`#${order.id}`}
                        </Link>
                      </TableCell>
                      <TableCell>
                        <Box>
                          <Typography
                            color="inherit"
                            variant="inherit"
                          >
                            {format(new Date(order.createdAt), 'dd MMM yyyy')}
                          </Typography>
                          <Typography
                            color="textSecondary"
                            variant="inherit"
                          >
                            {format(new Date(order.createdAt), 'HH:mm')}
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Typography
                          color="inherit"
                          variant="inherit"
                        >
                          {`${order.customer.city}, ${order.customer.country}`}
                        </Typography>
                        <Typography
                          color="textSecondary"
                          variant="inherit"
                        >
                          {order.courier}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Status
                          color={statusVariant.color}
                          label={statusVariant.label}
                        />
                      </TableCell>
                      <TableCell>
                        {numeral(order.totalAmount).format(`${order.currencySymbol}0,0.00`)}
                      </TableCell>
                      <TableCell align="right">
                        <CustomerOrderMenu />
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
              error={ordersState.error}
              sx={{
                height: '100%',
                m: 2
              }}
            />
          )}
          {displayUnavailable && (
            <ResourceUnavailable
              sx={{
                height: '100%',
                m: 2
              }}
            />
          )}
        </Card>
      </Box>
    </>
  );
};
