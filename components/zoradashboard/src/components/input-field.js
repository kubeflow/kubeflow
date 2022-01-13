import PropTypes from 'prop-types';
import { TextField } from '@material-ui/core';
import { alpha } from '@material-ui/core/styles';

export const InputField = (props) => {
  const { InputProps, sx, ...other } = props;

  return (
    <TextField
      inputProps={{
        sx: {
          alignItems: 'center',
          display: 'flex',
          fontSize: 14,
          height: 'unset',
          lineHeight: 1.6,
          px: 1.5,
          py: 0.75,
          '&.MuiInputBase-inputAdornedStart': {
            pl: 0
          }
        }
      }}
      variant="filled"
      InputLabelProps={{
        shrink: true,
        sx: {
          color: 'text.primary',
          fontSize: 14,
          fontWeight: 500,
          mb: 0.5,
          position: 'relative',
          transform: 'none'
        }
      }}
      sx={{
        '& .MuiFilledInput-root': {
          backgroundColor: 'background.paper',
          borderWidth: 1,
          borderStyle: 'solid',
          borderColor: 'neutral.300',
          borderRadius: 1,
          boxShadow: '0px 1px 2px 0px rgba(9, 30, 66, 0.08)',
          overflow: 'hidden',
          p: 0,
          transition: (theme) => theme.transitions.create([
            'border-color',
            'box-shadow'
          ]),
          '&:before': {
            borderBottom: 0
          },
          '&:hover': {
            backgroundColor: 'background.paper'
          },
          '&.Mui-focused': {
            backgroundColor: 'background.paper',
            boxShadow: (theme) => `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`
          },
          '&.Mui-disabled': {
            backgroundColor: 'action.disabledBackground',
            boxShadow: 'none',
            borderColor: alpha('#D6DBE1', 0.5)
          },
          '.MuiInputAdornment-root.MuiInputAdornment-positionStart.MuiInputAdornment-root:not(.MuiInputAdornment-hiddenLabel)': {
            mt: 0,
            ml: 1.5
          }
        },
        ...sx
      }}
      // eslint-disable-next-line react/jsx-no-duplicate-props
      InputProps={{
        ...InputProps,
        disableUnderline: true
      }}
      {...other}
    />
  );
};

InputField.propTypes = {
  InputProps: PropTypes.object,
  sx: PropTypes.object
};
