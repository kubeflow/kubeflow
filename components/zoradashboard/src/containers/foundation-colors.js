import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Box, Container, Grid, Typography } from '@material-ui/core';
import { DemoPreview } from '../components/demo-preview';
import gtm from '../lib/gtm';

const sections = [
  {
    title: 'Neutrals',
    description: 'The neutral colors are useful for dividing pages into sections with different backgrounds and borders, or used as text colors, for example.',
    items: [
      {
        description: 'Secondary section background',
        label: 'neutral-100',
        value: 'neutral.100'
      },
      {
        description: 'Used for Avatars',
        label: 'neutral-200',
        value: 'neutral.200'
      },
      {
        description: 'Default state components',
        label: 'neutral-300',
        value: 'neutral.300'
      },
      {
        description: 'Tertiary text.',
        label: 'neutral-400',
        value: 'neutral.400'
      },
      {
        label: 'neutral-500',
        value: 'neutral.500'
      },
      {
        label: 'neutral-600',
        value: 'neutral.600'
      },
      {
        label: 'neutral-700',
        value: 'neutral.700'
      },
      {
        label: 'neutral-800',
        value: 'neutral.800'
      },
      {
        label: 'neutral-900',
        value: 'neutral.900'
      }
    ]
  },
  {
    title: 'Colors',
    items: [
      {
        label: 'primary-main',
        value: 'primary.main'
      },
      {
        label: 'error-main',
        value: 'error.main'
      },
      {
        label: 'warning-main',
        value: 'warning.main'
      },
      {
        label: 'info-main',
        value: 'info.main'
      },
      {
        label: 'success-main',
        value: 'success.main'
      }
    ]
  },
  {
    title: 'Text',
    items: [
      {
        label: 'text-primary',
        value: 'text.primary'
      },
      {
        label: 'text-secondary',
        value: 'text.secondary'
      }
    ]
  }
];

export const FoundationColors = () => {
  useEffect(() => {
    gtm.push({ event: 'page_view' });
  }, []);

  return (
    <>
      <Helmet>
        <title>Foundation: Colors | Carpatin Dashboard</title>
      </Helmet>
      <Box
        sx={{
          backgroundColor: 'background.default',
          flexGrow: 1,
          py: 4
        }}
      >
        <Container maxWidth="lg">
          <Typography
            color="textPrimary"
            sx={{ mb: 6 }}
            variant="h4"
          >
            Neutrals
          </Typography>
          <Box
            sx={{
              display: 'grid',
              gap: 5,
              gridAutoFlow: 'row'
            }}
          >
            {sections.map((section) => (
              <DemoPreview
                description={section.description}
                key={section.title}
                title={section.title}
              >
                <Grid
                  container
                  spacing={2}
                >
                  {section.items.map((item) => (
                    <Grid
                      item
                      key={item.label}
                      md={6}
                      sx={{
                        alignItems: 'center',
                        display: 'flex'
                      }}
                      xs={12}
                    >
                      <Box
                        sx={{
                          backgroundColor: item.value,
                          borderRadius: 1,
                          height: 64,
                          mr: 3,
                          width: 64
                        }}
                      />
                      <div>
                        <Typography
                          color="textPrimary"
                          variant="subtitle1"
                        >
                          {item.label}
                        </Typography>
                        <Typography
                          color="textSecondary"
                          variant="body2"
                        >
                          {item.description}
                        </Typography>
                      </div>
                    </Grid>
                  ))}
                </Grid>
              </DemoPreview>
            ))}
          </Box>
        </Container>
      </Box>
    </>
  );
};
