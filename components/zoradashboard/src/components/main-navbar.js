import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';
import { AppBar, Box, Container, IconButton, List } from '@material-ui/core';
import { lightNeutral } from '../colors';
import { Menu as MenuIcon } from '../icons/menu';
import { Logo } from './logo';
import { MainNavbarLink } from './main-navbar-link';
import { PagesDropdown } from './pages-dropdown';

export const MainNavbar = (props) => {
  const { onOpenSidebar } = props;

  return (
    <AppBar
      elevation={0}
      sx={{ backgroundColor: lightNeutral[900] }}
    >
      <Container
        maxWidth="lg"
        sx={{
          alignItems: 'center',
          color: '#ffffff',
          display: 'flex',
          height: 64,
          position: 'relative'
        }}
      >
        <RouterLink to="/">
          <Logo variant="light" />
        </RouterLink>
        <Box sx={{ flexGrow: 1 }} />
        <IconButton
          color="inherit"
          onClick={onOpenSidebar}
          sx={{
            display: {
              md: 'none'
            }
          }}
        >
          <MenuIcon fontSize="small" />
        </IconButton>
        <List
          disablePadding
          sx={{
            display: {
              md: 'flex',
              xs: 'none'
            },
            position: 'static'
          }}
        >
          <MainNavbarLink
            label="Pages"
            dropdown={<PagesDropdown />}
          />
          <MainNavbarLink
            component={RouterLink}
            label="Live Demo"
            to="/dashboard"
          />
          <MainNavbarLink
            component={RouterLink}
            label="Docs"
            to="/docs"
          />
        </List>
      </Container>
    </AppBar>
  );
};

MainNavbar.propTypes = {
  onOpenSidebar: PropTypes.func
};
