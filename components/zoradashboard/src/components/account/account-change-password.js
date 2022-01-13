import { useFormik } from 'formik';
import * as Yup from 'yup';
import toast from 'react-hot-toast';
import { Button, Card, CardContent, FormHelperText, Grid, Typography } from '@material-ui/core';
import { InputField } from '../input-field';

export const AccountChangePassword = (props) => {
  const formik = useFormik({
    initialValues: {
      newPassword: '',
      password: '',
      submit: null
    },
    validationSchema: Yup.object().shape({
      newPassword: Yup.string().min(7).max(255).required('New password is required'),
      password: Yup.string().min(7).max(255).required('Old password is required')
    }),
    onSubmit: async (values, helpers) => {
      try {
        toast.success('Password changed');
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
    <Card
      variant="outlined"
      {...props}
    >
      <CardContent>
        <Grid
          container
          spacing={4}
        >
          <Grid
            item
            md={5}
            xs={12}
          >
            <Typography
              color="textPrimary"
              variant="h6"
            >
              Change password
            </Typography>
          </Grid>
          <Grid
            item
            md={7}
            xs={12}
          >
            <form onSubmit={formik.handleSubmit}>
              <Grid
                container
                spacing={2}
              >
                <Grid
                  item
                  xs={12}
                >
                  <InputField
                    error={Boolean(formik.touched.password && formik.errors.password)}
                    fullWidth
                    helperText={formik.touched.password && formik.errors.password}
                    label="Old password"
                    name="password"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    type="password"
                    value={formik.values.password}
                  />
                </Grid>
                <Grid
                  item
                  xs={12}
                >
                  <InputField
                    error={Boolean(formik.touched.newPassword
                      && formik.errors.newPassword)}
                    fullWidth
                    helperText={formik.touched.newPassword && formik.errors.newPassword}
                    label="New password"
                    name="newPassword"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    type="password"
                    value={formik.values.newPassword}
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
                <Grid
                  item
                  xs={12}
                >
                  <Button
                    color="primary"
                    size="large"
                    type="submit"
                    variant="contained"
                  >
                    Change password
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};
