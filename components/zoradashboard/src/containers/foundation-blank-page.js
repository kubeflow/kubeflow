import { useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Divider,
  Grid,
  Tab,
  Tabs,
  Typography
} from '@material-ui/core';
import { ArrowLeft as ArrowLeftIcon } from '../icons/arrow-left';
import { ChevronDown as ChevronDownIcon } from '../icons/chevron-down';
import gtm from '../lib/gtm';

export const FoundationBlankPage = () => {
  useEffect(() => {
    gtm.push({ event: 'page_view' });
  }, []);

  return (
    <>
      <Helmet>
        <title>Foundation: Blank Page | Carpatin Dashboard</title>
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
          <Box sx={{ py: 4 }}>
            <Box sx={{ mb: 2 }}>
              <Button
                color="primary"
                component={RouterLink}
                startIcon={<ArrowLeftIcon />}
                to="#"
                variant="text"
              >
                Back
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
                Blank Page
              </Typography>
              <Box sx={{ flexGrow: 1 }} />
              <Button
                color="primary"
                endIcon={<ChevronDownIcon fontSize="small" />}
                size="large"
                variant="contained"
              >
                Actions
              </Button>
            </Box>
            <Tabs
              allowScrollButtonsMobile
              sx={{ mt: 4 }}
              value={0}
              variant="scrollable"
            >
              <Tab
                component={RouterLink}
                label="Tab Content"
                to="#"
              />
              <Tab
                component={RouterLink}
                label="Tab Content"
                to="#"
              />
              <Tab
                component={RouterLink}
                label="Tab Content"
                to="#"
              />
            </Tabs>
            <Divider />
          </Box>
          <Box
            sx={{
              backgroundColor: 'background.default',
              flexGrow: 1
            }}
          >
            <Grid
              container
              spacing={3}
              sx={{ height: '100%' }}
            >
              <Grid
                item
                md={8}
                xs={12}
              >
                <Card
                  sx={{ height: '100%' }}
                  variant="outlined"
                >
                  <CardContent>
                    <Typography
                      color="textPrimary"
                      variant="body1"
                    >
                      Main content
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid
                item
                md={4}
                xs={12}
              >
                <Card
                  sx={{ height: '100%' }}
                  variant="outlined"
                >
                  <CardContent>
                    <Typography
                      color="textPrimary"
                      variant="body1"
                    >
                      Secondary content
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Box>
        </Container>
      </Box>
    </>
  );
};
