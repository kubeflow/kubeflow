import PropTypes from 'prop-types';
import { Button, Grid, MenuItem, Typography } from '@material-ui/core';
import { Plus as PlusIcon } from '../icons/plus';
import { DateField } from './date-field';
import { InputField } from './input-field';

export const FilterDialogItem = (props) => {
  const {
    properties,
    filter,
    index,
    onAddFilter,
    onRemoveFilter,
    onPropertyChange,
    onOperatorChange,
    onValueChange,
    operators
  } = props;

  return (
    <div>
      <Typography
        color="textSecondary"
        sx={{ mb: 1 }}
        variant="caption"
      >
        Where
      </Typography>
      <Grid
        container
        spacing={2}
        sx={{ pb: 1 }}
      >
        <Grid
          item
          xs={6}
        >
          <InputField
            fullWidth
            onChange={(event) => onPropertyChange(index, event.target.value)}
            select
            value={filter.property.name}
          >
            {properties.map((property) => (
              <MenuItem
                key={property.name}
                value={property.name}
              >
                {property.label}
              </MenuItem>
            ))}
          </InputField>
        </Grid>
        <Grid
          item
          xs={6}
        >
          <InputField
            fullWidth
            value={filter.operator.value}
            select
            onChange={(event) => onOperatorChange(index, event.target.value)}
          >
            {operators
              .filter((operator) => (operator.typesAccepted.includes(filter.property.type)
                || operator.typesAccepted.includes('blank')))
              .map((operator) => (
                <MenuItem
                  key={operator.value}
                  value={operator.value}
                >
                  {operator.label}
                </MenuItem>
              ))}
          </InputField>
        </Grid>
        {!filter.operator.typesAccepted.includes('blank')
        && (filter.operator.typesAccepted.includes('date')
          ? (
            <Grid
              item
              xs={12}
            >
              <DateField
                fullWidth
                onChange={(date) => onValueChange(index, date)}
                value={filter.value}
              />
            </Grid>
          )
          : (
            <Grid
              item
              xs={12}
            >
              <InputField
                fullWidth
                onChange={(event) => onValueChange(index, event.target.value)}
                value={filter.value}
              />
            </Grid>
          ))}
      </Grid>
      <Button
        color="primary"
        onClick={() => onAddFilter(index + 1)}
        size="small"
        startIcon={<PlusIcon />}
        sx={{ mr: 2 }}
        variant="text"
      >
        Add Filter
      </Button>
      <Button
        onClick={() => onRemoveFilter(index)}
        size="small"
        sx={{ color: 'text.secondary' }}
        variant="text"
      >
        Remove
      </Button>
    </div>
  );
};

FilterDialogItem.propTypes = {
  properties: PropTypes.array,
  filter: PropTypes.object,
  index: PropTypes.number,
  onAddFilter: PropTypes.func,
  onRemoveFilter: PropTypes.func,
  onPropertyChange: PropTypes.func,
  onOperatorChange: PropTypes.func,
  onValueChange: PropTypes.func,
  operators: PropTypes.array
};
