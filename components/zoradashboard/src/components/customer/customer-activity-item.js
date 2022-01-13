import PropTypes from 'prop-types';
import { formatDistanceToNowStrict } from 'date-fns';
import { Avatar, Box, ListItem, Typography } from '@material-ui/core';

export const CustomerActivityItem = (props) => {
  const { adminAvatar, adminId, adminName, createdAt, message, type, ...other } = props;

  return (
    <ListItem
      sx={{
        px: 3,
        py: 2.5
      }}
      {...other}
    >
      <Box
        sx={{
          alignItems: 'center',
          display: 'flex'
        }}
      >
        <Avatar
          src={adminAvatar}
          sx={{ mr: 2 }}
        />
        <div>
          <Typography
            color="textSecondary"
            variant="body2"
          >
            <Typography
              color="textPrimary"
              variant="subtitle2"
              component="span"
            >
              {adminName}
            </Typography>
            {' '}
            {message}
          </Typography>
          <Typography
            color="textSecondary"
            variant="caption"
            sx={{ fontWeight: 400 }}
          >
            {formatDistanceToNowStrict(createdAt)}
          </Typography>
        </div>
      </Box>
    </ListItem>
  );
};

CustomerActivityItem.propTypes = {
  adminAvatar: PropTypes.string.isRequired,
  adminId: PropTypes.string.isRequired,
  adminName: PropTypes.string.isRequired,
  createdAt: PropTypes.instanceOf(Date).isRequired,
  message: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired
};
