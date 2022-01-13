import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { format } from 'date-fns';
import {
  Avatar,
  Box,
  Button,
  Card,
  CardHeader,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography
} from '@material-ui/core';
import { useDialog } from '../../hooks/use-dialog';
import { CustomCube as CubeIcon } from '../../icons/custom-cube';
import { generateResourceId } from '../../utils/generate-resource-id';
import { ConfirmationDialog } from '../confirmation-dialog';
import { ResourceUnavailable } from '../resource-unavailable';
import { Scrollbar } from '../scrollbar';
import { ProductVariantDialog } from './product-variant-dialog';

export const ProductVariants = (props) => {
  const { variants: variantsProp, ...other } = props;
  const [variantDialogOpen, handleOpenVariantDialog, handleCloseVariantDialog] = useDialog();
  const [deleteDialogOpen, handleOpenDeleteDialog, handleCloseDeleteDialog] = useDialog();
  const [variants, setVariants] = useState(variantsProp);
  const [selectedVariant, setSelectedVariant] = useState(null);

  const handleExitedDialog = () => {
    if (selectedVariant) {
      setSelectedVariant(null);
    }
  };

  const handleDeleteVariant = () => {
    setVariants((prevVariants) => prevVariants
      .filter((variant) => variant.id !== selectedVariant.id));
    setSelectedVariant(null);
    handleCloseDeleteDialog();
  };

  const handleVariantsChange = (variant, mode) => {
    let temp = [...variants];

    if (mode === 'add') {
      temp = [
        ...temp,
        {
          ...variant,
          id: generateResourceId(),
          createdAt: new Date()
        }
      ];
    } else {
      const index = variants.findIndex((_variant) => _variant.id === variant.id);
      temp[index] = variant;
    }

    setVariants(temp);
  };

  useEffect(() => {
    setVariants(variantsProp);
  }, [variantsProp]);

  const displayUnavailable = variants.length === 0;

  return (
    <>
      <Card
        variant="outlined"
        {...other}
      >
        <CardHeader
          action={(
            <Button
              color="primary"
              onClick={handleOpenVariantDialog}
              variant="text"
            >
              Add
            </Button>
          )}
          title="Variants"
        />
        <Divider />
        <Scrollbar>
          <Table sx={{ minWidth: 600 }}>
            <TableHead>
              <TableRow>
                <TableCell>
                  Variant
                </TableCell>
                <TableCell>
                  SKU
                </TableCell>
                <TableCell>
                  Created
                </TableCell>
                <TableCell>
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {variants.map((variant) => (
                <TableRow key={variant.id}>
                  <TableCell>
                    <Box
                      sx={{
                        alignItems: 'center',
                        display: 'flex'
                      }}
                    >
                      <Avatar
                        src={variant.image}
                        sx={{
                          border: (theme) => `1px solid ${theme.palette.divider}`,
                          height: 48,
                          mr: 2,
                          width: 48
                        }}
                        variant="rounded"
                      >
                        <CubeIcon />
                      </Avatar>
                      <div>
                        <Typography
                          color="textPrimary"
                          variant="body2"
                        >
                          {variant.name}
                        </Typography>
                        <Typography
                          color="textSecondary"
                          variant="body2"
                        >
                          {variant.price}
                        </Typography>
                      </div>
                    </Box>
                  </TableCell>
                  <TableCell>
                    {variant.sku}
                  </TableCell>
                  <TableCell>
                    {format(variant.createdAt, 'MMM dd yyyy')}
                  </TableCell>
                  <TableCell sx={{ width: 135 }}>
                    <Box sx={{ display: 'flex' }}>
                      <Typography
                        color="primary"
                        sx={{ cursor: 'pointer' }}
                        onClick={() => {
                          setSelectedVariant(variant);
                          handleOpenVariantDialog();
                        }}
                        variant="subtitle2"
                      >
                        Edit
                      </Typography>
                      <Divider
                        flexItem
                        orientation="vertical"
                        sx={{ mx: 2 }}
                      />
                      <Typography
                        color="primary"
                        onClick={() => {
                          setSelectedVariant(variant);
                          handleOpenDeleteDialog();
                        }}
                        sx={{ cursor: 'pointer' }}
                        variant="subtitle2"
                      >
                        Delete
                      </Typography>
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Scrollbar>
        {displayUnavailable && (
          <ResourceUnavailable
            onCreate={handleOpenVariantDialog}
            sx={{ m: 2 }}
          />
        )}
      </Card>
      <ProductVariantDialog
        onClose={handleCloseVariantDialog}
        onExited={handleExitedDialog}
        onVariantsChange={handleVariantsChange}
        open={variantDialogOpen}
        variant={selectedVariant}
      />
      <ConfirmationDialog
        message="Are you sure you want to delete this variant? This can't be undone."
        onCancel={handleCloseDeleteDialog}
        onConfirm={handleDeleteVariant}
        open={deleteDialogOpen}
        title="Delete variant"
        variant="error"
      />
    </>
  );
};

ProductVariants.propTypes = {
  variants: PropTypes.array.isRequired
};
