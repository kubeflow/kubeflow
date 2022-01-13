import PropTypes from 'prop-types';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import toast from 'react-hot-toast';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormHelperText,
  Grid,
  IconButton,
  InputAdornment,
  MenuItem,
  Typography
} from '@material-ui/core';
import { Trash as TrashIcon } from '../../icons/trash';
import { InputField } from '../input-field';
import { ImageDropzone } from '../image-dropzone';

const currencyOptions = [
  {
    label: 'EUR',
    value: 'eur'
  },
  {
    label: 'USD',
    value: 'usd'
  }
];

export const ProductVariantDialog = (props) => {
  const { open, onClose, onExited, onVariantsChange, variant, ...other } = props;
  const mode = variant ? 'update' : 'add';
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      currency: variant?.currency || 'eur',
      description: variant?.description || '',
      image: variant?.image || '',
      name: variant?.name || '',
      price: variant?.price || 0,
      sku: variant?.sku || '',
      submit: null
    },
    validationSchema: Yup.object().shape({
      currency: Yup
        .string()
        .oneOf(currencyOptions.map((option) => option.value))
        .required('Currency is required'),
      description: Yup.string().max(1024).required('Description name is required'),
      image: Yup.string(),
      name: Yup.string().max(255).required('Variant name is required'),
      price: Yup.number().required('Price is required'),
      sku: Yup.string().max(255).required('Sku is required')
    }),
    onSubmit: async (values, helpers) => {
      try {
        toast.success(mode === 'update' ? 'Variant updated' : 'Variant saved');
        onVariantsChange?.({ ...variant, ...values }, mode);
        helpers.setStatus({ success: true });
        helpers.setSubmitting(false);
        onClose?.();
      } catch (err) {
        console.error(err);
        helpers.setStatus({ success: false });
        helpers.setErrors({ submit: err.message });
        helpers.setSubmitting(false);
      }
    }
  });

  return (
    <Dialog
      onClose={onClose}
      open={open}
      PaperProps={{
        sx: {
          width: '100%'
        }
      }}
      TransitionProps={{
        onExited: () => {
          onExited?.();
          formik.resetForm();
        }
      }}
      {...other}
    >
      <DialogTitle>
        {mode === 'update' ? 'Update Variant' : 'Add Variant'}
      </DialogTitle>
      <DialogContent>
        <Grid
          container
          spacing={2}
        >
          <Grid
            item
            xs={12}
          >
            <InputField
              error={Boolean(formik.touched.name && formik.errors.name)}
              fullWidth
              helperText={formik.touched.name && formik.errors.name}
              label="Name"
              name="name"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              placeholder="e.g Green"
              value={formik.values.name}
            />
          </Grid>
          <Grid
            item
            xs={12}
          >
            <InputField
              error={Boolean(formik.touched.sku && formik.errors.sku)}
              fullWidth
              helperText={formik.touched.sku && formik.errors.sku}
              label="SKU"
              name="sku"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              placeholder="D-293TX"
              value={formik.values.sku}
            />
          </Grid>
          <Grid
            item
            xs={12}
          >
            <InputField
              error={Boolean(formik.touched.description && formik.errors.description)}
              fullWidth
              helperText={formik.touched.description && formik.errors.description}
              label="Description"
              multiline
              name="description"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              placeholder="Product description"
              rows={4}
              value={formik.values.description}
            />
          </Grid>
          <Grid
            item
            xs={12}
          >
            <InputField
              error={Boolean(formik.touched.currency && formik.errors.currency)}
              helperText={formik.touched.currency && formik.errors.currency}
              label="Currency"
              name="currency"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              select
              sx={{ minWidth: 236 }}
              value={formik.values.currency}
            >
              {currencyOptions.map((option) => (
                <MenuItem
                  key={option.value}
                  value={option.value}
                >
                  {option.label}
                </MenuItem>
              ))}
            </InputField>
          </Grid>
          <Grid
            item
            xs={12}
          >
            <InputField
              error={Boolean(formik.touched.price && formik.errors.price)}
              helperText={formik.touched.price && formik.errors.price}
              label="Price"
              name="price"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              type="number"
              sx={{ maxWidth: 236 }}
              value={formik.values.price}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    {currencyOptions
                      .find((option) => option.value === formik.values.currency).label}
                  </InputAdornment>
                )
              }}
            />
          </Grid>
          <Grid
            item
            xs={12}
          >
            <Typography
              color="textPrimary"
              sx={{ mb: 1.25 }}
              variant="subtitle2"
            >
              Image
            </Typography>
            {formik.values.image
              ? (
                <Box
                  sx={{
                    borderRadius: 1,
                    boxShadow: '0 0 0 1px rgba(24, 33, 77, 0.23)',
                    display: 'flex',
                    position: 'relative',
                    width: 'fit-content',
                    '& img': {
                      borderRadius: 1,
                      display: 'block',
                      maxWidth: 126
                    },
                    '&:hover': {
                      boxShadow: (theme) => `0 0 0 1px ${theme.palette.primary.main}`,
                      '& > button': {
                        display: 'block'
                      },
                      '& img': {
                        opacity: 0.3
                      }
                    }
                  }}
                >
                  <img
                    alt={formik.values.name}
                    src={formik.values.image}
                  />
                  <IconButton
                    color="error"
                    onClick={() => formik.setFieldValue('image', '')}
                    sx={{
                      display: 'none',
                      left: 0,
                      position: 'absolute',
                      top: 0
                    }}
                  >
                    <TrashIcon fontSize="small" />
                  </IconButton>
                </Box>
              ) : (
                <ImageDropzone
                  onDrop={(files) => formik.setFieldValue('image', URL.createObjectURL(files[0]))}
                  sx={{
                    minHeight: 126,
                    maxWidth: 126
                  }}
                />
              )}
          </Grid>
          {formik.errors.submit && (
            <Grid
              item
              xs={12}
            >
              <FormHelperText error>
                {formik.errors.submit}
              </FormHelperText>
            </Grid>
          )}
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button
          color="primary"
          onClick={onClose}
          variant="text"
        >
          Cancel
        </Button>
        <Button
          color="primary"
          onClick={() => { formik.handleSubmit(); }}
          variant="contained"
        >
          {mode === 'update' ? 'Update Variant' : 'Add Variant'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

ProductVariantDialog.defaultProps = {
  open: false
};

ProductVariantDialog.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  onExited: PropTypes.func,
  onVariantsChange: PropTypes.func,
  variant: PropTypes.object
};
