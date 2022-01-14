import { useState } from 'react';
import PropTypes from 'prop-types';
import { FormHelperText, Avatar, Box, Button, InputAdornment, Typography } from '@material-ui/core';
import { InputField } from './input-field';

export const StreamerClusterDetails = (props) => {
  const { initialValues, onPreviousStep, onNextStep } = props;
  const [values, setValues] = useState(initialValues);
  const [error, setError] = useState(null);

  const handleValuesChange = (event) => {
    setValues((prevValues) => ({
      ...prevValues,
      [event.target.name]: event.target.value
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!values.clusterName) {
      setError('Please provide a cluster name');
      return;
    } else if(!values.clusterUserAccount){
      setError('Please provide a cluster user account');
      return;

    }else if(!values.clusterTopic){
      setError('Please provide a cluster topic name');
      return;

    }else if(!values.clusterServiceName){
      setError('Please provide a cluster service name');
      return;

    }
    // console.log(values.clusterName)
    onNextStep({
      clusterName: values.clusterName,
      clusterUserAccount: values.clusterUserAccount,
      clusterTopic: values.clusterTopic,
      clusterServiceName: values.clusterServiceName,
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
            Step 2. General Cluster Details
          </Typography>
          <InputField
            fullWidth
            label="Name"
            name="clusterName"
            onChange={handleValuesChange}
          />

          <InputField
            fullWidth
            label="Service Account"
            name="clusterUserAccount"
            onChange={handleValuesChange}
          />

          <InputField
            fullWidth
            label="Topic"
            name="clusterTopic"
            onChange={handleValuesChange}
          />

          <InputField
            fullWidth
            label="Service Name"
            name="clusterServiceName"
            onChange={handleValuesChange}
          />
          {/* <InputField
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
          /> */}
          {/* <InputField
            fullWidth
            label="Company name"
            name="companyName"
            onChange={handleValuesChange}
          /> */}
          <div>
            {/* <Typography
              color="textPrimary"
              sx={{ mb: 1 }}
              variant="subtitle2"
            >
              Photo
            </Typography> */}
            {/* <Box
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
            </Box> */}
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
        {Boolean(error) && (
          <FormHelperText error>
            {error}
          </FormHelperText>
        )}
      </form>
    </div>
  );
};

StreamerClusterDetails.propTypes = {
  initialValues: PropTypes.object.isRequired,
  onNextStep: PropTypes.func.isRequired,
  onPreviousStep: PropTypes.func.isRequired
};
