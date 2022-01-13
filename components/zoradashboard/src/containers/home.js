import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Box, Container, Grid, Typography } from '@material-ui/core';
import { Faqs } from '../components/home/faqs';
import { Features } from '../components/home/features';
import { FreeDemo } from '../components/home/free-demo';
import { Hero } from '../components/home/hero';
import { Pricing } from '../components/home/pricing';
import { Support } from '../components/home/support';
import { UserFlows } from '../components/home/user-flows';
import gtm from '../lib/gtm';

const companies = [
  {
    icon: '/static/company-bolt.svg',
    name: 'bolt'
  },
  {
    icon: '/static/company-samsung.svg',
    name: 'samsung'
  },
  {
    icon: '/static/company-ford.svg',
    name: 'ford'
  },
  {
    icon: '/static/company-bd.svg',
    name: 'bd'
  },
  {
    icon: '/static/company-mbank.svg',
    name: 'mbank'
  },
  {
    icon: '/static/company-lockheed_martin.svg',
    name: 'lockheed martin'
  }
];

export const Home = () => {
  useEffect(() => {
    gtm.push({ event: 'page_view' });
  }, []);

  return (
    <>
      <Helmet>
        <title>Home | Carpatin Dashboard</title>
      </Helmet>
      <Box sx={{ backgroundColor: 'background.default' }}>
        <Hero />
        <Support />
        <Features />
        <UserFlows />
        <FreeDemo />
        <Pricing />
        <Faqs />
        <Container
          maxWidth="md"
          sx={{
            alignItems: 'center',
            display: 'flex',
            flexDirection: 'column',
            pb: 15
          }}
        >
          <Typography
            color="textSecondary"
            component="p"
            sx={{ mb: 3 }}
            variant="overline"
          >
            Some of our customers
          </Typography>
          <Grid
            container
            spacing={2}
            wrap="wrap"
            justifyContent="center"
          >
            {companies.map((company) => (
              <Grid
                item
                key={company.name}
              >
                <img
                  alt={company.name}
                  src={company.icon}
                />
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
    </>
  );
};
