import {
  Box,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography
} from '@material-ui/core';
import { CheckCircleOutlined as CheckCircleIcon } from '../../icons/check-circle-outlined';

const features = [
  'GRPC and REST Data production and consumption',
  'Complex stream event and batch procssing',
  'Ondemand Statistics on streaming data',
  'Feature Extraction on streaming data',
  'Run ML workloads Tensorflow Pytorch and XG-Boost',
];

const auth = [
  {
    icon: '/static/amplify.png',
    iconWidth: 30,
    name: 'IOT'
  },
  {
    icon: '/static/auth0.png',
    iconWidth: 20,
    name: 'AI'
  },
  {
    icon: '/static/firebase.png',
    iconWidth: 16,
    name: 'PROCESSING'
  },
  {
    icon: '/static/jwt.png',
    iconWidth: 22,
    name: 'AUTOMATION'
  }
];

export const ProductFeatures = () => (
  <div>
    <Typography
      color="textPrimary"
      variant="h4"
    >
      Zora Cloud
    </Typography>
    <Typography
      color="textSecondary"
      sx={{
        mb: 3,
        mt: 1
      }}
      variant="body2"
    >
      On demand clusters for data production, consumption, complex event processing, statistics, feature extraction
    </Typography>
    <List sx={{ py: 2 }}>
      {features.map((feature) => (
        <ListItem
          disableGutters
          key={feature}
        >
          <ListItemIcon
            sx={{
              minWidth: 'auto',
              mr: 1
            }}
          >
            <CheckCircleIcon sx={{ color: 'success.main' }} />
          </ListItemIcon>
          <ListItemText primary={feature} />
        </ListItem>
      ))}
    </List>
    <Divider />
    <Typography
      color="textPrimary"
      sx={{
        mb: 2,
        mt: 3
      }}
      variant="h5"
    >
      Suitable Usecases
    </Typography>
    <Typography
      color="textSecondary"
      sx={{ mb: 2 }}
      variant="body2"
    >
      Zoracloud services support different automation usecases to 
      accellerate your business these include but not limited to
    </Typography>
    <Box
      sx={{
        alignItems: 'center',
        display: 'flex',
        '& img': {
          ml: 1
        }
      }}
    >
      {auth.map((item) => (
        <Box
          key={item.name}
          sx={{
            alignItems: 'center',
            display: 'flex',
            '& + &': {
              ml: 3
            }
          }}
        >
          <Typography
            color="textSecondary"
            variant="caption"
          >
            {item.name}
          </Typography>
          <img
            alt={item.name}
            src={item.icon}
            style={{ maxWidth: item.iconWidth }}
          />
        </Box>
      ))}
    </Box>
  </div>
);
