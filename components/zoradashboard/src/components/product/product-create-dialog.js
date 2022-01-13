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
  Grid
} from '@material-ui/core';
import { InputField } from '../input-field';

export const ProductCreateDialog = (props) => {
  const { open, onClose, ...other } = props;
  const formik = useFormik({
    initialValues: {
      description: '',
      name: '',
      submit: 'null'
    },
    validationSchema: Yup.object().shape({
      description: Yup.string().max(500).required('Description is required'),
      name: Yup.string().max(255).required('Name is required')
    }),
    onSubmit: async (values, helpers) => {
      try {
        toast.success('Product created');
        helpers.setStatus({ success: true });
        helpers.setSubmitting(false);
        helpers.resetForm();
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
      TransitionProps={{
        onExited: () => formik.resetForm()
      }}
      {...other}
    >
      <DialogTitle>
        Create Product
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
              label="Product name"
              name="name"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.name}
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
          disabled={formik.isSubmitting}
          onClick={() => { formik.handleSubmit(); }}
          variant="contained"
        >
          Create Product
        </Button>
      </DialogActions>
    </Dialog>
  );
};

ProductCreateDialog.defaultProps = {
  open: false
};

ProductCreateDialog.propTypes = {
  onClose: PropTypes.func,
  open: PropTypes.bool
};
