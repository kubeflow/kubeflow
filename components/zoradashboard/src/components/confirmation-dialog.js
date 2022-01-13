import PropTypes from 'prop-types';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography
} from '@material-ui/core';
import ErrorIcon from '@material-ui/icons/Error';
import WarningIcon from '@material-ui/icons/Warning';
import InfoIcon from '@material-ui/icons/Info';

const icons = {
  error: (
    <ErrorIcon
      color="error"
      fontSize="large"
    />
  ),
  warning: (
    <WarningIcon
      color="warning"
      fontSize="large"
    />
  ),
  info: (
    <InfoIcon
      color="info"
      fontSize="large"
    />
  )
};

export const ConfirmationDialog = (props) => {
  const { message, onCancel, onConfirm, open, title, variant, ...other } = props;

  return (
    <Dialog
      onClose={onCancel}
      open={open}
      PaperProps={{
        sx: {
          width: '100%'
        }
      }}
      {...other}
    >
      <DialogTitle
        sx={{
          alignItems: 'center',
          display: 'flex'
        }}
      >
        {icons[variant]}
        <Typography
          color="inherit"
          sx={{ ml: 2 }}
          variant="inherit"
        >
          {title}
        </Typography>
      </DialogTitle>
      <DialogContent>
        <Typography
          color="textPrimary"
          variant="body1"
        >
          {message}
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button
          color="primary"
          onClick={onCancel}
          variant="text"
        >
          Cancel
        </Button>
        <Button
          color="primary"
          onClick={onConfirm}
          variant="contained"
        >
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
};

ConfirmationDialog.defaultProps = {
  open: false
};

ConfirmationDialog.propTypes = {
  message: PropTypes.string.isRequired,
  onCancel: PropTypes.func,
  onConfirm: PropTypes.func,
  open: PropTypes.bool,
  title: PropTypes.string.isRequired,
  variant: PropTypes.oneOf(['error', 'warning', 'info'])
};
