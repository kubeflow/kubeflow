import { useState, useEffect, useCallback } from 'react';
import { Helmet } from 'react-helmet-async';
import { Box, Grid } from '@material-ui/core';
import { customerApi } from '../api/customer';
import { CustomerDialog } from '../components/customer/customer-dialog';
import { CustomerInfo } from '../components/customer/customer-info';
import { CustomerLatestOrders } from '../components/customer/customer-latest-orders';
import { CustomerNotes } from '../components/customer/customer-notes';
import { CustomerProperties } from '../components/customer/customer-properties';
import { ResourceError } from '../components/resource-error';
import { ResourceLoading } from '../components/resource-loading';
import { useMounted } from '../hooks/use-mounted';
import gtm from '../lib/gtm';

export const CustomerSummary = () => {
  const mounted = useMounted();
  const [customerState, setCustomerState] = useState({ isLoading: true });
  const [ordersState, setOrdersState] = useState({ isLoading: true });
  const [notesState, setNotesState] = useState({ isLoading: true });
  const [openInfoDialog, setOpenInfoDialog] = useState(false);

  const getCustomer = useCallback(async () => {
    setCustomerState(() => ({ isLoading: true }));

    try {
      const result = await customerApi.getCustomer();

      if (mounted.current) {
        setCustomerState(() => ({
          isLoading: false,
          data: result
        }));
      }
    } catch (err) {
      console.error(err);

      if (mounted.current) {
        setCustomerState(() => ({
          isLoading: false,
          error: err.message
        }));
      }
    }
  }, []);

  const getOrders = useCallback(async () => {
    setOrdersState(() => ({ isLoading: true }));

    try {
      const result = await customerApi.getCustomerOrders();

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
  }, []);

  const getNotes = useCallback(async () => {
    setNotesState(() => ({ isLoading: true }));

    try {
      const result = await customerApi.getCustomerNotes();

      if (mounted.current) {
        setNotesState(() => ({
          isLoading: false,
          data: result
        }));
      }
    } catch (err) {
      console.error(err);

      if (mounted.current) {
        setNotesState(() => ({
          isLoading: false,
          error: err.message
        }));
      }
    }
  }, []);

  useEffect(() => {
    getCustomer().catch(console.error);
    getOrders().catch(console.error);
    getNotes().catch(console.error);
  }, []);

  useEffect(() => {
    gtm.push({ event: 'page_view' });
  }, []);

  const renderContent = () => {
    // Wait for all resources to load
    if (customerState.isLoading || notesState.isLoading || ordersState.isLoading) {
      return (
        <ResourceLoading />
      );
    }

    // If any resource has an error, display only 1 error message
    if (customerState.error || notesState.error || ordersState.error) {
      return (
        <ResourceError />
      );
    }

    return (
      <>
        <Grid
          container
          spacing={3}
        >
          <Grid
            container
            item
            lg={4}
            spacing={3}
            sx={{ height: 'fit-content' }}
            xs={12}
          >
            <Grid
              item
              xs={12}
            >
              <CustomerInfo
                onEdit={() => setOpenInfoDialog(true)}
                customer={customerState.data}
              />
            </Grid>
            <Grid
              item
              xs={12}
            >
              <CustomerProperties customer={customerState.data} />
            </Grid>
          </Grid>
          <Grid
            container
            item
            lg={8}
            spacing={3}
            sx={{ height: 'fit-content' }}
            xs={12}
          >
            <Grid
              item
              xs={12}
            >
              <CustomerLatestOrders orders={ordersState.data} />
            </Grid>
            <Grid
              item
              xs={12}
            >
              <CustomerNotes notes={notesState.data} />
            </Grid>
          </Grid>
        </Grid>
        <CustomerDialog
          customer={customerState.data}
          onClose={() => setOpenInfoDialog(false)}
          open={openInfoDialog}
        />
      </>
    );
  };

  return (
    <>
      <Helmet>
        <title>Customer: Summary | Carpatin Dashboard</title>
      </Helmet>
      <Box
        sx={{
          backgroundColor: 'background.default',
          flexGrow: 1
        }}
      >
        {renderContent()}
      </Box>
    </>
  );
};
