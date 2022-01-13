import PropTypes from 'prop-types';
import { Box } from '@material-ui/core';

export const StatusBadge = (props) => {
  const { color, sx, ...other } = props;

  return (
    <Box
      sx={{
        backgroundColor: color,
        borderRadius: '50%',
        height: 8,
        width: 8,
        ...sx
      }}
      {...other}
    />
  );
};

StatusBadge.propTypes = {
  color: PropTypes.string.isRequired,
  sx: PropTypes.object
};
