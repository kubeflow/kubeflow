import PropTypes from 'prop-types';
import { Button, Typography } from '@material-ui/core';
import { styled } from '@material-ui/core/styles';
import { Plus as PlusIcon } from '../icons/plus';
import { QuestionMarkOutlined as QuestionMarkIcon } from '../icons/question-mark-outlined';

const ResourceUnavailableRoot = styled('div')(({ theme }) => ({
  alignItems: 'center',
  backgroundColor: theme.palette.neutral[100],
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  padding: theme.spacing(3)
}));

export const ResourceUnavailable = (props) => {
  const { onCreate, ...other } = props;

  return (
    <ResourceUnavailableRoot {...other}>
      <QuestionMarkIcon sx={{ color: 'text.secondary' }} />
      <Typography
        color="textSecondary"
        sx={{ mt: 2 }}
        variant="body2"
      >
        There are not objects here yet.
      </Typography>
      {onCreate && (
        <Button
          color="primary"
          onClick={onCreate}
          startIcon={<PlusIcon fontSize="small" />}
          sx={{ mt: 2 }}
          variant="contained"
        >
          Create Object
        </Button>
      )}
    </ResourceUnavailableRoot>
  );
};

ResourceUnavailable.propTypes = {
  onCreate: PropTypes.func
};
