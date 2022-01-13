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
import { ExternalLink as ExternalLinkIcon } from '../../icons/external-link';

const versions = [
  {
    buttonLabel: 'Try the Demo',
    features: ['4 page examples', 'Community support', 'Free design assets (Figma)'],
    href: 'https://github.com/devias-io/carpatin-dashboard-free',
    hrefExternal: true,
    image: '/static/carpatin-dashboard-free.png',
    name: 'Free'
  },
  {
    buttonLabel: 'Purchase Pro Version',
    href: 'https://material-ui.com/store/items/carpatin-dashboard',
    features: [
      '30 page examples',
      'Premium support',
      'Pro design assets (Figma)',
      'Authentication with Amplify, Auth0, Firebase and JWT',
      'Data states',
      'Built with Fake API'
    ],
    image: '/static/carpatin-dashboard-pro.png',
    name: 'Standard Plus'
  }
];

export const FreeDemo = () => (
  <Box
    sx={{
      backgroundColor: 'background.default',
      py: 15
    }}
  >
    <Container
      maxWidth="md"
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
        Try the free demo
      </Typography>
      <Grid
        container
        spacing={3}
        sx={{ mb: 8 }}
      >
        {versions.map((version) => (
          <Grid
            item
            key={version.name}
            md={6}
            xs={12}
          >
            <Card
              elevation={0}
              sx={{
                backgroundColor: version.name === 'Free' ? 'inherit' : 'neutral.100',
                display: 'flex',
                flexDirection: 'column',
                height: '100%',
                p: {
                  md: 8,
                  xs: 3
                },
                '& img': {
                  maxWidth: '100%'
                }
              }}
              variant={version.name === 'Free' ? 'outlined' : 'elevation'}
            >
              <img
                alt={version.name}
                src={version.image}
              />
              <Typography
                color="text.disabled"
                variant="overline"
                sx={{ mt: 2 }}
              >
                Version
              </Typography>
              <Typography
                color="textPrimary"
                variant="h4"
              >
                {version.name}
              </Typography>
              <List
                sx={{
                  px: 1,
                  py: 2
                }}
              >
                {version.features.map((feature) => (
                  <ListItem
                    disableGutters
                    key={feature}
                  >
                    <ListItemIcon
                      sx={{
                        minWidth: 'auto',
                        mr: 1.5,
                        color: 'success.main'
                      }}
                    >
                      <CheckCircleIcon />
                    </ListItemIcon>
                    <ListItemText
                      primary={feature}
                      primaryTypographyProps={{
                        color: 'textPrimary',
                        variant: 'subtitle2'
                      }}
                    />
                  </ListItem>
                ))}
              </List>
              <Box sx={{ flexGrow: 1 }} />
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
                  endIcon={version.hrefExternal && <ExternalLinkIcon />}
                  href={version.href}
                  size="large"
                  target={version.hrefExternal ? '_target' : '_self'}
                  variant="text"
                >
                  {version.buttonLabel}
                </Button>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  </Box>
);
