import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormHelperText,
  Grid
} from '@material-ui/core';
import { InputField } from '../input-field';

export const OrderCreateDialog = (props) => {
  const { open, onClose, ...other } = props;
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      customerEmail: '',
      customerName: '',
      submit: 'null'
    },
    validationSchema: Yup.object().shape({
      customerEmail: Yup.string().max(255).email().required('Customer email is required'),
      customerName: Yup.string().max(255).required('Customer name is required')
    }),
    onSubmit: async (values, helpers) => {
      try {
        helpers.setStatus({ success: true });
        helpers.setSubmitting(false);
        helpers.resetForm();
        navigate('/dashboard/orders/1');
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
        Create Order
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
              error={Boolean(formik.touched.customerName && formik.errors.customerName)}
              fullWidth
              helperText={formik.touched.customerName && formik.errors.customerName}
              label="Customer Name"
              name="customerName"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.customerName}
            />
          </Grid>
          <Grid
            item
            xs={12}
          >
            <InputField
              error={Boolean(formik.touched.customerEmail && formik.errors.customerEmail)}
              fullWidth
              helperText={formik.touched.customerEmail && formik.errors.customerEmail}
              label="Customer Email"
              name="customerEmail"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              type="email"
              value={formik.values.customerEmail}
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
          disabled={formik.isSubmitting}
        >
          Create Order
        </Button>
      </DialogActions>
    </Dialog>
  );
};

OrderCreateDialog.defaultProps = {
  open: false
};

OrderCreateDialog.propTypes = {
  onClose: PropTypes.func,
  open: PropTypes.bool
};
