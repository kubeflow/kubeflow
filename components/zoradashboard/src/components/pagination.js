import PropTypes from 'prop-types';
import { Box, IconButton, Typography } from '@material-ui/core';
import { styled } from '@material-ui/core/styles';
import { ChevronLeft as ChevronLeftIcon } from '../icons/chevron-left';
import { ChevronRight as ChevronRightIcon } from '../icons/chevron-right';

const PaginationRoot = styled('div')((({ theme }) => ({
  alignItems: 'center',
  display: 'flex',
  padding: theme.spacing(2)
})));

export const Pagination = (props) => {
  const { disabled, onPageChange, page, rowsCount, ...other } = props;
  // NOTE: Usually, this should be received from the server
  const pageSize = 10;
  const pagesCount = Math.ceil(rowsCount / pageSize);
  const isFirstPage = page === 1;
  const isLastPage = page >= pagesCount;

  const handlePreviousPage = () => {
    onPageChange?.(page - 1);
  };

  const handleNextPage = () => {
    onPageChange?.(page + 1);
  };

  return (
    <PaginationRoot {...other}>
      {pagesCount > 0 && (
        <Typography
          color="textSecondary"
          sx={{
            alignItems: 'center',
            display: 'flex'
          }}
          variant="body2"
          whiteSpace="nowrap"
        >
          Page
          {' '}
          <Typography
            color="textPrimary"
            component="span"
            sx={{ mx: 1 }}
            variant="subtitle2"
          >
            {page}
          </Typography>
          of
          {' '}
          <Typography
            color="textPrimary"
            component="span"
            sx={{ ml: 1 }}
            variant="subtitle2"
          >
            {pagesCount}
          </Typography>
        </Typography>
      )}
      <Box sx={{ flexGrow: 1 }} />
      <IconButton
        disabled={isFirstPage || disabled}
        onClick={handlePreviousPage}
      >
        <ChevronLeftIcon />
      </IconButton>
      <IconButton
        disabled={isLastPage || disabled}
        onClick={handleNextPage}
      >
        <ChevronRightIcon />
      </IconButton>
    </PaginationRoot>
  );
};

Pagination.defaultProps = {
  disabled: false,
  page: 1,
  rowsCount: 1
};

Pagination.propTypes = {
  disabled: PropTypes.bool,
  onPageChange: PropTypes.func,
  page: PropTypes.number,
  rowsCount: PropTypes.number
};
