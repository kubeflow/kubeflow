import { useCallback, useEffect, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Box, Button, Container, Grid, Skeleton, Typography } from '@material-ui/core';
import { invoiceApi } from '../api/invoice';
import { InvoiceDetails } from '../components/invoices/invoice-details';
import { InvoiceLineItems } from '../components/invoices/invoice-line-items';
import { InvoicePayment } from '../components/invoices/invoice-payment';
import { InvoicePaymentHistory } from '../components/invoices/invoice-payment-history';
import { InvoiceSendNotification } from '../components/invoices/invoice-send-notification';
import { Status } from '../components/status';
import { useMounted } from '../hooks/use-mounted';
import { ArrowLeft as ArrowLeftIcon } from '../icons/arrow-left';
import { ExclamationOutlined as ExclamationOutlinedIcon } from '../icons/exclamation-outlined';
import { Eye as EyeIcon } from '../icons/eye';
import gtm from '../lib/gtm';

export const Invoice = () => {
  const mounted = useMounted();
  const [invoiceState, setInvoiceState] = useState({ isLoading: true });

  const getInvoice = useCallback(async () => {
    setInvoiceState(() => ({ isLoading: true }));

    try {
      const result = await invoiceApi.getInvoice();

      if (mounted.current) {
        setInvoiceState(() => ({
          isLoading: false,
          data: result
        }));
      }
    } catch (err) {
      console.error(err);

      if (mounted.current) {
        setInvoiceState(() => ({
          isLoading: false,
          error: err.message
        }));
      }
    }
  }, []);

  useEffect(() => {
    getInvoice().catch(console.error);
  }, []);

  useEffect(() => {
    gtm.push({ event: 'page_view' });
  }, []);

  const renderContent = () => {
    if (invoiceState.isLoading) {
      return (
        <Box sx={{ py: 4 }}>
          <Skeleton height={42} />
          <Skeleton />
          <Skeleton />
        </Box>
      );
    }

    if (invoiceState.error) {
      return (
        <Box sx={{ py: 4 }}>
          <Box
            sx={{
              alignItems: 'center',
              backgroundColor: 'background.default',
              display: 'flex',
              flexDirection: 'column',
              p: 3
            }}
          >
            <ExclamationOutlinedIcon />
            <Typography
              color="textSecondary"
              sx={{ mt: 2 }}
              variant="body2"
            >
              {invoiceState.error}
            </Typography>
          </Box>
        </Box>
      );
    }

    return (
      <>
        <Box sx={{ py: 4 }}>
          <Box sx={{ mb: 2 }}>
            <Button
              color="primary"
              component={RouterLink}
              startIcon={<ArrowLeftIcon />}
              to="/dashboard/invoices"
              variant="text"
            >
              Invoices
            </Button>
          </Box>
          <Box
            sx={{
              alignItems: 'center',
              display: 'flex'
            }}
          >
            <Typography
              color="textPrimary"
              variant="h4"
            >
              #
              {invoiceState.data.id}
            </Typography>
            <Box sx={{ flexGrow: 1 }} />
            <Button
              color="primary"
              component={RouterLink}
              size="large"
              startIcon={<EyeIcon />}
              to="/dashboard/invoices/1/preview"
              variant="contained"
            >
              Preview
            </Button>
          </Box>
          <Box sx={{ mt: 2 }}>
            <Status
              color="error.main"
              label="Unpaid"
            />
          </Box>
        </Box>
        <Grid
          container
          spacing={3}
        >
          <Grid
            container
            item
            lg={8}
            spacing={3}
            sx={{
              height: 'fit-content',
              order: {
                md: 2,
                xs: 1
              }
            }}
            xs={12}
          >
            <Grid
              item
              xs={12}
            >
              <InvoiceDetails invoice={invoiceState.data} />
            </Grid>
            <Grid
              item
              xs={12}
            >
              <InvoicePayment invoice={invoiceState.data} />
            </Grid>
            <Grid
              item
              xs={12}
            >
              <InvoiceLineItems invoice={invoiceState.data} />
            </Grid>
          </Grid>
          <Grid
            container
            item
            lg={4}
            spacing={3}
            sx={{
              height: 'fit-content',
              order: {
                md: 2,
                xs: 1
              }
            }}
            xs={12}
          >
            <Grid
              item
              xs={12}
            >
              <InvoiceSendNotification invoice={invoiceState.data} />
            </Grid>
            <Grid
              item
              xs={12}
            >
              <InvoicePaymentHistory />
            </Grid>
          </Grid>
        </Grid>
      </>
    );
  };

  return (
    <>
      <Helmet>
        <title>Invoice: Summary | Carpatin Dashboard</title>
      </Helmet>
      <Box
        sx={{
          backgroundColor: 'background.default',
          flexGrow: 1
        }}
      >
        <Container
          maxWidth="lg"
          sx={{
            display: 'flex',
            flexDirection: 'column',
            height: '100%'
          }}
        >
          {renderContent()}
        </Container>
      </Box>
    </>
  );
};
