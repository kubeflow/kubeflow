import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Alert, Box, Card, Grid, useMediaQuery } from '@material-ui/core';
import { OrganizationBillingInfo } from '../components/organization/organization-billing-info';
import { OrganizationBillingPlan } from '../components/organization/organization-billing-plan';
import { PropertyListItem } from '../components/property-list-item';
import gtm from '../lib/gtm';

export const OrganizationBilling = () => {
  const [showAlert, setShowAlert] = useState(true);
  const mdDown = useMediaQuery((theme) => theme.breakpoints.down('md'));

  useEffect(() => {
    gtm.push({ event: 'page_view' });
  }, []);

  const align = mdDown ? 'horizontal' : 'vertical';

  return (
    <>
      <Helmet>
        <title>Organization: Billing | Carpatin Dashboard</title>
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
            <Card variant="outlined">
              <Grid container>
                <Grid
                  item
                  md={4}
                  xs={12}
                >
                  <PropertyListItem
                    align={align}
                    component="div"
                    label="Plan Selected"
                    value="Free"
                  />
                </Grid>
                <Grid
                  item
                  md={4}
                  xs={12}
                >
                  <PropertyListItem
                    align={align}
                    component="div"
                    label="Team members"
                    value="2"
                  />
                </Grid>
                <Grid
                  item
                  md={4}
                  xs={12}
                >
                  <PropertyListItem
                    align={align}
                    component="div"
                    label="Users"
                    value="7000"
                  />
                </Grid>
              </Grid>
            </Card>
          </Grid>
          <Grid
            item
            xs={12}
          >
            <OrganizationBillingInfo />
          </Grid>
          {showAlert && (
            <Grid
              item
              xs={12}
            >
              <Alert
                onClose={() => setShowAlert(false)}
                severity="info"
              >
                You will be charged starting 07/22/2021
              </Alert>
            </Grid>
          )}
          <Grid
            item
            xs={12}
          >
            <OrganizationBillingPlan />
          </Grid>
        </Grid>
      </Box>
    </>
  );
};
