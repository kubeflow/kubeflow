import { Box, Container, Link, Typography } from '@material-ui/core';

const links = [
  {
    label: 'About Us',
    href: '#'
  },
  {
    label: 'Terms',
    href: '#'
  }
];

export const Footer = () => (
  <div>
    <Container
      maxWidth="lg"
      sx={{
        display: 'flex',
        flexDirection: {
          sm: 'row',
          xs: 'column'
        },
        py: 3,
        '& a': {
          mt: {
            sm: 0,
            xs: 1
          },
          '&:not(:last-child)': {
            mr: {
              sm: 5,
              xs: 0
            }
          }
        }
      }}
    >
      <Typography
        color="textSecondary"
        variant="caption"
      >
        © 2022 Zora Cloud 
      </Typography>
      <Box sx={{ flexGrow: 1 }} />
      {links.map((link) => (
        <Link
          color="textSecondary"
          href={link.href}
          key={link.label}
          target="_blank"
          underline="none"
          variant="body2"
        >
          {link.label}
        </Link>
      ))}
    </Container>
  </div>
);
