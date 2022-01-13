import { useFormik } from 'formik';
import * as Yup from 'yup';
import toast from 'react-hot-toast';
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  FormHelperText,
  Grid,
  MenuItem,
  Typography
} from '@material-ui/core';
import { InputField } from '../input-field';
import React, {useEffect, useState, useContext} from 'react';
import { useProfile, ProfileConsumer } from '../../hooks/use-profile';
import { useAuth } from '../../hooks/use-auth';


const membershipOptions = ['Bronze', 'Silver', 'Gold'];




export const AccountDetails = (props) => {

  useEffect(() => {
    () => {
      useAuth()
    }
  }, []);

  const {user} = useAuth();

  const {company, cpu , membership, volume, gpu, phone} = user;
  const {email, first_name, last_name} = user['user']

  const chooseMambership = (membership) => {
    if (membership === 'B') {
      return 'Bronze'

    } else if (membership === 'S') {
      return 'Silver'
    } else {
      return 'Gold'
    }
  }



  const formik = useFormik({
    initialValues: {
      companyName: company,
      membership: chooseMambership(membership),
      email: email,
      phone: phone,
      fullName: first_name + ' ' + last_name,
      cpuCount: cpu,
      gpuCount: gpu,
      numberOfDisks: volume,
      submit: null
    },
    validationSchema: Yup.object().shape({
      companyName: Yup.string().max(255).required('Company name is required'),
      membership: Yup
        .string()
        .max(255)
        .oneOf(membershipOptions)
        .required('Company size is required'),
      email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
      phone: Yup.string().max(255).required('phone is required'),
      fullName: Yup.string().max(255).required('Full Name is required'),
      gpuCount: Yup.string().max(255).required('Job name is required'),
      numberOfDisks: Yup.string().max(255).required('Number of disks is required'),
      cpuCount: Yup.string().max(255).required('Number of cpus are required')
    }),
    onSubmit: async (values, helpers) => {
      try {
        toast.success('Settings saved');
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


  // console.log(userDetails)
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
              Profile Resources
            </Typography>
          </Grid>
          <Grid
            item
            md={7}
            xs={12}
          >
            <form onSubmit={formik.handleSubmit}>
              <div>
                <Box
                  sx={{
                    alignItems: 'center',
                    display: 'flex',
                    pb: 3
                  }}
                >
                  <Avatar
                    src="/static/allan.chepkoy.jpg"
                    sx={{
                      height: 64,
                      mr: 2,
                      width: 64
                    }}
                  />
                  <div>
                    <Grid
                      container
                      spacing={1}
                      sx={{ pb: 1 }}
                    >
                      <Grid item>
                        <Button
                          color="primary"
                          size="small"
                          type="button"
                          variant="outlined"
                        >
                          Upload new picture
                        </Button>
                      </Grid>
                      <Grid item>
                        <Button
                          color="primary"
                          size="small"
                          type="button"
                          variant="text"
                        >
                          Delete
                        </Button>
                      </Grid>
                    </Grid>
                    <Typography
                      color="textSecondary"
                      variant="caption"
                    >
                      Recommended dimensions: 200x200, maximum file size: 5MB
                    </Typography>
                  </div>
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
                      error={Boolean(formik.touched.fullName && formik.errors.fullName)}
                      fullWidth
                      helperText={formik.touched.fullName && formik.errors.fullName}
                      label="Full Name"
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
                    <InputField
                      error={Boolean(formik.touched.phone && formik.errors.phone)}
                      fullWidth
                      helperText={formik.touched.phone && formik.errors.phone}
                      label="Phone Number"
                      name="phone"
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                      type="phone"
                      value={formik.values.phone}
                    />
                  </Grid>
                  <Grid
                    item
                    xs={12}
                  >
                    <InputField
                      error={Boolean(formik.touched.cpuCount && formik.errors.cpuCount)}
                      fullWidth
                      helperText={formik.touched.cpuCount && formik.errors.cpuCount}
                      label="Cpu count"
                      name="cpuCount"
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                      value={formik.values.cpuCount}
                    />
                  </Grid>
                  <Grid
                    item
                    xs={12}
                  >
                    <InputField
                      error={Boolean(formik.touched.gpuCount && formik.errors.gpuCount)}
                      fullWidth
                      helperText={formik.touched.gpuCount && formik.errors.gpuCount}
                      label="Gpu count"
                      name="gpuCount"
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                      value={formik.values.gpuCount}
                    />
                  </Grid>

                  <Grid
                    item
                    xs={12}
                  >
                    <InputField
                      error={Boolean(formik.touched.numberOfDisks && formik.errors.numberOfDisks)}
                      fullWidth
                      helperText={formik.touched.numberOfDisks && formik.errors.numberOfDisks}
                      label="Number of disks"
                      name="numberOfDisks"
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                      value={formik.values.numberOfDisks}
                    />
                  </Grid>

                  <Grid
                    item
                    xs={12}
                  >
                    <InputField
                      error={Boolean(formik.touched.companyName
                        && formik.errors.companyName)}
                      fullWidth
                      helperText={formik.touched.companyName && formik.errors.companyName}
                      label="Company name"
                      name="companyName"
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                      value={formik.values.companyName}
                    />
                  </Grid>
                  <Grid
                    item
                    xs={12}
                  >
                    <InputField
                      error={Boolean(formik.touched.membership
                        && formik.errors.membership)}
                      fullWidth
                      helperText={formik.touched.membership && formik.errors.membership}
                      label="Membership"
                      name="membership"
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                      select
                      value={formik.values.membership}
                    >
                      {membershipOptions.map((membershipOption) => (
                        <MenuItem
                          key={membershipOption}
                          value={membershipOption}
                        >
                          {membershipOption}
                        </MenuItem>
                      ))}
                    </InputField>
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
                      Save profile
                    </Button>
                  </Grid>
                </Grid>
              </div>
            </form>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

AccountDetails.defaultProps = {
  profile: []
}
