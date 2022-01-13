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

const countryOptions = ['USA', 'Germany', 'Spain', 'Italy'];

export const CustomerDialog = (props) => {
  const { customer, open, onClose, ...other } = props;
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      address: customer?.address || '',
      email: customer?.email || '',
      fullName: customer?.fullName || '',
      country: customer?.country || '',
      phone: customer?.phone || '',
      submit: null
    },
    validationSchema: Yup.object().shape({
      address: Yup.string().max(255),
      email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
      fullName: Yup.string().max(255).required('Full name is required'),
      country: Yup.string().oneOf(countryOptions),
      phone: Yup.string().max(255)
    }),
    onSubmit: async (values, helpers) => {
      try {
        toast.success(`Customer ${customer ? 'updated' : 'created'}`);
        helpers.resetForm();
        helpers.setStatus({ success: true });
        helpers.setSubmitting(false);
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
      TransitionProps={{
        onExited: () => formik.resetForm()
      }}
      {...other}
    >
      <DialogTitle>
        {customer ? 'Update Customer' : 'Create Customer'}
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
              label="Email address"
              name="email"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              required
              type="email"
              value={formik.values.email}
            />
          </Grid>
          <Grid
            item
            xs={12}
          >
            <InputField
              error={Boolean(formik.touched.fullName && formik.errors.fullName)}
              fullWidth
              helperText={formik.touched.fullName && formik.errors.fullName}
              label="Full Name"
              name="fullName"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              required
              value={formik.values.fullName}
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
              error={Boolean(formik.touched.country && formik.errors.country)}
              fullWidth
              helperText={formik.touched.country && formik.errors.country}
              label="Location"
              name="country"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              select
              value={formik.values.country}
            >
              {countryOptions.map((option) => (
                <MenuItem
                  key={option}
                  value={option}
                >
                  {option}
                </MenuItem>
              ))}
            </InputField>
          </Grid>
          <Grid
            item
            xs={12}
          >
            <InputField
              error={Boolean(formik.touched.address && formik.errors.address)}
              fullWidth
              helperText={formik.touched.address && formik.errors.address}
              label="Full address"
              name="address"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.address}
            />
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
          variant="outlined"
        >
          Cancel
        </Button>
        <Button
          color="primary"
          disabled={formik.isSubmitting}
          onClick={() => { formik.handleSubmit(); }}
          variant="contained"
        >
          {customer ? 'Update' : 'Create'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

CustomerDialog.defaultProps = {
  open: false
};

CustomerDialog.propTypes = {
  customer: PropTypes.object,
  open: PropTypes.bool,
  onClose: PropTypes.func
};
