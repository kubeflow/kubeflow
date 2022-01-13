import { Link as RouterLink } from 'react-router-dom';
import { Box, Button, Container, Typography } from '@material-ui/core';
import { EmojiSadOutlined as EmojiSadIcon } from '../icons/emoji-sad-outlined';

export const NotFound = () => (
  <Box sx={{ backgroundColor: 'background.default' }}>
    <Container
      maxWidth="md"
      sx={{
        px: 5,
        py: 14,
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      <EmojiSadIcon sx={{ color: 'text.secondary' }} />
      <Typography
        align="center"
        color="textPrimary"
        sx={{ my: 2 }}
        variant="h3"
      >
        Nothing here!
      </Typography>
      <Typography
        align="center"
        color="textSecondary"
        variant="body2"
      >
        The page requested does not exist.
      </Typography>
      <Button
        color="primary"
        component={RouterLink}
        sx={{ mt: 2 }}
        to="/"
        variant="text"
      >
        Take me home
      </Button>
    </Container>
  </Box>
);
