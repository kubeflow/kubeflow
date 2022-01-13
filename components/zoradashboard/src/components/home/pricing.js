import {
  Box,
  Button,
  Card,
  Container,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography
} from '@material-ui/core';
import { CheckCircle as CheckCircleIcon } from '../../icons/check-circle';
import { XCircle as XCircleIcon } from '../../icons/x-circle';

const allFeatures = [
  'One end project',
  '12 months updates',
  '6 months of support',
  'TypeScript version',
  'Design assets',
  'Commercial applications'
];

const plans = [
  {
    name: 'Standard',
    features: ['One end project', '12 months updates', '6 months of support']
  },
  {
    name: 'Standard Plus',
    features: [
      'One end project',
      '12 months updates',
      '6 months of support',
      'TypeScript version',
      'Design assets'
    ]
  },
  {
    name: 'Extended',
    features: [
      'One end project',
      '12 months updates',
      '6 months of support',
      'TypeScript version',
      'Design assets',
      'Commercial applications'
    ]
  }
];

export const Pricing = () => (
  <Box
    sx={{
      backgroundColor: 'neutral.100',
      py: 15
    }}
  >
    <Container
      maxWidth="lg"
      sx={{
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      <Typography
        align="center"
        color="textPrimary"
        sx={{ mb: 8 }}
        variant="h2"
      >
        Pricing
      </Typography>
      <Grid
        container
        spacing={3}
        sx={{ mb: 8 }}
      >
        {plans.map((plan) => (
          <Grid
            item
            key={plan.name}
            md={4}
            xs={12}
          >
            <Card
              elevation={16}
              sx={{
                p: {
                  md: 8,
                  xs: 3
                }
              }}
            >
              <Typography
                color="text.disabled"
                variant="overline"
              >
                License
              </Typography>
              <Typography
                color="textPrimary"
                variant="h4"
              >
                {plan.name}
              </Typography>
              <List
                sx={{
                  px: 1,
                  py: 2
                }}
              >
                {allFeatures.map((feature) => {
                  const isFeatureIncluded = plan.features.includes(feature);

                  return (
                    <ListItem
                      disableGutters
                      key={feature}
                    >
                      <ListItemIcon
                        sx={{
                          minWidth: 'auto',
                          mr: 1.5,
                          color: isFeatureIncluded ? 'success.main' : 'text.disabled'
                        }}
                      >
                        {isFeatureIncluded ? <CheckCircleIcon /> : <XCircleIcon />}
                      </ListItemIcon>
                      <ListItemText
                        primary={feature}
                        primaryTypographyProps={{
                          sx: { color: isFeatureIncluded ? 'text.primary' : 'text.disabled' },
                          variant: 'subtitle2'
                        }}
                      />
                    </ListItem>
                  );
                })}
              </List>
              <Divider />
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  mt: 2
                }}
              >
                <Button
                  color="primary"
                  component="a"
                  href="https://material-ui.com/store/items/carpatin-dashboard"
                  size="large"
                  target="_blank"
                  variant="text"
                >
                  Purchase Now
                </Button>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Typography
        color="primary"
        variant="h3"
      >
        Do you have a special case?
      </Typography>
      <Typography
        color="textSecondary"
        sx={{ my: 2 }}
        variant="body1"
      >
        Let’s talk about your specific requirements and see how we can help you.
      </Typography>
      <Button
        color="secondary"
        component="a"
        href="https://devias.io/contact"
        size="large"
        target="_blank"
        variant="contained"
      >
        Contact us
      </Button>
    </Container>
  </Box>
);
