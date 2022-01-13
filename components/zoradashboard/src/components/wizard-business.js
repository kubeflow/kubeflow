import { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Typography,
  FormHelperText
} from '@material-ui/core';
import { Chip as ChipIcon } from '../icons/chip';
import { Cloud as CloudIcon } from '../icons/cloud';
import { OfficeBuilding as OfficeBuildingIcon } from '../icons/office-building';

const businessOptions = [
  {
    content: 'Software as a service (SaaS) is a software licensing and delivery model in which software is licensed on a subscription basis and is centrally hosted.',
    icon: ChipIcon,
    value: 'Software as a service'
  },
  {
    content: 'Infrastructure as a service (IaaS) is a form of cloud computing that provides virtualized computing resources over the internet.',
    icon: CloudIcon,
    value: 'Infrastructure as a Service'
  },
  {
    content: 'Platform as a service (PaaS) is a deployment environment in the cloud, with resources that enable you to deliver cloud-based apps or even enterprise apps.',
    icon: OfficeBuildingIcon,
    value: 'Platform as a service'
  }
];

export const WizardBusiness = (props) => {
  const { initialBusiness, onNextStep } = props;
  const [business, setBusiness] = useState(initialBusiness);
  const [error, setError] = useState(null);

  const handleBusinessTypeChange = (value) => {
    setBusiness(value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!business) {
      setError('Please select a business');
      return;
    }

    onNextStep({ business });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Box
          sx={{
            mb: 2,
            py: 2
          }}
        >
          <Typography
            color="textPrimary"
            sx={{ mb: 0.5 }}
            variant="h6"
          >
            Step 1. Business type
          </Typography>
          <Typography
            color="textSecondary"
            variant="body2"
          >
            Our architecture is ready for any type of business, just
            let us know who are we talking to.
          </Typography>
        </Box>
        <Box>
          {businessOptions.map((option) => {
            const { content, icon: Icon, value } = option;

            return (
              <Card
                onClick={() => handleBusinessTypeChange(value)}
                key={value}
                sx={{
                  boxShadow: (theme) => (business === value
                    ? `0px 0px 0px 2px ${theme.palette.primary.main}`
                    : `0px 0px 0px 1px ${theme.palette.divider}`),
                  cursor: 'pointer',
                  mb: 2
                }}
              >
                <CardContent
                  sx={{
                    alignItems: 'center',
                    display: 'flex'
                  }}
                >
                  <Avatar
                    variant="rounded"
                    sx={{
                      backgroundColor: 'background.default',
                      borderColor: 'divider',
                      borderStyle: 'solid',
                      borderWidth: 1,
                      mr: 2
                    }}
                  >
                    <Icon
                      color="primary"
                      fontSize="large"
                    />
                  </Avatar>
                  <Box>
                    <Typography
                      color="textPrimary"
                      sx={{ mb: 1 }}
                      variant="h6"
                    >
                      {value}
                    </Typography>
                    <Typography
                      color="textSecondary"
                      variant="body1"
                    >
                      {content}
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            );
          })}
        </Box>
        {Boolean(error) && (
          <FormHelperText error>
            {error}
          </FormHelperText>
        )}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-end'
          }}
        >
          <Button
            color="primary"
            size="large"
            type="submit"
            variant="contained"
          >
            Next Step
          </Button>
        </Box>
      </form>
    </div>
  );
};

WizardBusiness.propTypes = {
  initialBusiness: PropTypes.string.isRequired,
  onNextStep: PropTypes.func.isRequired
};
