import { useState } from 'react';
import PropTypes from 'prop-types';
import { Box, Button, Card, Divider, IconButton, InputBase, Typography } from '@material-ui/core';
import { ChevronDown as ChevronDownIcon } from '../../icons/chevron-down';
import { Eye as EyeIcon } from '../../icons/eye';
import { PaperClip as PaperClipIcon } from '../../icons/paper-clip';

export const CustomerNoteAdd = (props) => {
  const { onSend, submitDisabled, ...other } = props;
  const [content, setContent] = useState('');

  const handleChange = (event) => {
    setContent(event.target.value);
  };

  const handleSend = () => {
    onSend?.(content);
    setContent('');
  };

  return (
    <Card
      variant="outlined"
      {...other}
    >
      <Box
        sx={{
          p: 2,
          alignItems: 'center',
          display: 'flex'
        }}
      >
        <InputBase
          multiline
          onChange={handleChange}
          placeholder="Comment text..."
          sx={{
            flex: 1,
            mr: 2
          }}
          value={content}
        />
        <IconButton size="small">
          <PaperClipIcon fontSize="small" />
        </IconButton>
      </Box>
      <Divider />
      <Box
        sx={{
          alignItems: 'center',
          backgroundColor: 'neutral.100',
          color: 'text.secondary',
          display: 'flex',
          p: 2
        }}
      >
        <EyeIcon sx={{ color: 'inherit' }} />
        <Typography
          color="textPrimary"
          variant="body2"
          sx={{ ml: 1 }}
        >
          Visible to all
        </Typography>
        <IconButton
          color="primary"
          size="small"
          sx={{ color: 'inherit' }}
        >
          <ChevronDownIcon fontSize="small" />
        </IconButton>
        <Box sx={{ flexGrow: 1 }} />
        <Button
          color="primary"
          disabled={content.length === 0 || submitDisabled}
          onClick={handleSend}
          variant="contained"
        >
          Send
        </Button>
      </Box>
    </Card>
  );
};

CustomerNoteAdd.defaultProps = {
  submitDisabled: false
};

CustomerNoteAdd.propTypes = {
  onSend: PropTypes.func,
  submitDisabled: PropTypes.bool
};
