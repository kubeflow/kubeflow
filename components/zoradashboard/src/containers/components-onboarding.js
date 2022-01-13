import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Box, Container, Typography, useMediaQuery } from '@material-ui/core';
import { Wizard } from '../components/wizard';
import gtm from '../lib/gtm';

export const ComponentsOnboarding = () => {
  const mdDown = useMediaQuery((theme) => theme.breakpoints.down('md'));

  useEffect(() => {
    gtm.push({ event: 'page_view' });
  }, []);

  return (
    <>
      <Helmet>
        <title>Components: Onboarding | Carpatin Dashboard</title>
      </Helmet>
      <Box
        sx={{
          backgroundColor: 'background.default',
          flexGrow: 1,
          py: 4
        }}
      >
        <Container maxWidth="lg">
          <Typography
            color="textPrimary"
            sx={{ mb: 6 }}
            variant="h4"
          >
            Onboarding
          </Typography>
          <Typography
            color="textPrimary"
            sx={{ mb: 2 }}
            variant="h6"
          >
            Vertical Stepper
          </Typography>
          <Wizard />
          {!mdDown && (
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
          )}
        </Container>
      </Box>
    </>
  );
};
