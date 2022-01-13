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

const paymentStatusOptions = [
  {
    value: 'paid',
    label: 'Paid'
  },
  {
    value: 'not-paid',
    label: 'Not paid'
  }
];

const paymentMethodOptions = [
  {
    value: 'debit',
    label: 'Direct debit'
  },
  {
    value: 'paypal',
    label: 'Paypal'
  }
];

const courierOptions = ['DHL', 'UPS', 'FedEx', 'Purolator'];

export const OrderPaymentDialog = (props) => {
  const { open, onClose, order } = props;
  const formik = useFormik({
    initialValues: {
      paymentStatus: order?.paymentStatus || '',
      courier: order?.courier || '',
      paymentMethod: order?.paymentMethod || '',
      submit: null,
      trackingCode: order?.trackingCode || ''
    },
    validationSchema: Yup.object().shape({
      paymentStatus: Yup.string().max(255).required('Payment status is required'),
      courier: Yup.string().max(255).required('Courier is required'),
      paymentMethod: Yup.string().max(255).required('Payment method is required'),
      trackingCode: Yup.string().max(255).required('Tracking is required')
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
              disabled
              fullWidth
              label="Stripe Payment ID"
              name="paymentId"
              value={order.paymentId}
            />
          </Grid>
          <Grid
            item
            xs={12}
          >
            <InputField
              error={Boolean(formik.touched.paymentStatus && formik.errors.paymentStatus)}
              fullWidth
              helperText={formik.touched.paymentStatus && formik.errors.paymentStatus}
              label="Payment status"
              name="paymentStatus"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              select
              value={formik.values.paymentStatus}
            >
              {paymentStatusOptions.map((option) => (
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
              error={Boolean(formik.touched.paymentMethod && formik.errors.paymentMethod)}
              fullWidth
              helperText={formik.touched.paymentMethod && formik.errors.paymentMethod}
              label="Payment method"
              name="paymentMethod"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              select
              value={formik.values.paymentMethod}
            >
              {paymentMethodOptions.map((option) => (
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
              error={Boolean(formik.touched.courier && formik.errors.courier)}
              fullWidth
              helperText={formik.touched.courier && formik.errors.courier}
              label="Courier"
              name="courier"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              select
              value={formik.values.courier}
            >
              {courierOptions.map((option) => (
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
              error={Boolean(formik.touched.trackingCode && formik.errors.trackingCode)}
              fullWidth
              helperText={formik.touched.trackingCode && formik.errors.trackingCode}
              label="Tracking"
              name="trackingCode"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.trackingCode}
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

OrderPaymentDialog.defaultProps = {
  open: false
};

OrderPaymentDialog.propTypes = {
  onClose: PropTypes.func,
  open: PropTypes.bool,
  order: PropTypes.object.isRequired
};
