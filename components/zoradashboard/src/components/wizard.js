import { useState } from 'react';
import PropTypes from 'prop-types';
import { Card, CardContent, Container, Grid } from '@material-ui/core';
import { Stepper } from './stepper';
import { StreamerClusterType } from './wizard-cluster-type';
import { WizardConfirmation } from './wizard-confirmation';
import { WizardNotifications } from './wizard-notifications';
import { WizardProfile } from './wizard-profile';
import { ClusterCreationConfirmation } from './wizard-cluster-confirmation';
import { StreamerClusterDetails } from './wizard-streamer-cluster-details';

const steps = [
  {
    title: 'Step 1',
    content: 'Select Cluster Type'
  },
  {
    title: 'Step 2',
    content: 'General Cluster Details'
  },
  // {
  //   title: 'Step 3',
  //   content: 'Cluster Topic Details'
  // },
  // {
  //   title: 'Step 4',
  //   content: 'Cluster User Details'
  // },
  // {
  //   title: 'Step 5',
  //   content: 'Cluster Service Details'
  // }, 
  {
    title: 'Step 3',
    content: 'Confirmation'
  }

];

export const Wizard = (props) => {
  const { orientation } = props;
  const [currentStep, setCurrentStep] = useState(0);
  const [values, setValues] = useState({
    clusterType: '',
    clusterName: '',
    clusterUserAccount: '',
    clusterTopic: '',
    clusterServiceName: '',
    // website: '',
    // companyName: '',
    // notifications: {
    //   newCompanySignups: true,
    //   newOrders: false,
    //   publishErrors: false
    // }
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
        <StreamerClusterType
          initialClusterType={values.clusterType}
          onNextStep={handleNextStep}
        />
      );
    }

    if (currentStep === 1) {
      return (
        <StreamerClusterDetails
          initialValues={{
            clusterName: values.clusterName,
            clusterUserAccount: values.clusterUserAccount,
            clusterTopic: values.clusterTopic,
            clusterServiceName: values.clusterServiceName
            // website: values.website,
            // companyName: values.companyName
          }}
          onNextStep={handleNextStep}
          onPreviousStep={handlePreviousStep}
        />
      );
    }

    // if (currentStep === 2) {
    //   return (
    //     <WizardProfile
    //       initialValues={{
    //         fullName: values.fullName,
    //         website: values.website,
    //         companyName: values.companyName
    //       }}
    //       onNextStep={handleNextStep}
    //       onPreviousStep={handlePreviousStep}
    //     />
    //   );
    // }

    // if (currentStep === 3) {
    //   return (
    //     <WizardProfile
    //       initialValues={{
    //         fullName: values.fullName,
    //         website: values.website,
    //         companyName: values.companyName
    //       }}
    //       onNextStep={handleNextStep}
    //       onPreviousStep={handlePreviousStep}
    //     />
    //   );
    // }

    // if (currentStep === 4) {
    //   return (
    //     <WizardProfile
    //       initialValues={{
    //         fullName: values.fullName,
    //         website: values.website,
    //         companyName: values.companyName
    //       }}
    //       onNextStep={handleNextStep}
    //       onPreviousStep={handlePreviousStep}
    //     />
    //   );
    // }

    // if (currentStep === 3) {
    //   return (
    //     <WizardNotifications
    //       onNextStep={handleNextStep}
    //       onPreviousStep={handlePreviousStep}
    //       initialNotifications={values.notifications}
    //     />
    //   );
    // }

    return (
      <ClusterCreationConfirmation
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
