import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Box, Card, Container, Grid, Link, Typography } from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';
import { DemoPreview } from '../components/demo-preview';
import gtm from '../lib/gtm';

const items = [
  {
    description: 'Heading text',
    fontSize: '48px',
    value: 'h1'
  },
  {
    description: 'Heading text',
    fontSize: '36px',
    value: 'h2'
  },
  {
    description: 'Heading text',
    fontSize: '32px',
    value: 'h3'
  },
  {
    description: 'Page headers',
    fontSize: '24px',
    value: 'h4'
  },
  {
    description: 'Section headings',
    fontSize: '18px',
    value: 'h5'
  },
  {
    description: 'Card Headers',
    fontSize: '16px',
    value: 'h6'
  },
  {
    description: 'Components and section headings',
    fontSize: '16px',
    value: 'body1'
  },
  {
    description: 'Heavily used in most components',
    fontSize: '14px',
    value: 'body2'
  },
  {
    description: 'Components',
    fontSize: '16px',
    value: 'subtitle1'
  },
  {
    description: 'Labels',
    fontSize: '14px',
    value: 'subtitle2'
  },
  {
    description: 'Helper text',
    fontSize: '12px',
    value: 'caption'
  },
  {
    description: 'Subtitles',
    fontSize: '12px',
    value: 'overline'
  }
];

export const FoundationTypography = () => {
  const theme = useTheme();

  useEffect(() => {
    gtm.push({ event: 'page_view' });
  }, []);

  return (
    <>
      <Helmet>
        <title>Foundation: Typography | Carpatin Dashboard</title>
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
            Typography
          </Typography>
          <Box
            sx={{
              display: 'grid',
              gap: 5,
              gridAutoFlow: 'row'
            }}
          >
            <DemoPreview
              title={(
                <Typography
                  color="textPrimary"
                  variant="body1"
                >
                  Carpatin uses
                  {' '}
                  <Link
                    color="primary"
                    href="https://fonts.google.com/specimen/Inter"
                    target="_blank"
                    variant="inherit"
                  >
                    Inter
                  </Link>
                  {' '}
                  for text and display instances.
                </Typography>
              )}
            >
              <Box
                sx={{
                  alignItems: 'center',
                  display: 'flex'
                }}
              >
                <Card
                  sx={{
                    alignItems: 'center',
                    display: 'flex',
                    justifyContent: 'center',
                    minHeight: 100,
                    minWidth: 120,
                    mr: 3
                  }}
                  variant="outlined"
                >
                  <Typography
                    color="textPrimary"
                    variant="h3"
                  >
                    Abc
                  </Typography>
                </Card>
                <div>
                  <Typography
                    color="textPrimary"
                    variant="subtitle1"
                  >
                    Main font
                  </Typography>
                  <Typography
                    color="textSecondary"
                    variant="body2"
                  >
                    Components, headings, body and UI text
                  </Typography>
                </div>
              </Box>
            </DemoPreview>
            <DemoPreview title="Text sizes">
              <Grid
                container
                spacing={3}
              >
                {items.map((item) => (
                  <Grid
                    item
                    key={item.value}
                    md={6}
                    sx={{
                      alignItems: 'center',
                      display: 'flex',
                      pr: 3
                    }}
                    xs={12}
                  >
                    <Card
                      sx={{
                        alignItems: 'center',
                        display: 'flex',
                        justifyContent: 'center',
                        minHeight: 100,
                        minWidth: 120,
                        mr: 3
                      }}
                      variant="outlined"
                    >
                      <Typography
                        color="textPrimary"
                        variant={item.value}
                      >
                        Abc
                      </Typography>
                    </Card>
                    <Box
                      sx={{
                        alignItems: 'center',
                        display: 'flex',
                        flexGrow: 1,
                        flexWrap: 'wrap'
                      }}
                    >
                      <Box sx={{ mr: 'auto' }}>
                        <Typography
                          color="textPrimary"
                          sx={{ textTransform: 'capitalize' }}
                          variant="subtitle1"
                        >
                          {item.value}
                        </Typography>
                        <Typography
                          color="textSecondary"
                          variant="body2"
                        >
                          {item.description}
                        </Typography>
                      </Box>
                      <Typography
                        color="textSecondary"
                        variant="body2"
                        whiteSpace="nowrap"
                      >
                        {item.fontSize}
                        {' '}
                        /
                        {' '}
                        {theme.typography[item.value].lineHeight}
                      </Typography>
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </DemoPreview>
          </Box>
        </Container>
      </Box>
    </>
  );
};
