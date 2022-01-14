import PropTypes from 'prop-types';
import { Box, Button, Card, Typography } from '@material-ui/core';
import { PropertyList } from './property-list';
import { PropertyListItem } from './property-list-item';

const notificationOptions = [
  {
    name: 'newOrders',
    label: 'New Orders'
  },
  {
    name: 'newCompanySignups',
    label: 'New Company Signups'
  },
  {
    name: 'publishErrors',
    label: 'Publish Errors'
  }
];

export const ClusterCreationConfirmation = (props) => {
  const { onPreviousStep, values } = props;

  return (
    <div>
      <Typography
        color="textPrimary"
        sx={{
          mb: 5,
          mt: 2
        }}
        variant="h6"
      >
        Step 3. Confirmation
      </Typography>
      <Card variant="outlined">
        <PropertyList>
          <PropertyListItem
            divider
            label="Cluster Type"
            value={values.clusterType}
          />
          <PropertyListItem
            divider
            label="Cluster Name"
            value={values.clusterName}
          />
          <PropertyListItem
            divider
            label="ServiceAccount"
            value={values.clusterUserAccount}
          />
          <PropertyListItem
            divider
            label="Cluster Topic"
            value={values.clusterTopic}
          />
          <PropertyListItem
            divider
            label="Cluster Service Name"
            value={values.clusterServiceName}
          />
          {/* <PropertyListItem
            label="Email Notifications"
            value={Object
              .entries(values.notifications)
              .filter(([, value]) => value)
              .map(([key]) => notificationOptions.find((option) => option.name === key).label)
              .join(', ')}
          /> */}
        </PropertyList>
      </Card>
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
          Confirm
        </Button>
      </Box>
    </div>
  );
};

ClusterCreationConfirmation.propTypes = {
  onPreviousStep: PropTypes.func.isRequired,
  values: PropTypes.object.isRequired
};
