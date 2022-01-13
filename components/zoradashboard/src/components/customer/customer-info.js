import PropTypes from 'prop-types';
import toast from 'react-hot-toast';
import { Avatar, Box, Button, Card, CardHeader, Divider, IconButton } from '@material-ui/core';
import { useDialog } from '../../hooks/use-dialog';
import { ExternalLink as ExternalLinkIcon } from '../../icons/external-link';
import { Eye as EyeIcon } from '../../icons/eye';
import { Trash as TrashIcon } from '../../icons/trash';
import { ActionList } from '../action-list';
import { ActionListItem } from '../action-list-item';
import { ConfirmationDialog } from '../confirmation-dialog';
import { PropertyList } from '../property-list';
import { PropertyListItem } from '../property-list-item';

export const CustomerInfo = (props) => {
  const { customer, onEdit, ...other } = props;
  const [deleteDialogOpen, handleOpenDeleteDialog, handleCloseDeleteDialog] = useDialog();

  const handlePreview = () => {
    toast.error('This action is not available on demo');
  };

  const handleDelete = () => {
    handleCloseDeleteDialog();
    toast.error('This action is not available on demo');
  };

  return (
    <>
      <Card
        variant="outlined"
        {...other}
      >
        <CardHeader
          action={(
            <Button
              color="primary"
              onClick={onEdit}
              variant="text"
            >
              Edit
            </Button>
          )}
          title="Contact Info"
        />
        <Divider />
        <Box
          sx={{
            alignItems: 'center',
            display: 'flex',
            px: 3,
            py: 1.5
          }}
        >
          <Avatar
            alt={customer.fullName}
            src={customer.avatar}
            sx={{
              height: 64,
              mr: 1,
              width: 64
            }}
            variant="rounded"
          />
          <IconButton color="inherit">
            <ExternalLinkIcon />
          </IconButton>
        </Box>
        <PropertyList>
          <PropertyListItem
            divider
            label="Full Name"
            value={customer.fullName}
          />
          <PropertyListItem
            divider
            label="Email address"
            value={customer.email}
          />
          <PropertyListItem
            divider
            label="Phone"
            value={customer.phone}
          />
          <PropertyListItem
            divider
            label="Full Address"
            value={customer.address}
          />
          <PropertyListItem
            label="Location"
            value={customer.country}
          />
        </PropertyList>
        <Divider />
        <ActionList>
          <ActionListItem
            icon={EyeIcon}
            onClick={handlePreview}
            label="Preview"
          />
          <ActionListItem
            icon={TrashIcon}
            label="Delete User Data"
            onClick={handleOpenDeleteDialog}
          />
        </ActionList>
      </Card>
      <ConfirmationDialog
        message="Are you sure you want to delete the user data? This can't be undone."
        onCancel={handleCloseDeleteDialog}
        onConfirm={handleDelete}
        open={deleteDialogOpen}
        title="Delete user data"
        variant="error"
      />
    </>
  );
};

CustomerInfo.propTypes = {
  onEdit: PropTypes.func,
  customer: PropTypes.object.isRequired
};
