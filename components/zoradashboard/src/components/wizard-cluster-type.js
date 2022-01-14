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

const clusterTypeOptions = [
  {
    content: 'Ephemeral Cluster stores data for the lifetime of the cluster instance. Data will be lost when the instance is restarted recommended for development only',
    icon: ChipIcon,
    value: 'Ephemeral Streamer Cluster'
  },
  {
    content: 'Persistent Streamer Cluster  relates to long-term data storage independent of the lifecycle of the instance Recommended for production',
    icon: CloudIcon,
    value: 'Persistent Streamer Cluster'
  },
  {
    content: 'Use multiple disks to storing commit logs in the distributed cluster The disk capacity used by an existing cluster can be increased based on different policies',
    icon: OfficeBuildingIcon,
    value: 'Enterprise Big Data Streamer Cluster'
  }
];

export const StreamerClusterType = (props) => {
  const { initialClusterType, onNextStep } = props;
  const [clusterType, setClusters] = useState(initialClusterType);
  const [error, setError] = useState(null);

  const handleClusterTypeChange = (value) => {
    setClusters(value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!clusterType) {
      setError('Please select a cluster type');
      return;
    }

    onNextStep({ clusterType });
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
            Step 1. Select Cluster type
          </Typography>
          <Typography
            color="textSecondary"
            variant="body2"
          >
            Select from a variety of different cluster types to fit your business cases from on demand short
            lived clusters to advanced  rebalanced with long term data persistence strategy.
          </Typography>
        </Box>
        <Box>
          {clusterTypeOptions.map((option) => {
            const { content, icon: Icon, value } = option;

            return (
              <Card
                onClick={() => handleClusterTypeChange(value)}
                key={value}
                sx={{
                  boxShadow: (theme) => (clusterType === value
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

StreamerClusterType.propTypes = {
  initialClusterType: PropTypes.string.isRequired,
  onNextStep: PropTypes.func.isRequired
};
