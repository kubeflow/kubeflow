import { forwardRef } from 'react';
import PropTypes from 'prop-types';
import SimpleBar from 'simplebar-react';
import { Box } from '@material-ui/core';

export const Scrollbar = forwardRef((props, ref) => {
  const { children, ...other } = props;

  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

  if (isMobile) {
    return (
      <Box
        ref={ref}
        sx={{ overflowX: 'auto' }}
        {...other}
      >
        {children}
      </Box>
    );
  }

  return (
    <SimpleBar
      ref={ref}
      {...other}
    >
      {children}
    </SimpleBar>
  );
});

Scrollbar.propTypes = {
  children: PropTypes.node
};
