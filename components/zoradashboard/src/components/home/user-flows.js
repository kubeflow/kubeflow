import { Link as RouterLink } from 'react-router-dom';
import { Box, Button, Chip, Container, Grid, Typography } from '@material-ui/core';

const items = [
  'Customers',
  'Products',
  'Orders',
  'Invoices',
  'Organization'
];

export const UserFlows = () => (
  <Box
    sx={{
      backgroundColor: 'primary.main',
      py: {
        md: 0,
        xs: 10
      }
    }}
  >
    <Container maxWidth="lg">
      <Grid
        alignItems="center"
        container
      >
        <Grid
          item
          md={6}
          sx={{
            mb: {
              md: 0,
              xs: 6
            }
          }}
          xs={12}
        >
          <Typography
            sx={{ color: 'primary.contrastText' }}
            variant="h1"
          >
            Management User Flows
          </Typography>
          <Typography
            sx={{
              color: 'primary.contrastText',
              fontSize: 22,
              mb: 3,
              mt: 2
            }}
          >
            Rather than a generic template, we focused on management-specific screens to enable
            developers focus on the important part of the development process.
          </Typography>
          <Grid
            container
            spacing={2}
            wrap="wrap"
          >
            {items.map((item) => (
              <Grid
                item
                key={item}
              >
                <Chip
                  label={item}
                  sx={{
                    backgroundColor: 'rgba(255, 255, 255, 0.16)',
                    color: 'primary.contrastText'
                  }}
                />
              </Grid>
            ))}
          </Grid>
          <Button
            component={RouterLink}
            size="large"
            sx={{
              backgroundColor: 'primary.contrastText',
              color: 'primary.main',
              mt: 3,
              '&:hover': {
                backgroundColor: 'primary.contrastText'
              }
            }}
            to="/dashboard"
            variant="contained"
          >
            Live Demo
          </Button>
        </Grid>
        <Grid
          item
          md={6}
          sx={{
            display: {
              md: 'block',
              xs: 'none'
            },
            '& img': {
              display: 'block',
              maxWidth: '100%'
            }
          }}
        >
          <img
            alt="user flows"
            src="/static/screens.png"
          />
        </Grid>
      </Grid>
    </Container>
  </Box>
);
