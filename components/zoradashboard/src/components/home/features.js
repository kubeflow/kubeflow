import { Avatar, Box, Container, Divider, Grid, Typography } from '@material-ui/core';
import { Download as DownloadIcon } from '../../icons/download';
import { Template as TemplateIcon } from '../../icons/template';

const features = [
  {
    description: 'The template comes with Cognito, Firebase, Auth0 and JWT Auth systems installed and configured. Get up and running in a matter of minutes.',
    image: '/static/feature-auth.png',
    name: 'Authentication'
  },
  {
    description: 'Screens come connected to a fake server api client and state management system, and can be hooked to your real server in no time.',
    image: '/static/feature-loading-states.png',
    name: 'Loading and Error states'
  },
  {
    description: 'When it comes to management, it’s important to have good tools for specific needs, so we included a powerful filter system so you won’t have to build one.',
    image: '/static/feature-filters.png',
    name: 'Advanced Filters'
  }
];

export const Features = () => (
  <Box sx={{ py: 15 }}>
    <Container maxWidth="lg">
      <Typography
        align="center"
        color="textPrimary"
        sx={{ mb: 6 }}
        variant="h2"
      >
        Packed with features
      </Typography>
      <Grid
        container
        spacing={3}
        sx={{
          '& img': {
            maxWidth: '100%'
          }
        }}
      >
        {features.map((feature) => (
          <Grid
            item
            key={feature.name}
            md={4}
            xs={12}
          >
            <Box
              sx={{
                backgroundColor: 'neutral.100',
                fontSize: 0
              }}
            >
              <img
                alt={feature.name}
                src={feature.image}
              />
            </Box>
            <Typography
              color="textPrimary"
              sx={{
                mb: 1,
                mt: 3
              }}
              variant="h5"
            >
              {feature.name}
            </Typography>
            <Typography
              color="textSecondary"
              variant="subtitle1"
            >
              {feature.description}
            </Typography>
          </Grid>
        ))}
      </Grid>
      <Divider
        sx={{
          mb: 8,
          mt: 6
        }}
      />
      <Grid container>
        <Grid
          item
          md={6}
          sx={{
            borderRight: (theme) => ({
              md: `1px solid ${theme.palette.divider}`
            }),
            pl: 2,
            pr: {
              md: 5,
              xs: 2
            },
            py: 2
          }}
          xs={12}
        >
          <Avatar
            sx={{
              backgroundColor: 'rgba(255, 126, 70, 1)',
              color: 'primary.contrastText',
              height: 64,
              width: 64
            }}
          >
            <TemplateIcon fontSize="large" />
          </Avatar>
          <Typography
            color="textPrimary"
            sx={{ my: 1 }}
            variant="h5"
          >
            Responsive
          </Typography>
          <Typography
            color="textSecondary"
            variant="subtitle1"
          >
            Fully responsive templates. Layouts are created with mobile in mind
            to make your project ready for any type of end-user.
          </Typography>
        </Grid>
        <Grid
          item
          md={6}
          sx={{
            pl: {
              md: 5,
              xs: 2
            },
            pr: 2,
            py: 2
          }}
          xs={12}
        >

          <Avatar
            sx={{
              backgroundColor: 'rgba(50, 204, 148, 1)',
              color: 'primary.contrastText',
              height: 64,
              width: 64
            }}
          >
            <DownloadIcon fontSize="large" />
          </Avatar>
          <Typography
            color="textPrimary"
            sx={{ my: 1 }}
            variant="h5"
          >
            Free Updates
          </Typography>
          <Typography
            color="textSecondary"
            variant="subtitle1"
          >
            We continuously deploy new updates which include updated dependencies,
            new screens and bug fixes.
          </Typography>
        </Grid>
      </Grid>
    </Container>
  </Box>
);
