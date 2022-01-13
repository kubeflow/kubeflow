import PropTypes from 'prop-types';
import {
  Box,
  ButtonBase,
  List,
  ListItem,
  ListItemText,
  Popover,
  Typography
} from '@material-ui/core';
import { usePopover } from '../hooks/use-popover';
import { Selector as SelectorIcon } from '../icons/selector';

export const OrganizationPopover = (props) => {
  const { currentOrganization, organizations, onOrganizationChange, sx, ...other } = props;
  const [anchorRef, open, handleOpen, handleClose] = usePopover();

  const handleOrganizationChange = (organizationId) => {
    handleClose();
    onOrganizationChange?.(organizationId);
  };

  return (
    <>
      <ButtonBase
        onClick={handleOpen}
        ref={anchorRef}
        sx={{
          borderRadius: 1,
          display: 'flex',
          p: 1,
          width: 180,
          '&:hover': {
            backgroundColor: 'rgba(255,255,255,0.1)'
          },
          ...sx
        }}
        {...other}
      >
        <Typography
          color="textSecondary"
          sx={{
            color: 'primary.contrastText',
            mr: 3
          }}
          variant="subtitle2"
        >
          {currentOrganization.name}
        </Typography>
        <Box sx={{ flexGrow: 1 }} />
        <SelectorIcon fontSize="small" />
      </ButtonBase>
      <Popover
        anchorEl={anchorRef.current}
        anchorOrigin={{
          horizontal: 'left',
          vertical: 'bottom'
        }}
        keepMounted
        onClose={handleClose}
        open={open}
        PaperProps={{
          sx: { width: 200 }
        }}
      >
        <List>
          {organizations.map((organization) => (
            <ListItem
              key={organization.id}
              button
              selected={organization.id === currentOrganization.id}
              onClick={() => handleOrganizationChange(organization.id)}
            >
              <ListItemText primary={organization.name} />
            </ListItem>
          ))}
        </List>
      </Popover>
    </>
  );
};

OrganizationPopover.propTypes = {
  currentOrganization: PropTypes.object.isRequired,
  onOrganizationChange: PropTypes.func,
  organizations: PropTypes.array.isRequired,
  sx: PropTypes.object
};
