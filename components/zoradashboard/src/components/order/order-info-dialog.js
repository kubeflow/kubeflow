import PropTypes from 'prop-types';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import toast from 'react-hot-toast';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormHelperText,
  Grid,
  MenuItem
} from '@material-ui/core';
import { InputField } from '../input-field';

const statusOptions = [
  {
    label: 'Placed',
    value: 'placed'
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

const countryOptions = [
  {
    value: 'USA',
    cities: ['New York', 'Los Angeles', 'Chicago', 'Houston', 'Austin']
  },
  {
    value: 'Germany',
    cities: ['Berlin', 'Hamburg', 'Munich', 'Dortmund', 'Bremen']
  },
  {
    value: 'Spain',
    cities: ['Madrid', 'Barcelona', 'Valencia', 'Málaga', 'Sevilla']
  },
  {
    value: 'Italy',
    cities: ['Rome', 'Milan', 'Naples', 'Turin', 'Palermo']
  }
];

export const OrderInfoDialog = (props) => {
  const { open, onClose, order } = props;
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      address: order?.customer.address || '',
      country: order?.customer.country || '',
      email: order?.customer.email || '',
      phone: order?.customer.phone || '',
      city: order?.customer.city || '',
      status: order?.status || '',
      submit: null
    },
    validationSchema: Yup.object().shape({
      address: Yup.string().max(255).required('Address is required'),
      country: Yup
        .string()
        .max(255)
        .oneOf(countryOptions.map((option) => option.value))
        .required('Country is required'),
      email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
      phone: Yup.string().max(255).required('Phone number is required'),
      city: Yup.string().max(255).required('City is required'),
      status: Yup.string().max(255).required('Status is required')
    }),
    onSubmit: async (values, helpers) => {
      try {
        toast.success('Order updated');
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
        Edit order
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
              error={Boolean(formik.touched.email && formik.errors.email)}
              fullWidth
              helperText={formik.touched.email && formik.errors.email}
              label="Email"
              name="email"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              type="email"
              value={formik.values.email}
            />
          </Grid>
          <Grid
            item
            xs={12}
          >
            <InputField
              error={Boolean(formik.touched.address && formik.errors.address)}
              fullWidth
              helperText={formik.touched.address && formik.errors.address}
              label="Address"
              name="address"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.address}
            />
          </Grid>
          <Grid
            item
            xs={12}
          >
            <InputField
              error={Boolean(formik.touched.phone && formik.errors.phone)}
              fullWidth
              helperText={formik.touched.phone && formik.errors.phone}
              label="Phone number"
              name="phone"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.phone}
            />
          </Grid>
          <Grid
            item
            xs={12}
          >
            <InputField
              error={Boolean(formik.touched.status && formik.errors.status)}
              fullWidth
              helperText={formik.touched.status && formik.errors.status}
              label="Status"
              name="status"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              select
              value={formik.values.status}
            >
              {statusOptions.map((option) => (
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
              error={Boolean(formik.touched.country && formik.errors.country)}
              fullWidth
              helperText={formik.touched.country && formik.errors.country}
              label="Country"
              name="country"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              select
              value={formik.values.country}
            >
              {countryOptions.map((option) => (
                <MenuItem
                  key={option.value}
                  value={option.value}
                >
                  {option.value}
                </MenuItem>
              ))}
            </InputField>
          </Grid>
          <Grid
            item
            xs={12}
          >
            <InputField
              error={Boolean(formik.touched.city && formik.errors.city)}
              fullWidth
              helperText={formik.touched.city && formik.errors.city}
              label="City"
              name="city"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              select
              value={formik.values.city}
            >
              {(countryOptions
                .find((option) => option.value === formik.values.country)?.cities || [])
                .map((option) => (
                  <MenuItem
                    key={option}
                    value={option}
                  >
                    {option}
                  </MenuItem>
                ))}
            </InputField>
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

OrderInfoDialog.defaultProps = {
  open: false
};

OrderInfoDialog.propTypes = {
  onClose: PropTypes.func,
  open: PropTypes.bool,
  order: PropTypes.object
};
