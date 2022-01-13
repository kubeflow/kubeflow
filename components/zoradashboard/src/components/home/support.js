import {
  Avatar,
  AvatarGroup,
  Box,
  Button,
  Card,
  Container,
  Grid,
  Typography
} from '@material-ui/core';

const tech = [
  {
    name: 'react',
    icon: '/static/react.svg'
  },
  {
    name: 'typescript',
    icon: '/static/typescript.svg'
  },
  {
    name: 'figma',
    icon: '/static/figma.svg'
  }
];

const members = [
  {
    avatar: 'https://cdn.devias.io/assets/avatars/stefania-vladutu.png',
    name: 'Stefania Vladutu'
  },
  {
    avatar: 'https://cdn.devias.io/assets/avatars/alexandru-comanescu.png',
    name: 'Alexandru Comanescu'
  },
  {
    avatar: 'https://cdn.devias.io/assets/avatars/adrian-manea.png',
    name: 'Adrian Manea'
  }
];

export const Support = () => (
  <Box sx={{ pt: 15 }}>
    <Container maxWidth="lg">
      <Card
        elevation={0}
        sx={{ backgroundColor: 'neutral.100' }}
      >
        <Grid
          container
          sx={{
            pb: {
              md: 6,
              xs: 3
            },
            pt: {
              md: 8,
              xs: 3
            },
            px: {
              md: 8,
              xs: 3
            }
          }}
        >
          <Grid
            item
            md={6}
            sx={{
              borderRight: (theme) => ({
                md: `1px solid ${theme.palette.divider}`
              }),
              display: 'flex',
              flexDirection: 'column',
              mb: {
                md: 0,
                xs: 4
              },
              pr: {
                md: 4
              }
            }}
            xs={12}
          >
            <Typography
              color="textPrimary"
              variant="h4"
            >
              Design Files
            </Typography>
            <Typography
              color="textSecondary"
              variant="subtitle1"
              sx={{
                mb: 4,
                mt: 1
              }}
            >
              We&apos;ve included the source Figma files in Plus &amp;
              Extended licenses so you can get creative! Build layouts with confidence.
            </Typography>
            <Box sx={{ flexGrow: 1 }} />
            <Box
              sx={{
                alignItems: 'center',
                display: 'flex',
                flexWrap: 'wrap'
              }}
            >
              <Button
                color="primary"
                component="a"
                href="https://www.figma.com/file/4XoBSB4Sl2fSpD9OebSsr3/Carpatin---Admin-Dashboard-v2.0?node-id=7435%3A43141"
                rel="nofollow noreferrer noopener"
                target="_blank"
                variant="text"
              >
                Preview Figma Files
              </Button>
              <Box sx={{ flexGrow: 1 }} />
              <Box
                sx={{
                  '& img:not(:last-child)': {
                    mr: 3
                  }
                }}
              >
                {tech.map((item) => (
                  <img
                    alt={item.name}
                    key={item.name}
                    src={item.icon}
                  />
                ))}
              </Box>
            </Box>
          </Grid>
          <Grid
            item
            md={6}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              pl: {
                md: 4
              }
            }}
            xs={12}
          >
            <Typography
              color="textPrimary"
              variant="h4"
            >
              Premium Support
            </Typography>
            <Typography
              color="textSecondary"
              variant="subtitle1"
              sx={{
                mb: 4,
                mt: 1
              }}
            >
              Our support team is here to help you get started with any template-related questions.
              We answer pretty fast.
            </Typography>
            <Box sx={{ flexGrow: 1 }} />
            <Box
              sx={{
                alignItems: 'center',
                display: 'flex',
                flexWrap: 'wrap'
              }}
            >
              <Button
                color="primary"
                component="a"
                href="https://devias.io/contact"
                target="_blank"
                variant="text"
              >
                Contact us
              </Button>
              <Box sx={{ flexGrow: 1 }} />
              <AvatarGroup
                sx={{
                  '& .MuiAvatar-root': {
                    borderColor: 'neutral.100'
                  }
                }}
              >
                {members.map((member) => (
                  <Avatar
                    alt={member.name}
                    key={member.name}
                    src={member.avatar}
                  />
                ))}
              </AvatarGroup>
            </Box>
          </Grid>
        </Grid>
      </Card>
    </Container>
  </Box>
);
