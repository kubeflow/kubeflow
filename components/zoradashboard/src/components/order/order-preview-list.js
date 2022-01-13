import PropTypes from 'prop-types';
import { List } from '@material-ui/core';

export const OrderPreviewList = (props) => {
  const { children, ...other } = props;

  return (
    <List
      disablePadding
      sx={{ width: '100%' }}
      {...other}
    >
      {children}
    </List>
  );
};

OrderPreviewList.propTypes = {
  children: PropTypes.node
};
