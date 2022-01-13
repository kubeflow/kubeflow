import { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  Button,
  Divider,
  Tab,
  Tabs,
  ToggleButton,
  ToggleButtonGroup
} from '@material-ui/core';
import { Adjustments as AdjustmentsIcon } from '../../icons/adjustments';
import { ViewGrid as ViewGridIcon } from '../../icons/view-grid';
import { ViewList as ViewListIcon } from '../../icons/view-list';
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
import { FilterDialog } from '../filter-dialog';
import { Query } from '../query';

const views = [
  {
    label: 'All',
    value: 'all'
  },
  {
    label: 'Processed',
    value: 'processed'
  },
  {
    label: 'Delivered',
    value: 'delivered'
  },
  {
    label: 'Complete',
    value: 'complete'
  }
];

const filterProperties = [
  {
    label: 'Status',
    name: 'status',
    type: 'string'
  },
  {
    label: 'Created',
    name: 'createdAt',
    type: 'date'
  },
  {
    label: 'Updated',
    name: 'updatedAt',
    type: 'date'
  },
  {
    label: 'Courier',
    name: 'courier',
    type: 'string'
  },
  {
    label: 'Payment Method',
    name: 'paymentMethod',
    type: 'string'
  },
  {
    label: 'Total Amount',
    name: 'totalAmount',
    type: 'number'
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

export const OrdersFilter = (props) => {
  const {
    disabled,
    filters,
    mode,
    onFiltersApply,
    onFiltersClear,
    onModeChange,
    onQueryChange,
    onViewChange,
    query,
    selectedOrders,
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
              sm: mode === 'table' && selectedOrders.length > 0 ? 'auto 1fr auto' : '1fr auto',
              xs: 'auto'
            },
            justifyItems: 'flex-start',
            p: 3
          }}
        >
          {mode === 'table' && (
            <BulkActionsMenu
              disabled={disabled}
              onArchive={() => { }}
              onDelete={() => { }}
              selectedCount={selectedOrders.length}
              sx={{
                display: selectedOrders.length > 0 ? 'flex' : 'none',
                order: {
                  sm: 1,
                  xs: 2
                }
              }}
            />
          )}
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
          <Box
            sx={{
              alignItems: 'center',
              display: 'flex',
              order: 3
            }}
          >
            <ToggleButtonGroup
              exclusive
              onChange={onModeChange}
              size="small"
              sx={{
                border: (theme) => `1px solid ${theme.palette.divider}`,
                p: 0.5,
                mr: 2,
                '& .MuiToggleButton-root': {
                  border: 0,
                  '&:not(:first-of-type)': {
                    borderRadius: 1
                  },
                  '&:first-of-type': {
                    borderRadius: 1,
                    mr: 0.5
                  }
                }
              }}
              value={mode}
            >
              <ToggleButton value="table">
                <ViewListIcon
                  fontSize="small"
                  sx={{ color: 'rgba(35, 45, 55, 0.38)' }}
                />
              </ToggleButton>
              <ToggleButton value="dnd">
                <ViewGridIcon
                  fontSize="small"
                  sx={{ color: 'rgba(35, 45, 55, 0.38)' }}
                />
              </ToggleButton>
            </ToggleButtonGroup>
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

OrdersFilter.defaultProps = {
  filters: [],
  mode: 'dnd',
  selectedOrders: [],
  view: 'all'
};

OrdersFilter.propTypes = {
  disabled: PropTypes.bool,
  filters: PropTypes.array,
  mode: PropTypes.oneOf(['table', 'dnd']),
  onFiltersApply: PropTypes.func,
  onFiltersClear: PropTypes.func,
  onModeChange: PropTypes.func,
  onQueryChange: PropTypes.func,
  onViewChange: PropTypes.func,
  query: PropTypes.string,
  selectedOrders: PropTypes.array,
  view: PropTypes.string
};
