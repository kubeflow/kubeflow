import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import toast from 'react-hot-toast';
import {
  Box,
  Button,
  Card,
  CardContent,
  FormHelperText,
  Grid,
  MenuItem,
  Typography
} from '@material-ui/core';
import { InputField } from '../components/input-field';
import gtm from '../lib/gtm';

const companySizeOptions = ['1', '2-10', '11-30', '31-50', '50+'];

export const OrganizationGeneral = () => {
  const formik = useFormik({
    initialValues: {
      companyName: 'ACME Corp LLC.',
      companySize: '2-10',
      submit: null
    },
    validationSchema: Yup.object().shape({
      companyName: Yup.string().max(255).required('Organization name is required'),
      companySize: Yup
        .string()
        .max(255)
        .oneOf(companySizeOptions)
        .required('Size is required')
    }),
    onSubmit: async (values, helpers) => {
      try {
        toast.success('Settings saved');
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

  useEffect(() => {
    gtm.push({ event: 'page_view' });
  }, []);

  return (
    <>
      <Helmet>
        <title>Organization: General | Carpatin Dashboard</title>
      </Helmet>
      <Box sx={{ backgroundColor: 'background.default' }}>
        <Card variant="outlined">
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
                  Settings
                </Typography>
              </Grid>
              <Grid
                item
                md={7}
                xs={12}
              >
                <form onSubmit={formik.handleSubmit}>
                  <InputField
                    error={Boolean(formik.touched.companyName
                      && formik.errors.companyName)}
                    fullWidth
                    helperText={formik.touched.companyName && formik.errors.companyName}
                    label="Organization name"
                    name="companyName"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    value={formik.values.companyName}
                  />
                  <InputField
                    error={Boolean(formik.touched.companySize
                      && formik.errors.companySize)}
                    fullWidth
                    helperText={formik.touched.companySize && formik.errors.companySize}
                    label="Company size"
                    name="companySize"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    select
                    sx={{ mt: 2 }}
                    value={formik.values.companySize}
                  >
                    {companySizeOptions.map((companySizeOption) => (
                      <MenuItem
                        key={companySizeOption}
                        value={companySizeOption}
                      >
                        {companySizeOption}
                      </MenuItem>
                    ))}
                  </InputField>
                  {formik.errors.submit && (
                    <FormHelperText
                      error
                      sx={{ mt: 2 }}
                    >
                      {formik.errors.submit}
                    </FormHelperText>
                  )}
                  <Button
                    color="primary"
                    disabled={formik.isSubmitting}
                    size="large"
                    sx={{ mt: 4 }}
                    type="submit"
                    variant="contained"
                  >
                    Save settings
                  </Button>
                </form>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Box>
    </>
  );
};
