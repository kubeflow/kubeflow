import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import {
  Box,
  Breadcrumbs,
  Button,
  Card,
  Container,
  Grid,
  Link,
  Typography
} from '@material-ui/core';
import { ArrowLeft as ArrowLeftIcon } from '../icons/arrow-left';
import { Calendar as CalendarIcon } from '../icons/calendar';
import { Link as LinkIcon } from '../icons/link';
import { OfficeBuilding as OfficeBuildingIcon } from '../icons/office-building';
import { Plus as PlusIcon } from '../icons/plus';
import gtm from '../lib/gtm';

export const ComponentsPageHeaders = () => {
  useEffect(() => {
    gtm.push({ event: 'page_view' });
  }, []);

  return (
    <>
      <Helmet>
        <title>Components: Page Headers | Carpatin Dashboard</title>
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
            Page Headers
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
                Simple page header with action button
              </Typography>
              <Card
                sx={{ px: 3 }}
                variant="outlined"
              >
                <Box sx={{ py: 4 }}>
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
                      Customers
                    </Typography>
                    <Box sx={{ flexGrow: 1 }} />
                    <Button
                      color="primary"
                      startIcon={<PlusIcon fontSize="small" />}
                      variant="contained"
                      size="large"
                    >
                      Add
                    </Button>
                  </Box>
                </Box>
              </Card>
            </div>
            <div>
              <Typography
                color="textPrimary"
                sx={{ mb: 2 }}
                variant="body1"
              >
                Page header with back button, stats and actions
              </Typography>
              <Card
                sx={{ px: 3 }}
                variant="outlined"
              >
                <Box sx={{ py: 4 }}>
                  <Box sx={{ mb: 2 }}>
                    <Button
                      color="primary"
                      startIcon={<ArrowLeftIcon />}
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
                      Natalie Rusell
                    </Typography>
                    <Box sx={{ flexGrow: 1 }} />
                    <Button
                      color="primary"
                      startIcon={<PlusIcon fontSize="small" />}
                      variant="contained"
                      size="large"
                    >
                      Add
                    </Button>
                  </Box>
                  <Grid
                    container
                    spacing={2}
                    sx={{ mt: 2 }}
                    wrap="wrap"
                  >
                    <Grid
                      item
                      sx={{
                        alignItems: 'center',
                        display: 'flex',
                        width: {
                          md: 'auto',
                          xs: '100%'
                        }
                      }}
                    >
                      <CalendarIcon
                        fontSize="small"
                        sx={{ color: 'text.secondary' }}
                      />
                      <Typography
                        color="textSecondary"
                        sx={{ ml: 0.5 }}
                        variant="body2"
                      >
                        Since 21 Apr 2021
                      </Typography>
                    </Grid>
                    <Grid
                      item
                      sx={{
                        alignItems: 'center',
                        display: 'flex',
                        width: {
                          md: 'auto',
                          xs: '100%'
                        }
                      }}
                    >
                      <OfficeBuildingIcon
                        fontSize="small"
                        sx={{ color: 'text.secondary' }}
                      />
                      <Typography
                        color="textSecondary"
                        sx={{ ml: 0.5 }}
                        variant="body2"
                      >
                        Berlin, Germany
                      </Typography>
                    </Grid>
                    <Grid
                      item
                      sx={{
                        alignItems: 'center',
                        display: 'flex',
                        width: {
                          md: 'auto',
                          xs: '100%'
                        }
                      }}
                    >
                      <LinkIcon
                        fontSize="small"
                        sx={{ color: 'text.secondary' }}
                      />
                      <Typography
                        color="textSecondary"
                        sx={{ ml: 0.5 }}
                        variant="body2"
                      >
                        Twitter
                      </Typography>
                    </Grid>
                  </Grid>
                </Box>
              </Card>
            </div>
            <div>
              <Typography
                color="textPrimary"
                sx={{
                  mb: 2
                }}
                variant="body1"
              >
                Page header with back button, breadcrumbs and actions
              </Typography>
              <Card
                sx={{ px: 3 }}
                variant="outlined"
              >
                <Box sx={{ py: 4 }}>
                  <Box sx={{ mb: 2 }}>
                    <Breadcrumbs separator="•">
                      <Link
                        color="textSecondary"
                        href="#"
                        underline="hover"
                      >
                        Home
                      </Link>
                      <Link
                        color="textSecondary"
                        href="#"
                        underline="hover"
                      >
                        Customers
                      </Link>
                      <Typography color="textPrimary">
                        Pending
                      </Typography>
                    </Breadcrumbs>
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
                      Natalie Rusell
                    </Typography>
                    <Box sx={{ flexGrow: 1 }} />
                    <Button
                      color="primary"
                      startIcon={<PlusIcon fontSize="small" />}
                      variant="contained"
                      size="large"
                    >
                      Add
                    </Button>
                  </Box>
                </Box>
              </Card>
            </div>
          </Box>
        </Container>
      </Box>
    </>
  );
};
