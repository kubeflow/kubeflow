import PropTypes from 'prop-types';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import toast from 'react-hot-toast';
import {
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormHelperText,
  Grid,
  Typography
} from '@material-ui/core';
import { AutocompleteField } from '../autocomplete-field';
import { InputField } from '../input-field';

const compositionOptions = ['Leather', 'Metal'];
const tagOptions = ['Watch', 'Style'];

export const ProductInfoDialog = (props) => {
  const { open, onClose, product } = props;
  const formik = useFormik({
    initialValues: {
      brand: product?.brand || '',
      chargeTax: product?.chargeTax || true,
      description: product?.description || '',
      displayName: product?.displayName || '',
      composition: product?.composition || [],
      sku: product?.sku || '',
      submit: null,
      tags: product?.tags || []
    },
    validationSchema: Yup.object().shape({
      brand: Yup.string().max(255).required('Brand is required'),
      chargeTax: Yup.boolean(),
      description: Yup.string().max(500).required('Description is required'),
      displayName: Yup.string().max(255).required('Display name is required'),
      composition: Yup.array(),
      sku: Yup.string().max(255).required('SKU is required'),
      tags: Yup.array()
    }),
    onSubmit: async (values, helpers) => {
      try {
        toast.success('Product updated');
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
        onExited: () => formik.resetForm()
      }}
    >
      <DialogTitle>
        Edit Product
      </DialogTitle>
      <DialogContent>
        <Grid
          container
          spacing={2}
        >
          <Grid
            item
            md={6}
            xs={12}
          >
            <InputField
              disabled
              error={Boolean(formik.touched.brand && formik.errors.brand)}
              fullWidth
              helperText={formik.touched.brand && formik.errors.brand}
              label="Brand name"
              name="brand"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.brand}
            />
          </Grid>
          <Grid
            item
            md={6}
            xs={12}
          >
            <InputField
              disabled
              error={Boolean(formik.touched.sku && formik.errors.sku)}
              fullWidth
              helperText={formik.touched.sku && formik.errors.sku}
              label="SKU"
              name="sku"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.sku}
            />
          </Grid>
          <Grid
            item
            xs={12}
          >
            <InputField
              error={Boolean(formik.touched.displayName && formik.errors.displayName)}
              fullWidth
              helperText={formik.touched.displayName && formik.errors.displayName}
              label="Display name"
              name="displayName"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.displayName}
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
              rows={4}
              value={formik.values.description}
            />
          </Grid>
          <Grid
            item
            xs={12}
          >
            <AutocompleteField
              error={Boolean(formik.touched.composition
                && formik.errors.composition)}
              filterSelectedOptions
              helperText={formik.touched.composition && formik.errors.composition}
              label="Composition"
              multiple
              onChange={(event, value) => {
                formik.setFieldValue('composition',
                  value);
              }}
              options={compositionOptions}
              placeholder="Feature"
              value={formik.values.composition}
            />
          </Grid>
          <Grid
            item
            xs={12}
          >
            <AutocompleteField
              error={Boolean(formik.touched.tags && formik.errors.tags)}
              filterSelectedOptions
              helperText={formik.touched.tags && formik.errors.tags}
              label="Tags"
              multiple
              onChange={(event, value) => { formik.setFieldValue('tags', value); }}
              options={tagOptions}
              placeholder="Tag"
              value={formik.values.tags}
            />
          </Grid>
          <Grid
            item
            md={6}
            sx={{
              alignItems: 'center',
              display: 'flex'
            }}
            xs={12}
          >
            <Checkbox
              checked={formik.values.chargeTax}
              onChange={(event) => {
                formik.setFieldValue('chargeTax',
                  event.target.checked);
              }}
            />
            <Typography
              color="textPrimary"
              variant="body1"
            >
              Charge tax on this product
            </Typography>
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
          Save Changes
        </Button>
      </DialogActions>
    </Dialog>
  );
};

ProductInfoDialog.defaultProps = {
  open: false
};

ProductInfoDialog.propTypes = {
  onClose: PropTypes.func,
  open: PropTypes.bool,
  product: PropTypes.object
};
