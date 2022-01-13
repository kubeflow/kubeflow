import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';
import { format } from 'date-fns';
import { Draggable } from 'react-beautiful-dnd';
import { Box, Card, Chip, IconButton, Link } from '@material-ui/core';
import DragIndicatorIcon from '@material-ui/icons/DragIndicator';
import { PropertyList } from '../property-list';
import { PropertyListItem } from '../property-list-item';
import { StatusBadge } from '../status-badge';
import { OrderMenu } from './order-menu';

export const OrderDraggable = (props) => {
  const { badgeColor, index, order, ...other } = props;

  return (
    <Draggable
      draggableId={order.id.toString()}
      index={index}
      {...other}
    >
      {(provided) => (
        <Card
          ref={provided.innerRef}
          sx={{
            minWidth: 360,
            mb: 2
          }}
          variant="outlined"
          {...provided.draggableProps}
        >
          <Box
            sx={{
              alignItems: 'center',
              display: 'flex',
              p: 2
            }}
          >
            <IconButton
              size="small"
              {...provided.dragHandleProps}
            >
              <DragIndicatorIcon fontSize="small" />
            </IconButton>
            <Link
              color="textPrimary"
              component={RouterLink}
              sx={{
                ml: 1,
                mr: 2
              }}
              to="/dashboard/orders/1"
              underline="none"
              variant="h5"
            >
              {`#${order.id}`}
            </Link>
            <StatusBadge color={badgeColor} />
            <Box sx={{ flexGrow: 1 }} />
            <OrderMenu />
          </Box>
          <PropertyList>
            <PropertyListItem
              label="Courier"
              align="horizontal"
            >
              <Chip
                label={order.courier}
                size="small"
              />
            </PropertyListItem>
            <PropertyListItem
              align="horizontal"
              label="Location"
              value={`${order.customer.city}, ${order.customer.country}`}
            />
            <PropertyListItem
              align="horizontal"
              label="Created"
              value={format(new Date(order.createdAt), 'dd MMM yyyy HH:mm')}
            />
          </PropertyList>
        </Card>
      )}
    </Draggable>
  );
};

OrderDraggable.propTypes = {
  badgeColor: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  order: PropTypes.object.isRequired
};
