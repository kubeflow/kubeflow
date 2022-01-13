import { Fragment } from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  IconButton,
  Typography
} from '@material-ui/core';
import { useFilters } from '../hooks/use-filters';
import { X as XIcon } from '../icons/x';
import { FilterDialogItem } from './filter-dialog-item';

export const FilterDialog = (props) => {
  const { open, onClose, operators, properties, onApply, onClear, ...other } = props;
  const {
    addFilter,
    clearFilters,
    filters,
    handleOperatorChange,
    handlePropertyChange,
    handleValueChange,
    removeFilter
  } = useFilters(properties, operators);

  const handleFiltersClear = () => {
    clearFilters();
    onClear?.();
    onClose?.();
  };

  return (
    <Dialog
      onClose={onClose}
      open={open}
      PaperProps={{
        sx: {
          maxWidth: 500,
          width: '100%'
        }
      }}
      {...other}
    >
      <DialogTitle
        sx={{
          alignItems: 'center',
          justifyContent: 'space-between',
          display: 'flex'
        }}
      >
        <Typography
          color="textPrimary"
          variant="inherit"
        >
          Filter
        </Typography>
        <IconButton
          onClick={onClose}
          size="small"
        >
          <XIcon
            fontSize="small"
            sx={{ color: 'text.primary' }}
          />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        {filters.map((filter, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <Fragment key={index}>
            <FilterDialogItem
              filter={filter}
              index={index}
              onAddFilter={addFilter}
              onRemoveFilter={removeFilter}
              onOperatorChange={handleOperatorChange}
              onPropertyChange={handlePropertyChange}
              onValueChange={handleValueChange}
              operators={operators}
              properties={properties}
            />
            {filters.length > index + 1 && (
              <Divider
                sx={{
                  my: 2,
                  '& .MuiDivider-wrapper': {
                    p: 0
                  }
                }}
                textAlign="left"
              >
                <Chip
                  color="primary"
                  label="AND"
                  size="small"
                />
              </Divider>
            )}
          </Fragment>
        ))}
      </DialogContent>
      <DialogActions>
        <Button
          color="error"
          onClick={handleFiltersClear}
          variant="text"
        >
          Reset
        </Button>
        <Button
          color="primary"
          onClick={() => {
            onApply?.(filters);
            onClose?.();
          }}
          variant="contained"
        >
          Filter
        </Button>
      </DialogActions>
    </Dialog>
  );
};

FilterDialog.defaultProps = {
  open: false
};

FilterDialog.propTypes = {
  onApply: PropTypes.func,
  onClear: PropTypes.func,
  onClose: PropTypes.func,
  open: PropTypes.bool,
  operators: PropTypes.array.isRequired,
  properties: PropTypes.array.isRequired
};
