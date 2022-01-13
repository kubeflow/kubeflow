import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Box, Card, Grid, Typography } from '@material-ui/core';
import { PerformanceIndicators } from '../components/reports/performance-indicators';
import { ProductsBreakdown } from '../components/reports/products-breakdown';
import { Ban as BanIcon } from '../icons/ban';
import { Cash as CashIcon } from '../icons/cash';
import { ShoppingBag as ShoppingBagIcon } from '../icons/shopping-bag';
import { X as XIcon } from '../icons/x';
import gtm from '../lib/gtm';

const stats = [
  {
    content: '$25,100.00',
    icon: BanIcon,
    iconColor: 'error.main',
    label: 'Unsold Products'
  },
  {
    content: '$25,100.00',
    icon: CashIcon,
    iconColor: 'success.main',
    label: 'Market Price Value'
  },
  {
    content: '$25,100.00',
    icon: ShoppingBagIcon,
    iconColor: 'warning.main',
    label: 'Retail Value'
  },
  {
    content: '$25,100.00',
    icon: XIcon,
    iconColor: 'info.main',
    label: 'Unrealized Profit'
  }
];

export const ReportsSales = () => {
  useEffect(() => {
    gtm.push({ event: 'page_view' });
  }, []);

  return (
    <>
      <Helmet>
        <title>Reports: Sales | Carpatin Dashboard</title>
      </Helmet>
      <Box sx={{ backgroundColor: 'background.default' }}>
        <Grid
          container
          spacing={3}
        >
          <Grid
            item
            xs={12}
          >
            <PerformanceIndicators />
          </Grid>
          <Grid
            container
            item
            spacing={3}
            md={4}
            xs={12}
          >
            {stats.map((item) => {
              const { icon: Icon, iconColor, content, label } = item;

              return (
                <Grid
                  item
                  key={label}
                  md={12}
                  sm={6}
                  xs={12}
                >
                  <Card
                    variant="outlined"
                    sx={{
                      alignItems: 'center',
                      borderRadius: 1,
                      display: 'flex',
                      p: 2
                    }}
                  >
                    <Icon sx={{ color: iconColor || 'text.secondary' }} />
                    <Box sx={{ ml: 2 }}>
                      <Typography
                        color="textSecondary"
                        variant="overline"
                      >
                        {label}
                      </Typography>
                      <Typography
                        color="textPrimary"
                        variant="h6"
                      >
                        {content}
                      </Typography>
                    </Box>
                  </Card>
                </Grid>
              );
            })}
          </Grid>
          <Grid
            item
            md={8}
            xs={12}
          >
            <ProductsBreakdown />
          </Grid>
        </Grid>
      </Box>
    </>
  );
};
