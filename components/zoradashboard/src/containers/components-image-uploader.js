import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Box, Container, Typography } from '@material-ui/core';
import { ImagesUploader } from '../components/images-uploader';
import gtm from '../lib/gtm';

export const ComponentsImageUploader = () => {
  useEffect(() => {
    gtm.push({ event: 'page_view' });
  }, []);

  return (
    <>
      <Helmet>
        <title>Components: Image Uploader| Carpatin Dashboard</title>
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
            Image Uploader
          </Typography>
          <div>
            <Typography
              color="textPrimary"
              sx={{ mb: 2 }}
              variant="body1"
            >
              Multiple image selector. Click the Browse button below.
            </Typography>
            <ImagesUploader />
          </div>
        </Container>
      </Box>
    </>
  );
};
