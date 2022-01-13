import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Box, Container, Grid, Paper, Typography } from '@material-ui/core';
import gtm from '../lib/gtm';

export const FoundationShadows = () => {
  useEffect(() => {
    gtm.push({ event: 'page_view' });
  }, []);

  return (
    <>
      <Helmet>
        <title>Foundation: Shadows | Carpatin Dashboard</title>
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
            Shadows
          </Typography>
          <div>
            <Typography
              color="textPrimary"
              sx={{ mb: 4 }}
              variant="body1"
            >
              Carpatin uses shadows as a way to emphasize no more than one container (e.g card)
              on a crowded page. We only make use of elevation-8, elevation-16 and elevation-24.
            </Typography>
            <Grid
              container
              spacing={3}
            >
              {[1, 8, 16, 24].map((value) => (
                <Grid
                  item
                  key={value}
                  md={6}
                  sx={{
                    alignItems: 'center',
                    display: 'flex'
                  }}
                  xs={12}
                >
                  <Paper
                    elevation={value}
                    sx={{
                      alignItems: 'center',
                      display: 'flex',
                      justifyContent: 'center',
                      minHeight: 100,
                      minWidth: 120,
                      mr: 3
                    }}
                  >
                    <Typography
                      color="textPrimary"
                      variant="h1"
                    >
                      {value}
                    </Typography>
                  </Paper>
                  <Typography
                    color="textPrimary"
                    variant="subtitle1"
                  >
                    elevation-
                    {value}
                  </Typography>
                </Grid>
              ))}
            </Grid>
          </div>
        </Container>
      </Box>
    </>
  );
};
