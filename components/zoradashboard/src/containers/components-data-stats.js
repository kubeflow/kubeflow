import { useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  Container,
  Divider,
  Grid,
  Typography
} from '@material-ui/core';
import { ArrowRight as ArrowRightIcon } from '../icons/arrow-right';
import { LockClosed as LockClosedIcon } from '../icons/lock-closed';
import { ReceiptTax as ReceiptTaxIcon } from '../icons/receipt-tax';
import { Users as UsersIcon } from '../icons/users';
import gtm from '../lib/gtm';

const stats1 = [
  {
    content: '3450',
    icon: UsersIcon,
    label: 'Users',
    linkHref: '#',
    linkLabel: 'Orders'
  },
  {
    content: '68',
    icon: LockClosedIcon,
    label: 'Logins',
    linkHref: '#',
    linkLabel: 'Products'
  },
  {
    content: '3120',
    icon: ReceiptTaxIcon,
    label: 'Invoices',
    linkHref: '#',
    linkLabel: 'Transactions'
  }
];

const stats2 = [
  {
    content: '2',
    label: 'Pending'
  },
  {
    content: '2',
    label: 'Ongoing'
  },
  {
    content: '6',
    label: 'In progress'
  },
  {
    content: '21',
    label: 'Complete'
  }
];

export const ComponentsDataStats = () => {
  useEffect(() => {
    gtm.push({ event: 'page_view' });
  }, []);

  return (
    <>
      <Helmet>
        <title>Components: Data Stats | Carpatin Dashboard</title>
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
            Data Stats
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
                Simple stats with icon and links
              </Typography>
              <Grid
                container
                spacing={3}
              >
                {stats1.map((item) => {
                  const { content, icon: Icon, label, linkHref, linkLabel } = item;

                  return (
                    <Grid
                      item
                      md={4}
                      xs={12}
                      key={label}
                    >
                      <Card
                        sx={{ height: '100%' }}
                        variant="outlined"
                      >
                        <Box
                          sx={{
                            alignItems: 'center',
                            display: 'flex',
                            p: 2
                          }}
                        >
                          <Box
                            sx={{
                              display: 'flex',
                              mr: 2
                            }}
                          >
                            <Avatar
                              sx={{
                                backgroundColor: 'primary.main',
                                height: 56,
                                width: 56
                              }}
                            >
                              <Icon sx={{ color: 'primary.contrastText' }} />
                            </Avatar>
                          </Box>
                          <div>
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
                          </div>
                        </Box>
                        <Divider />
                        <CardActions
                          sx={{
                            px: 3,
                            py: 1
                          }}
                        >
                          <Button
                            color="primary"
                            component={RouterLink}
                            endIcon={<ArrowRightIcon fontSize="small" />}
                            size="small"
                            to={linkHref}
                            variant="text"
                          >
                            {linkLabel}
                          </Button>
                        </CardActions>
                      </Card>
                    </Grid>
                  );
                })}
              </Grid>
            </div>
            <div>
              <Typography
                color="textPrimary"
                sx={{ mb: 2 }}
                variant="body1"
              >
                Simple stats
              </Typography>
              <Grid
                container
                spacing={3}
              >
                {stats2.map((item) => (
                  <Grid
                    item
                    key={item.label}
                    md={3}
                    sm={6}
                    xs={12}
                  >
                    <Box
                      sx={{
                        alignItems: 'center',
                        backgroundColor: 'neutral.100',
                        borderRadius: 1,
                        p: 2
                      }}
                    >
                      <Typography
                        color="textSecondary"
                        variant="overline"
                      >
                        {item.label}
                      </Typography>
                      <Typography
                        color="textPrimary"
                        variant="h6"
                      >
                        {item.content}
                      </Typography>
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </div>
          </Box>
        </Container>
      </Box>
    </>
  );
};
