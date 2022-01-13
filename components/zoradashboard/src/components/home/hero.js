import { Box, Button, Container, Grid, Typography } from '@material-ui/core';
import { Link as RouterLink } from 'react-router-dom';

export const Hero = () => (
  <Box
    sx={{
      backgroundColor: 'neutral.100',
      pt: 8
    }}
  >
    <Container maxWidth="md">
      <Typography
        align="center"
        color="textPrimary"
        variant="h1"
      >
        Meet Carpatin - Admin Dashboard
      </Typography>
      <Typography
        align="center"
        color="textSecondary"
        sx={{
          fontSize: 22,
          mb: 5,
          mt: 2
        }}
      >
        Discover how &quot;Carpatin&quot; can speed up your e-commerce business
        development by using our premium jump-start dashboard template!
      </Typography>
      <Grid
        container
        justifyContent="center"
        spacing={2}
        sx={{ mb: 6 }}
        wrap="wrap"
      >
        <Grid item>
          <Button
            color="secondary"
            component="a"
            href="https://material-ui.com/store/items/carpatin-dashboard"
            size="large"
            target="_blank"
            variant="text"
          >
            Purchase Now
          </Button>
        </Grid>
        <Grid item>
          <Button
            color="secondary"
            component={RouterLink}
            size="large"
            to="/dashboard"
            variant="contained"
          >
            Live Demo
          </Button>
        </Grid>
      </Grid>
      <img
        alt="hero"
        src="/static/hero.png"
        style={{
          display: 'block',
          maxWidth: '100%'
        }}
      />
    </Container>
  </Box>
);
