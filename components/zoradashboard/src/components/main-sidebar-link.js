import PropTypes from 'prop-types';
import { Button } from '@material-ui/core';

export const MainSidebarLink = (props) => {
  const { component, to, label, sx, ...other } = props;

  return (
    <li>
      <Button
        component={component}
        color="inherit"
        sx={{
          alignItems: 'center',
          justifyContent: 'space-between',
          display: 'flex',
          width: '100%',
          ...sx
        }}
        to={to}
        variant="text"
        {...other}
      >
        {label}
      </Button>
    </li>
  );
};

MainSidebarLink.propTypes = {
  component: PropTypes.elementType,
  label: PropTypes.string,
  sx: PropTypes.object,
  to: PropTypes.string
};
