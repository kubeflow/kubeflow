import PropTypes from 'prop-types';
import { Box, Typography } from '@material-ui/core';
import { StatusBadge } from './status-badge';

export const Status = (props) => {
  const { color, label, ...other } = props;

  return (
    <Box
      sx={{
        alignItems: 'center',
        display: 'flex'
      }}
      {...other}
    >
      <StatusBadge color={color} />
      <Typography
        sx={{
          color,
          ml: 1.75
        }}
        variant="body2"
      >
        {label}
      </Typography>
    </Box>
  );
};

Status.propTypes = {
  color: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired
};
