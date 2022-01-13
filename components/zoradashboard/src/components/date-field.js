import PropTypes from 'prop-types';
import { TextField } from '@material-ui/core';
import { alpha } from '@material-ui/core/styles';
import DatePicker from '@material-ui/lab/DatePicker';

export const DateField = (props) => {
  const {
    error,
    fullWidth,
    helperText,
    label,
    onChange,
    placeholder,
    value,
    name,
    ...other
  } = props;

  return (
    <DatePicker
      onChange={onChange}
      renderInput={({ InputProps, ...rest }) => (
        <TextField
          {...rest}
          name={name}
          error={error}
          fullWidth={fullWidth}
          helperText={helperText}
          label={label}
          placeholder={placeholder}
          sx={{
            '& .MuiFilledInput-root': {
              backgroundColor: 'background.paper',
              borderWidth: 1,
              borderStyle: 'solid',
              borderColor: 'neutral.300',
              borderRadius: 1,
              boxShadow: '0px 1px 2px 0px rgba(9, 30, 66, 0.08)',
              px: 1.5,
              py: 0.75,
              transition: (theme) => theme.transitions.create([
                'border-color',
                'box-shadow'
              ]),
              '&:hover': {
                backgroundColor: 'background.paper'
              },
              '&.Mui-focused': {
                backgroundColor: 'background.paper',
                boxShadow: (theme) => `${alpha(theme.palette.primary.main,
                  0.25)} 0 0 0 0.2rem`
              },
              '& .MuiFilledInput-input': {
                fontSize: 14,
                height: 'unset',
                lineHeight: 1.6,
                p: 0
              },
              '&.Mui-disabled': {
                backgroundColor: 'action.disabledBackground',
                boxShadow: 'none',
                borderColor: alpha('#D6DBE1', 0.5)
              }
            }
          }}
          variant="filled"
          InputProps={{
            disableUnderline: true,
            ...InputProps
          }}
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
        />
      )}
      value={value}
      {...other}
    />
  );
};

DateField.propTypes = {
  error: PropTypes.bool,
  fullWidth: PropTypes.bool,
  helperText: PropTypes.string,
  label: PropTypes.string,
  name: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.instanceOf(Date)
};
