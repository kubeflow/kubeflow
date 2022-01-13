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

export const WizardConfirmation = (props) => {
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
        Step 4. Confirmation
      </Typography>
      <Card variant="outlined">
        <PropertyList>
          <PropertyListItem
            divider
            label="Company Type"
            value={values.business}
          />
          <PropertyListItem
            divider
            label="Full Name"
            value={values.fullName}
          />
          <PropertyListItem
            divider
            label="Website"
            value={values.website}
          />
          <PropertyListItem
            divider
            label="Company Name"
            value={values.companyName}
          />
          <PropertyListItem
            label="Email Notifications"
            value={Object
              .entries(values.notifications)
              .filter(([, value]) => value)
              .map(([key]) => notificationOptions.find((option) => option.name === key).label)
              .join(', ')}
          />
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

WizardConfirmation.propTypes = {
  onPreviousStep: PropTypes.func.isRequired,
  values: PropTypes.object.isRequired
};
