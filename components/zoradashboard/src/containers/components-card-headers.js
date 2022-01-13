import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import {
  Box,
  Button,
  Card,
  CardHeader,
  Container,
  IconButton,
  Typography
} from '@material-ui/core';
import { ChevronDown as ChevronDownIcon } from '../icons/chevron-down';
import { DotsVertical as DotsVerticalIcon } from '../icons/dots-vertical';
import gtm from '../lib/gtm';

export const ComponentsCardHeaders = () => {
  useEffect(() => {
    gtm.push({ event: 'page_view' });
  }, []);

  return (
    <>
      <Helmet>
        <title>Components: Card Headers | Carpatin Dashboard</title>
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
            Card Headers
          </Typography>
          <Box
            sx={{
              display: 'grid',
              gap: 5,
              gridAutoFlow: 'row'
            }}
          >
            <div>
              <Typography
                color="textPrimary"
                sx={{ mb: 2 }}
                variant="body1"
              >
                Simple card header
              </Typography>
              <Card variant="outlined">
                <CardHeader title="Orders" />
              </Card>
            </div>
            <div>
              <Typography
                color="textPrimary"
                sx={{ mb: 2 }}
                variant="body1"
              >
                Simple card header with description
              </Typography>
              <Card variant="outlined">
                <CardHeader
                  subheader="List of the latest orders"
                  title="Orders"
                />
              </Card>
            </div>
            <div>
              <Typography
                color="textPrimary"
                sx={{ mb: 2 }}
                variant="body1"
              >
                Card header with actions
              </Typography>
              <Card variant="outlined">
                <CardHeader
                  action={(
                    <div>
                      <Button
                        color="primary"
                        endIcon={<ChevronDownIcon fontSize="small" />}
                        size="small"
                        variant="text"
                      >
                        Most recent
                      </Button>
                      <IconButton size="small">
                        <DotsVerticalIcon fontSize="small" />
                      </IconButton>
                    </div>
                  )}
                  subheader="List of the latest orders"
                  sx={{
                    '& .MuiCardHeader-action': {
                      alignSelf: 'center'
                    }
                  }}
                  title="Orders"
                />
              </Card>
            </div>
          </Box>
        </Container>
      </Box>
    </>
  );
};
