import PropTypes from 'prop-types';
import { Button, Menu, MenuItem } from '@material-ui/core';
import { usePopover } from '../hooks/use-popover';
import { ChevronDown as ChevronDownIcon } from '../icons/chevron-down';

export const BulkActionsMenu = (props) => {
  const { disabled, onArchive, onDelete, selectedCount, ...other } = props;
  const [anchorRef, open, handleOpen, handleClose] = usePopover();

  const handleArchive = () => {
    onArchive?.();
    handleClose();
  };

  const handleDelete = () => {
    onDelete?.();
    handleClose();
  };

  return (
    <>
      <Button
        color="primary"
        disabled={disabled}
        onClick={handleOpen}
        ref={anchorRef}
        size="large"
        startIcon={<ChevronDownIcon />}
        variant="outlined"
        {...other}
      >
        Bulk Actions
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
        <MenuItem onClick={handleArchive}>
          {`Archive Selected (${selectedCount})`}
        </MenuItem>
        <MenuItem onClick={handleDelete}>
          {`Delete Selected (${selectedCount})`}
        </MenuItem>
      </Menu>
    </>
  );
};

BulkActionsMenu.propTypes = {
  disabled: PropTypes.bool,
  onArchive: PropTypes.func,
  onDelete: PropTypes.func,
  selectedCount: PropTypes.number
};
