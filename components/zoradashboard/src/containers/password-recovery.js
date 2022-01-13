import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
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

export const PasswordRecovery = () => {
  const mounted = useMounted();
  const { passwordRecovery } = useAuth();
  const { settings } = useSettings();
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      email: '',
      submit: null
    },
    validationSchema: Yup.object().shape({
      email: Yup.string().email('Must be a valid email').max(255).required('Email is required')
    }),
    onSubmit: async (values, { setErrors, setStatus, setSubmitting }) => {
      try {
        await passwordRecovery?.(values.email);

        navigate('/password-reset', {
          state: {
            username: values.email
          }
        });
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

  return (
    <>
      <Helmet>
        <title>Password Recovery | Carpatin Dashboard</title>
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
                      <Grid
                        container
                        spacing={2}
                      >
                        <Grid
                          item
                          xs={12}
                        >
                          <Typography
                            color="textPrimary"
                            variant="h4"
                          >
                            Forgot password
                          </Typography>
                        </Grid>
                        <Grid
                          item
                          xs={12}
                        >
                          <Typography
                            color="textPrimary"
                            variant="body1"
                          >
                            Enter the email address you used when you
                            joined and we’ll send you instructions to reset your password.
                          </Typography>
                        </Grid>
                        <Grid
                          item
                          xs={12}
                        >
                          <InputField
                            autoFocus
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
                            Send Verification Email
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
