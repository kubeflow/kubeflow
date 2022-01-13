import { useState, useEffect, useCallback } from 'react';
import { Helmet } from 'react-helmet-async';
import { Box, Button, Card, List, Skeleton } from '@material-ui/core';
import { customerApi } from '../api/customer';
import { CustomerActivityItem } from '../components/customer/customer-activity-item';
import { ResourceError } from '../components/resource-error';
import { ResourceUnavailable } from '../components/resource-unavailable';
import { useMounted } from '../hooks/use-mounted';
import { ChevronDown as ChevronDownIcon } from '../icons/chevron-down';
import gtm from '../lib/gtm';

export const CustomerActivity = () => {
  const mounted = useMounted();
  const [activitiesState, setActivitiesState] = useState({ isLoading: true });

  const getActivities = useCallback(async () => {
    setActivitiesState(() => ({ isLoading: true }));

    try {
      const result = await customerApi.getCustomerActivities();

      if (mounted.current) {
        setActivitiesState(() => ({
          isLoading: false,
          data: result
        }));
      }
    } catch (err) {
      console.error(err);

      if (mounted.current) {
        setActivitiesState(() => ({
          isLoading: false,
          error: err.message
        }));
      }
    }
  }, []);

  useEffect(() => {
    getActivities().catch(console.error);
  }, []);

  useEffect(() => {
    gtm.push({ event: 'page_view' });
  }, []);

  const displayLoading = activitiesState.isLoading;
  const displayError = Boolean(!activitiesState.isLoading && activitiesState.error);
  const displayUnavailable = Boolean(!activitiesState.isLoading
    && !activitiesState.error
    && !activitiesState.data?.length);
  const disableLoadMore = Boolean(activitiesState.isLoading || activitiesState.error);

  return (
    <>
      <Helmet>
        <title>Customer: Activity | Carpatin Dashboard</title>
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
          <List disablePadding>
            {activitiesState.data?.map((activity) => (
              <CustomerActivityItem
                divider
                key={activity.id}
                {...activity}
              />
            ))}
          </List>
          {displayLoading && (
            <Box sx={{ p: 2 }}>
              <Skeleton height={42} />
              <Skeleton height={42} />
              <Skeleton height={42} />
            </Box>
          )}
          {displayError && (
            <ResourceError
              error={activitiesState.error}
              sx={{ m: 2 }}
            />
          )}
          {displayUnavailable && <ResourceUnavailable sx={{ m: 2 }} />}
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              mt: 'auto',
              p: 2
            }}
          >
            <Button
              color="primary"
              disabled={disableLoadMore}
              endIcon={<ChevronDownIcon />}
              variant="text"
            >
              Load more
            </Button>
          </Box>
        </Card>
      </Box>
    </>
  );
};
