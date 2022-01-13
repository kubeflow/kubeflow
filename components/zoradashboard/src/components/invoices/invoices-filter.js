import { useState } from 'react';
import PropTypes from 'prop-types';
import { Box, Button, Divider, Tab, Tabs } from '@material-ui/core';
import { Adjustments as AdjustmentsIcon } from '../../icons/adjustments';
import {
  containsOperator,
  endsWithOperator,
  equalOperator,
  greaterThanOperator,
  isAfterOperator,
  isBeforeOperator,
  isBlankOperator,
  isPresentOperator,
  lessThanOperator,
  notContainsOperator,
  notEqualOperator,
  startsWithOperator
} from '../../utils/filter-operators';
import { BulkActionsMenu } from '../bulk-actions-menu';
import { Query } from '../query';
import { FilterDialog } from '../filter-dialog';

const views = [
  {
    label: 'Show all',
    value: 'all'
  },
  {
    label: 'Ongoing',
    value: 'ongoing'
  },
  {
    label: 'Paid',
    value: 'paid'
  },
  {
    label: 'Overdue',
    value: 'overdue'
  }
];

const filterProperties = [
  {
    label: 'Invoice date',
    name: 'issueDate',
    type: 'date'
  },
  {
    label: 'Due date',
    name: 'dueDate',
    type: 'date'
  },
  {
    label: 'Total',
    name: 'totalAmount',
    type: 'string'
  },
  {
    label: 'Payment method',
    name: 'paymentMethod',
    type: 'string'
  },
  {
    label: 'Status',
    name: 'status',
    type: 'string'
  }
];

const filterOperators = [
  equalOperator,
  notEqualOperator,
  containsOperator,
  notContainsOperator,
  startsWithOperator,
  endsWithOperator,
  greaterThanOperator,
  lessThanOperator,
  isAfterOperator,
  isBeforeOperator,
  isBlankOperator,
  isPresentOperator
];

export const InvoicesFilter = (props) => {
  const {
    disabled,
    filters,
    onFiltersApply,
    onFiltersClear,
    onQueryChange,
    onViewChange,
    query,
    selectedInvoices,
    view
  } = props;
  const [openFilterDialog, setOpenFilterDialog] = useState(false);

  return (
    <>
      <div>
        <Box
          sx={{
            px: {
              sm: 3
            }
          }}
        >
          <Tabs
            onChange={(event, value) => onViewChange?.(value)}
            allowScrollButtonsMobile
            value={view}
            variant="scrollable"
          >
            {views.map((option) => (
              <Tab
                disabled={disabled}
                key={option.label}
                label={option.label}
                value={option.value}
              />
            ))}
          </Tabs>
        </Box>
        <Divider />
        <Box
          sx={{
            alignItems: 'center',
            display: 'grid',
            gap: 2,
            gridTemplateColumns: {
              sm: selectedInvoices.length > 0 ? 'auto 1fr auto' : '1fr auto',
              xs: 'auto'
            },
            justifyItems: 'flex-start',
            p: 3
          }}
        >
          <BulkActionsMenu
            disabled={disabled}
            onArchive={() => { }}
            onDelete={() => { }}
            selectedCount={selectedInvoices.length}
            sx={{
              display: selectedInvoices.length > 0 ? 'flex' : 'none',
              order: {
                sm: 1,
                xs: 2
              }
            }}
          />
          <Query
            disabled={disabled}
            onChange={onQueryChange}
            sx={{
              order: {
                sm: 2,
                xs: 1
              }
            }}
            value={query}
          />
          <Button
            color="primary"
            disabled={disabled}
            onClick={() => setOpenFilterDialog(true)}
            startIcon={<AdjustmentsIcon />}
            size="large"
            sx={{ order: 3 }}
            variant={filters.length ? 'contained' : 'text'}
          >
            Filter
          </Button>
        </Box>
      </div>
      <FilterDialog
        onApply={onFiltersApply}
        onClear={onFiltersClear}
        onClose={() => setOpenFilterDialog(false)}
        open={openFilterDialog}
        operators={filterOperators}
        properties={filterProperties}
      />
    </>
  );
};

InvoicesFilter.defaultProps = {
  filters: [],
  selectedInvoices: [],
  view: 'all'
};

InvoicesFilter.propTypes = {
  disabled: PropTypes.bool,
  filters: PropTypes.array,
  onFiltersApply: PropTypes.func,
  onFiltersClear: PropTypes.func,
  onQueryChange: PropTypes.func,
  onViewChange: PropTypes.func,
  query: PropTypes.string,
  selectedInvoices: PropTypes.array,
  view: PropTypes.string
};
