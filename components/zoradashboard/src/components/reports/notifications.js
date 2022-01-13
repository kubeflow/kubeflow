import {
  Card,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
  Typography
} from '@material-ui/core';
import { Cube as CubeIcon } from '../../icons/cube';
import { ArrowRight as ArrowRightIcon } from '../../icons/arrow-right';
import { Users as UsersIcon } from '../../icons/users';
import { Cash as CashIcon } from '../../icons/cash';

export const Notifications = () => (
  <Card variant="outlined">
    <List>
      <ListItem divider>
        <ListItemIcon>
          <CubeIcon sx={{ color: 'text.secondary' }} />
        </ListItemIcon>
        <ListItemText
          primary={(
            <Typography
              color="inherit"
              variant="body2"
            >
              <Typography
                color="inherit"
                component="span"
                variant="subtitle2"
              >
                3 pending orders
              </Typography>
              {' '}
              needs your attention.
            </Typography>
          )}
        />
        <ListItemSecondaryAction>
          <IconButton size="small">
            <ArrowRightIcon fontSize="small" />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
      <ListItem divider>
        <ListItemIcon>
          <UsersIcon sx={{ color: 'text.secondary' }} />
        </ListItemIcon>
        <ListItemText
          primary={(
            <Typography
              color="inherit"
              variant="body2"
            >
              <Typography
                color="inherit"
                component="span"
                variant="subtitle2"
              >
                1 team notes
              </Typography>
              {' '}
              at the
              {' '}
              <Typography
                color="inherit"
                component="span"
                variant="subtitle2"
              >
                Natalie Rusell.
              </Typography>
            </Typography>
          )}
        />
        <ListItemSecondaryAction>
          <IconButton size="small">
            <ArrowRightIcon fontSize="small" />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
      <ListItem>
        <ListItemIcon>
          <CashIcon sx={{ color: 'text.secondary' }} />
        </ListItemIcon>
        <ListItemText
          primary={(
            <Typography
              color="inherit"
              variant="body2"
            >
              <Typography
                color="inherit"
                component="span"
                variant="subtitle2"
              >
                3 pending transactions
              </Typography>
              {' '}
              needs your attention.
            </Typography>
          )}
        />
        <ListItemSecondaryAction>
          <IconButton size="small">
            <ArrowRightIcon fontSize="small" />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
    </List>
  </Card>
);
