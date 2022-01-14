import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link as RouterLink } from 'react-router-dom';
import { Box, Button,Container, Typography, useMediaQuery } from '@material-ui/core';
import { Wizard } from '../components/wizard';
import { ArrowLeft as ArrowLeftIcon } from '../icons/arrow-left';
import gtm from '../lib/gtm';

export const StreamClusterCreate = () => {
  const mdDown = useMediaQuery((theme) => theme.breakpoints.down('md'));

  useEffect(() => {
    gtm.push({ event: 'page_view' });
  }, []);

  return (
    <>
      <Helmet>
        <title>Streams: Create | Zora Cloud</title>
      </Helmet>
      <Box
        sx={{
          backgroundColor: 'background.default',
          flexGrow: 1
        }}
      >
        <Container maxWidth="lg">
          <Box sx={{ py: 4 }}>
              <Box sx={{ mb: 2 }}>
                <Button
                  color="primary"
                  component={RouterLink}
                  startIcon={<ArrowLeftIcon />}
                  to="/dashboard/streams"
                  variant="text"
                >
                  Clusters
                </Button>
              </Box>
              <Typography
                color="textPrimary"
                variant="h4"
              >
                Create Cluster 
              </Typography>
          </Box>
          {/* <Typography
            color="textPrimary"
            sx={{ mb: 6 }}
            variant="h4"
          >
            Onboarding
          </Typography> */}
          <Wizard />
          {/* {!mdDown && (
            <>
              <Typography
                color="textPrimary"
                sx={{
                  mb: 2,
                  mt: 5
                }}
                variant="h6"
              >
                Horizontal Stepper
              </Typography>
              <Wizard orientation="vertical" />
            </>
          )} */}
        </Container>
      </Box>
    </>
  );
};
