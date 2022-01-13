import { useState } from 'react';
import PropTypes from 'prop-types';
import { Card, CardContent, Container, Grid } from '@material-ui/core';
import { Stepper } from './stepper';
import { WizardBusiness } from './wizard-business';
import { WizardConfirmation } from './wizard-confirmation';
import { WizardNotifications } from './wizard-notifications';
import { WizardProfile } from './wizard-profile';

const steps = [
  {
    title: 'Step 1',
    content: 'Business'
  },
  {
    title: 'Step 2',
    content: 'Profile'
  },
  {
    title: 'Step 3',
    content: 'Business'
  },
  {
    title: 'Step 4',
    content: 'Confirmation'
  }
];

export const Wizard = (props) => {
  const { orientation } = props;
  const [currentStep, setCurrentStep] = useState(0);
  const [values, setValues] = useState({
    business: '',
    fullName: '',
    website: '',
    companyName: '',
    notifications: {
      newCompanySignups: true,
      newOrders: false,
      publishErrors: false
    }
  });

  const handleNextStep = (newValues) => {
    setValues((prevValues) => ({ ...prevValues, ...newValues }));
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePreviousStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const getContent = () => {
    if (currentStep === 0) {
      return (
        <WizardBusiness
          initialBusiness={values.business}
          onNextStep={handleNextStep}
        />
      );
    }

    if (currentStep === 1) {
      return (
        <WizardProfile
          initialValues={{
            fullName: values.fullName,
            website: values.website,
            companyName: values.companyName
          }}
          onNextStep={handleNextStep}
          onPreviousStep={handlePreviousStep}
        />
      );
    }

    if (currentStep === 2) {
      return (
        <WizardNotifications
          onNextStep={handleNextStep}
          onPreviousStep={handlePreviousStep}
          initialNotifications={values.notifications}
        />
      );
    }

    return (
      <WizardConfirmation
        onPreviousStep={handlePreviousStep}
        values={values}
      />
    );
  };

  return (
    <Card variant="outlined">
      {orientation === 'horizontal'
        ? (
          <CardContent>
            <Grid
              container
              spacing={3}
            >
              <Grid
                item
                md={4}
                xs={12}
              >
                <Stepper
                  steps={steps}
                  currentStep={currentStep}
                />
              </Grid>
              <Grid
                item
                md={8}
                xs={12}
              >
                {getContent()}
              </Grid>
            </Grid>
          </CardContent>
        )
        : (
          <CardContent>
            <Stepper
              currentStep={currentStep}
              orientation="horizontal"
              steps={steps}
            />
            <Container
              maxWidth="sm"
              sx={{ mt: 6 }}
            >
              {getContent()}
            </Container>
          </CardContent>
        )}
    </Card>
  );
};

Wizard.defaultProps = {
  orientation: 'horizontal'
};

Wizard.propTypes = {
  orientation: PropTypes.oneOf(['vertical', 'horizontal'])
};
