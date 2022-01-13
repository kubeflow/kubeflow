import { Link as BrowserLink } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Alert, Box, Button, FormHelperText, Grid, Typography } from '@material-ui/core';
import { InputField } from '../input-field';
import { useAuth } from '../../hooks/use-auth';
import { useMounted } from '../../hooks/use-mounted';

export const LoginJwt = () => {
  const mounted = useMounted();
  const { login } = useAuth();
  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
      submit: null
    },
    validationSchema: Yup.object().shape({
      username: Yup.string().required("Username is required"),
      // email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
      password: Yup.string().max(255).required('Password is required'),
      policy: Yup.boolean()
    }),
    onSubmit: async (values, helpers) => {
      try {
        await login(values.username, values.password);

        if (mounted.current) {
          helpers.setStatus({ success: true });
          helpers.setSubmitting(false);
        }
      } catch (err) {
        console.error(err);
        if (mounted.current) {
          helpers.setStatus({ success: false });
          helpers.setErrors({ submit: err.message });
          helpers.setSubmitting(false);
        }
      }
    }
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <Box
        sx={{
          alignItems: 'center',
          display: 'flex',
          mb: 3
        }}
      >
        <Typography
          color="textPrimary"
          variant="h4"
        >
          Login
        </Typography>
        <Box sx={{ flexGrow: 1 }} />
        <Button
          color="primary"
          component={BrowserLink}
          to="/register"
          variant="text"
        >
          Sign Up
        </Button>
      </Box>
      <Grid
        container
        spacing={2}
      >
        <Grid
          item
          xs={12}
        >
          <InputField
            autoFocus
            error={Boolean(formik.touched.username && formik.errors.username)}
            fullWidth
            helperText={formik.touched.username && formik.errors.username}
            label="Username"
            name="username"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            type="text"
            value={formik.values.username}
          />
        </Grid>
        <Grid
          item
          xs={12}
        >
          <InputField
            error={Boolean(formik.touched.password && formik.errors.password)}
            fullWidth
            helperText={formik.touched.password && formik.errors.password}
            label="Password"
            name="password"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            type="password"
            value={formik.values.password}
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
            disabled={formik.isSubmitting}
            fullWidth
            size="large"
            type="submit"
            variant="contained"
          >
            Log In
          </Button>
        </Grid>
        <Grid
          item
          xs={12}
        >
          <Button
            color="primary"
            component={BrowserLink}
            to="/password-recovery"
            variant="text"
          >
            Forgot password
          </Button>
        </Grid>
      </Grid>
      {/* <Alert
        severity="info"
        sx={{ mt: 3 }}
      >
        You can use
        &nbsp;
        <strong>demo@devias.io</strong>
        &nbsp;
        and password
        &nbsp;
        <strong>Password123!</strong>
      </Alert> */}
    </form>
  );
};
