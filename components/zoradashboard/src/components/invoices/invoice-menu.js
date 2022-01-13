import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { IconButton, Menu, MenuItem } from '@material-ui/core';
import { usePopover } from '../../hooks/use-popover';
import { DotsVertical as DotsVerticalIcon } from '../../icons/dots-vertical';

export const InvoiceMenu = (props) => {
  const navigate = useNavigate();
  const [anchorRef, open, handleOpen, handleClose] = usePopover();

  const handleEdit = () => {
    handleClose();
    navigate('/dashboard/invoices/1');
  };

  const handleReport = () => {
    handleClose();
    toast.error('This action is not available on demo');
  };

  const handleDelete = () => {
    handleClose();
    toast.error('This action is not available on demo');
  };

  return (
    <>
      <IconButton
        onClick={handleOpen}
        ref={anchorRef}
        {...props}
      >
        <DotsVerticalIcon fontSize="small" />
      </IconButton>
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
        <MenuItem onClick={handleEdit}>
          View
        </MenuItem>
        <MenuItem onClick={handleReport}>
          Duplicate
        </MenuItem>
        <MenuItem onClick={handleDelete}>
          Delete
        </MenuItem>
      </Menu>
    </>
  );
};
