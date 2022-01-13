import { Link as RouterLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import { AppBar, Box, IconButton, Toolbar } from '@material-ui/core';
import { lightNeutral } from '../../colors';
import { Menu as MenuIcon } from '../../icons/menu';
import { Logo } from '../logo';

export const DocsNavbar = (props) => {
  const { onSidebarMobileOpen } = props;
  return (
    <AppBar
      sx={{
        backgroundColor: lightNeutral[900],
        borderBottom: (theme) => `1px solid ${theme.palette.divider}`,
        boxShadow: 'none',
        color: '#ffffff'
      }}
    >
      <Toolbar sx={{ height: 64 }}>
        <RouterLink to="/">
          <Logo variant="light" />
        </RouterLink>
        <Box sx={{ flexGrow: 1 }} />
        <IconButton
          color="inherit"
          onClick={onSidebarMobileOpen}
          sx={{
            display: {
              lg: 'none'
            }
          }}
        >
          <MenuIcon fontSize="small" />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

DocsNavbar.propTypes = {
  onSidebarMobileOpen: PropTypes.func
};
