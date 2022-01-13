import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';
import { Avatar, Box, Button, Card, CardActions, Divider, Typography } from '@material-ui/core';
import { ArrowRight as ArrowRightIcon } from '../../icons/arrow-right';

export const SummaryItem = (props) => {
  const { content, icon: Icon, iconColor, label, linkHref, linkLabel, ...other } = props;

  return (
    <Card
      sx={{ height: '100%' }}
      variant="outlined"
      {...other}
    >
      <Box
        sx={{
          alignItems: 'center',
          display: 'flex',
          p: 2
        }}
      >
        {Icon && (
          <Box
            sx={{
              display: 'flex',
              mr: 2
            }}
          >
            <Avatar
              sx={{
                backgroundColor: 'primary.main',
                height: 56,
                width: 56
              }}
            >
              <Icon sx={{ color: 'primary.contrastText' }} />
            </Avatar>
          </Box>
        )}
        <div>
          <Typography
            color="textSecondary"
            variant="overline"
          >
            {label}
          </Typography>
          <Typography
            color="textPrimary"
            variant="h6"
          >
            {content}
          </Typography>
        </div>
      </Box>
      <Divider />
      <CardActions
        sx={{
          px: 3,
          py: 1
        }}
      >
        <Button
          color="primary"
          component={RouterLink}
          endIcon={<ArrowRightIcon fontSize="small" />}
          size="small"
          to={linkHref}
          variant="text"
        >
          {linkLabel}
        </Button>
      </CardActions>
    </Card>
  );
};

SummaryItem.propTypes = {
  content: PropTypes.string.isRequired,
  icon: PropTypes.elementType,
  iconColor: PropTypes.string,
  label: PropTypes.string.isRequired,
  linkHref: PropTypes.string.isRequired,
  linkLabel: PropTypes.string.isRequired
};
