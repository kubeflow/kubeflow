import PropTypes from 'prop-types';
import { Droppable } from 'react-beautiful-dnd';
import { Box, Divider, Typography } from '@material-ui/core';
import { StatusBadge } from '../status-badge';
import { OrderDraggable } from './order-draggable';

export const OrderDroppable = (props) => {
  const { badgeColor, id, orders, title, ...other } = props;

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        flexGrow: 1,
        maxWidth: 400,
        minWidth: 400,
        '& + &': {
          borderLeft: (theme) => `1px solid ${theme.palette.divider}`
        }
      }}
      {...other}
    >
      <Box
        sx={{
          alignItems: 'center',
          display: 'flex',
          px: 3,
          py: 2.5
        }}
      >
        <StatusBadge
          color={badgeColor}
          sx={{ mr: 2 }}
        />
        <Typography
          color="textSecondary"
          variant="overline"
          whiteSpace="nowrap"
        >
          {title}
        </Typography>
      </Box>
      <Divider />
      <Droppable droppableId={id}>
        {(provided) => (
          <Box
            ref={provided.innerRef}
            sx={{
              flexGrow: 1,
              p: 2
            }}
            {...provided.droppableProps}
          >
            {orders.map((order, index) => (
              <OrderDraggable
                badgeColor={badgeColor}
                key={order.id}
                index={index}
                order={order}
              />
            ))}
            {provided.placeholder}
          </Box>
        )}
      </Droppable>
    </Box>
  );
};

OrderDroppable.propTypes = {
  badgeColor: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  orders: PropTypes.array.isRequired,
  title: PropTypes.string.isRequired
};
