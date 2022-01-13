import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link as RouterLink, useLocation, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
  Alert,
  AppBar,
  Box,
  Button,
  Card,
  CardContent,
  Container,
  FormHelperText,
  Grid,
  Toolbar,
  Typography
} from '@material-ui/core';
import { ProductFeatures } from '../components/auth/product-features';
import { InputField } from '../components/input-field';
import { Logo } from '../components/logo';
import { useSettings } from '../contexts/settings-context';
import { useAuth } from '../hooks/use-auth';
import { useMounted } from '../hooks/use-mounted';
import gtm from '../lib/gtm';

export const PasswordReset = () => {
  const mounted = useMounted();
  const { passwordReset } = useAuth();
  const { settings } = useSettings();
  const location = useLocation();
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      code: '',
      email: location.state?.username || '',
      password: '',
      passwordConfirm: '',
      submit: null
    },
    validationSchema: Yup.object().shape({
      code: Yup.string().max(6).required('Code is required'),
      email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
      password: Yup
        .string()
        .min(7, 'Must be at least 7 characters')
        .max(255)
        .required('Required'),
      passwordConfirm: Yup
        .string()
        .oneOf([Yup.ref('password'), null], 'Passwords must match')
        .required('Required')
    }),
    onSubmit: async (values, { setErrors, setStatus, setSubmitting }) => {
      try {
        await passwordReset?.(values.email, values.code, values.password);

        navigate('/login');
      } catch (err) {
        console.error(err);
        if (mounted.current) {
          setStatus({ success: false });
          setErrors({ submit: err.message });
          setSubmitting(false);
        }
      }
    }
  });

  useEffect(() => {
    gtm.push({ event: 'page_view' });
  }, []);

  const showAlert = location.state?.username;

  return (
    <>
      <Helmet>
        <title>Password Reset | Carpatin Dashboard</title>
      </Helmet>
      <AppBar
        elevation={0}
        sx={{ backgroundColor: 'background.paper' }}
      >
        <Container maxWidth="md">
          <Toolbar
            disableGutters
            sx={{ height: 64 }}
          >
            <RouterLink to="/">
              <Logo variant={settings.theme === 'dark' ? 'light' : 'dark'} />
            </RouterLink>
          </Toolbar>
        </Container>
      </AppBar>
      <Box
        sx={{
          backgroundColor: 'background.default',
          minHeight: '100%',
          pt: '64px'
        }}
      >
        <Box sx={{ py: 9 }}>
          <Container maxWidth="md">
            {showAlert && (
              <Alert
                severity="success"
                sx={{ mb: 3 }}
                variant="filled"
              >
                If this email address was used to create an account,
                instructions to reset your password will be sent to you.
              </Alert>
            )}
            <Grid
              container
              spacing={6}
            >
              <Grid
                item
                md={6}
                sx={{
                  display: {
                    md: 'block',
                    xs: 'none'
                  }
                }}
                xs={12}
              >
                <ProductFeatures />
              </Grid>
              <Grid
                item
                md={6}
                xs={12}
              >
                <Card
                  sx={{ backgroundColor: 'background.default' }}
                  elevation={0}
                >
                  <CardContent>
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
                          Reset Password
                        </Typography>
                        <Box sx={{ flexGrow: 1 }} />
                        <Button
                          color="primary"
                          component={RouterLink}
                          to="/login"
                          variant="text"
                        >
                          Sign in
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
                            disabled={!!location.state?.username}
                            error={Boolean(formik.touched.email && formik.errors.email)}
                            fullWidth
                            helperText={formik.touched.email && formik.errors.email}
                            label="Email Address"
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
                            autoFocus={!!location.state?.username}
                            error={Boolean(formik.touched.code && formik.errors.code)}
                            fullWidth
                            helperText={formik.touched.code && formik.errors.code}
                            label="Reset code"
                            name="code"
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            value={formik.values.code}
                          />
                        </Grid>
                        <Grid
                          item
                          xs={12}
                        >
                          <InputField
                            error={Boolean(formik.touched.password
                              && formik.errors.password)}
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
                        <Grid
                          item
                          xs={12}
                        >
                          <InputField
                            error={Boolean(formik.touched.passwordConfirm
                              && formik.errors.passwordConfirm)}
                            fullWidth
                            helperText={formik.touched.passwordConfirm
                            && formik.errors.passwordConfirm}
                            label="Password Confirmation"
                            name="passwordConfirm"
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            type="password"
                            value={formik.values.passwordConfirm}
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
                            Reset password
                          </Button>
                        </Grid>
                      </Grid>
                    </form>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Container>
        </Box>
      </Box>
    </>
  );
};
