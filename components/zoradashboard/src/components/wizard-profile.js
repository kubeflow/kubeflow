import { useState } from 'react';
import PropTypes from 'prop-types';
import { Avatar, Box, Button, InputAdornment, Typography } from '@material-ui/core';
import { InputField } from './input-field';

export const WizardProfile = (props) => {
  const { initialValues, onPreviousStep, onNextStep } = props;
  const [values, setValues] = useState(initialValues);

  const handleValuesChange = (event) => {
    setValues((prevValues) => ({
      ...prevValues,
      [event.target.name]: event.target.value
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onNextStep({
      fullName: values.fullName,
      website: `https://${values.website}`,
      companyName: values.companyName
    });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Box
          sx={{
            display: 'grid',
            gap: 2,
            gridAutoFlow: 'row'
          }}
        >
          <Typography
            color="textPrimary"
            sx={{ my: 2 }}
            variant="h6"
          >
            Step 2. Profile details
          </Typography>
          <InputField
            fullWidth
            label="Full name"
            name="fullName"
            onChange={handleValuesChange}
          />
          <InputField
            fullWidth
            label="Website"
            name="website"
            onChange={handleValuesChange}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  https://
                </InputAdornment>
              )
            }}
          />
          <InputField
            fullWidth
            label="Company name"
            name="companyName"
            onChange={handleValuesChange}
          />
          <div>
            <Typography
              color="textPrimary"
              sx={{ mb: 1 }}
              variant="subtitle2"
            >
              Photo
            </Typography>
            <Box
              sx={{
                alignItems: 'center',
                display: 'flex'
              }}
            >
              <Avatar
                sx={{
                  height: 58,
                  mr: 2,
                  width: 58
                }}
              />
              <div>
                <div>
                  <Button
                    color="primary"
                    size="small"
                    sx={{ mb: 1 }}
                    type="button"
                    variant="outlined"
                  >
                    Upload new picture
                  </Button>
                </div>
                <Typography
                  color="textSecondary"
                  variant="caption"
                >
                  Recommended dimensions: 200x200, maximum file size: 5MB
                </Typography>
              </div>
            </Box>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'flex-end',
                mt: 3
              }}
            >
              <Button
                color="primary"
                onClick={onPreviousStep}
                size="large"
                sx={{ mr: 2 }}
                type="button"
                variant="text"
              >
                Back
              </Button>
              <Button
                color="primary"
                size="large"
                type="submit"
                variant="contained"
              >
                Next Step
              </Button>
            </Box>
          </div>
        </Box>
      </form>
    </div>
  );
};

WizardProfile.propTypes = {
  initialValues: PropTypes.object.isRequired,
  onNextStep: PropTypes.func.isRequired,
  onPreviousStep: PropTypes.func.isRequired
};
