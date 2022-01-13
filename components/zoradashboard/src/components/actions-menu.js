import PropTypes from 'prop-types';
import { Button, Menu, MenuItem } from '@material-ui/core';
import { usePopover } from '../hooks/use-popover';
import { ChevronDown as ChevronDownIcon } from '../icons/chevron-down';

export const ActionsMenu = (props) => {
  const { actions, label, ...other } = props;
  const [anchorRef, open, handleOpen, handleClose] = usePopover();

  return (
    <>
      <Button
        color="primary"
        endIcon={<ChevronDownIcon fontSize="small" />}
        onClick={handleOpen}
        size="large"
        variant="contained"
        ref={anchorRef}
        {...other}
      >
        {label}
      </Button>
      <Menu
        anchorEl={anchorRef.current}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right'
        }}
        open={open}
        onClose={handleClose}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
      >
        {actions.map((item) => (
          <MenuItem
            key={item.label}
            onClick={() => {
              if (item.onClick) {
                item.onClick();
              }

              handleClose();
            }}
          >
            {item.label}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};

ActionsMenu.defaultProps = {
  label: 'Actions'
};

ActionsMenu.propTypes = {
  actions: PropTypes.array.isRequired,
  label: PropTypes.string
};
