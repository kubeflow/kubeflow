import PropTypes from 'prop-types';
import { format } from 'date-fns';
import { Button, Card, CardHeader, Divider, useMediaQuery } from '@material-ui/core';
import { PropertyList } from '../property-list';
import { PropertyListItem } from '../property-list-item';

export const ProductInfo = (props) => {
  const { onEdit, product, ...other } = props;
  const mdDown = useMediaQuery((theme) => theme.breakpoints.down('md'));

  const align = mdDown ? 'vertical' : 'horizontal';

  return (
    <Card
      variant="outlined"
      {...other}
    >
      <CardHeader
        action={(
          <Button
            color="primary"
            onClick={onEdit}
            variant="text"
          >
            Edit
          </Button>
        )}
        title="General Information"
      />
      <Divider />
      <PropertyList>
        <PropertyListItem
          align={align}
          label="Brand Name"
          value={product.brand}
        />
        <PropertyListItem
          align={align}
          label="ID"
          value={product.id}
        />
        <PropertyListItem
          align={align}
          label="Display Name"
          value={product.name}
        />
        <PropertyListItem
          align={align}
          label="Description"
          value="Our premium line of watches with a minimalist and timeless look. Designed in the UK and perfect for everyday use. This is our black on black leather. The stainless steel case has a brushed matt black finish with a subtle reflective dial. The hands and numbers are in a shiny gun metal finish."
        />
        <PropertyListItem
          align={align}
          label="Created"
          value={format(product.createdAt, 'MMM dd, yyyy')}
        />
        <PropertyListItem
          align={align}
          label="Composition"
          value={product.composition.join(', ')}
        />
        <PropertyListItem
          align={align}
          label="Tags"
          value={product.tags.join(', ')}
        />
        <PropertyListItem
          align={align}
          label="Updated"
          value={format(product.updatedAt, 'MMM dd, yyyy')}
        />
      </PropertyList>
    </Card>
  );
};

ProductInfo.propTypes = {
  onEdit: PropTypes.func,
  product: PropTypes.object.isRequired
};
