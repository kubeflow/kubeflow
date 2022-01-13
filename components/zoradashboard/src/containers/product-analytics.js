import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Box, Card, CardContent, Grid, Typography } from '@material-ui/core';
import { ProductChannel } from '../components/product/product-channel';
import { ProductReturnRate } from '../components/product/product-return-rate';
import { ProductReviews } from '../components/product/product-reviews';
import { ProductSalesReport } from '../components/product/product-sales-report';
import gtm from '../lib/gtm';

export const ProductAnalytics = () => {
  useEffect(() => {
    gtm.push({ event: 'page_view' });
  }, []);

  return (
    <>
      <Helmet>
        <title>Product: Analytics | Carpatin Dashboard</title>
      </Helmet>
      <Box
        sx={{
          backgroundColor: 'background.default',
          flexGrow: 1,
          width: '100%'
        }}
      >
        <Grid
          container
          spacing={3}
        >
          <Grid
            container
            item
            md={4}
            spacing={3}
            sx={{ height: 'fit-content' }}
            xs={12}
          >
            <Grid
              item
              xs={12}
            >
              <Typography
                color="textPrimary"
                variant="h6"
              >
                All time
              </Typography>
            </Grid>
            <Grid
              item
              xs={12}
            >
              <Card variant="outlined">
                <CardContent>
                  <Typography
                    color="textSecondary"
                    variant="subtitle2"
                  >
                    Monthly Recurring Revenue
                  </Typography>
                  <Typography
                    color="textPrimary"
                    variant="h4"
                  >
                    € 3,200.00
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid
              item
              xs={12}
            >
              <Card variant="outlined">
                <CardContent>
                  <Typography
                    color="textSecondary"
                    variant="subtitle2"
                  >
                    Order count for this product
                  </Typography>
                  <Typography
                    color="textPrimary"
                    variant="h4"
                  >
                    356
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid
              item
              xs={12}
            >
              <ProductReviews />
            </Grid>
          </Grid>
          <Grid
            container
            item
            md={8}
            spacing={3}
            sx={{ height: 'fit-content' }}
            xs={12}
          >
            <Grid
              item
              xs={12}
            >
              <Typography
                color="textPrimary"
                variant="h6"
              >
                Last 30 days
              </Typography>
            </Grid>
            <Grid
              item
              xs={12}
            >
              <ProductSalesReport />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <ProductChannel />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <ProductReturnRate />
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};
