import { Fragment } from 'react';
import PropTypes from 'prop-types';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
  Button,
  Card,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  FormControlLabel,
  FormHelperText,
  Grid,
  Radio,
  RadioGroup,
  Typography
} from '@material-ui/core';
import { wait } from '../../utils/wait';
import { InputField } from '../input-field';

const roleOptions = [
  {
    id: '1',
    description: 'Edit access',
    label: 'Editor',
    value: 'editor'
  },
  {
    id: '2',
    description: 'Full access & billing',
    label: 'Administrator',
    value: 'administrator'
  }
];

export const OrganizationInviteDialog = (props) => {
  const { open, onClose, ...other } = props;
  const formik = useFormik({
    initialValues: {
      email: '',
      fullName: '',
      role: 'editor',
      submit: null
    },
    validationSchema: Yup.object().shape({
      email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
      fullName: Yup.string().max(255).required('Name is required'),
      role: Yup.mixed().oneOf(roleOptions.map((option) => option.value))
    }),
    onSubmit: async (values, helpers) => {
      try {
        await wait(250);
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
      TransitionProps={{
        onExited: () => formik.resetForm()
      }}
      {...other}
    >
      <form onSubmit={formik.handleSubmit}>
        <DialogTitle>
          Invite a team member
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
                error={Boolean(formik.touched.fullName && formik.errors.fullName)}
                fullWidth
                helperText={formik.touched.fullName && formik.errors.fullName}
                label="Full name"
                name="fullName"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.fullName}
              />
            </Grid>
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
                type="email"
                value={formik.values.email}
              />
            </Grid>
            <Grid
              item
              xs={12}
            >
              <Typography
                color="textPrimary"
                sx={{ mb: 1.5 }}
                variant="subtitle2"
              >
                Role
              </Typography>
              <Card variant="outlined">
                <RadioGroup
                  name="role"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.role}
                >
                  {roleOptions.map((option, index) => (
                    <Fragment key={option.id}>
                      <FormControlLabel
                        disableTypography
                        control={<Radio color="primary" />}
                        label={(
                          <div>
                            <Typography
                              color="textPrimary"
                              variant="body1"
                            >
                              {option.label}
                            </Typography>
                            <Typography
                              color="textSecondary"
                              variant="caption"
                            >
                              {option.description}
                            </Typography>
                          </div>
                        )}
                        sx={{ p: 1.5 }}
                        value={option.value}
                      />
                      {roleOptions.length > index + 1 && <Divider />}
                    </Fragment>
                  ))}
                </RadioGroup>
              </Card>
              {formik.touched.role && formik.errors.role && (
                <FormHelperText error>
                  {formik.errors.role}
                </FormHelperText>
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
            type="button"
            variant="text"
          >
            Cancel
          </Button>
          <Button
            color="primary"
            type="submit"
            variant="contained"
            disabled={formik.isSubmitting}
          >
            Send Invite
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

OrganizationInviteDialog.defaultProps = {
  open: false
};

OrganizationInviteDialog.propTypes = {
  onClose: PropTypes.func,
  open: PropTypes.bool
};
