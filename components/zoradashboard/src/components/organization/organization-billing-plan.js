import { Fragment, useState } from 'react';
import toast from 'react-hot-toast';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import numeral from 'numeral';
import {
  Box,
  Button,
  Card,
  CardActions,
  CardHeader,
  Divider,
  FormControlLabel,
  FormHelperText,
  Radio,
  RadioGroup,
  ToggleButton,
  ToggleButtonGroup,
  Typography
} from '@material-ui/core';

const planOptions = [
  {
    id: '1',
    description: 'Up to 2 team members',
    label: 'Free',
    priceOptions: [
      {
        chargeType: 'monthly',
        amount: 0
      },
      {
        chargeType: 'yearly',
        amount: 0
      }
    ],
    value: 'free'
  },
  {
    id: '2',
    description: 'Best for simple projects or applications.',
    label: 'Essential',
    priceOptions: [
      {
        chargeType: 'monthly',
        amount: 120
      },
      {
        chargeType: 'yearly',
        amount: 1320
      }
    ],
    value: 'essential'
  },
  {
    id: '3',
    description: 'Best for teams and multiple projects that need added security.',
    label: 'Professional',
    priceOptions: [
      {
        chargeType: 'monthly',
        amount: 480
      },
      {
        chargeType: 'yearly',
        amount: 5280
      }
    ],
    value: 'professional'
  }
];

export const OrganizationBillingPlan = () => {
  const formik = useFormik({
    initialValues: {
      plan: 'free',
      submit: null
    },
    validationSchema: Yup.object().shape({
      plan: Yup.mixed().oneOf(planOptions.map((option) => option.value))
    }),
    onSubmit: async (values, helpers) => {
      try {
        toast.success('Plan updated');
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
  const [chargeType, setChargeType] = useState('monthly');

  const handleChargeTypeChange = (event, newMode) => {
    if (newMode) {
      setChargeType(newMode);
    }
  };

  return (
    <Card variant="outlined">
      <CardHeader title="Subscription Plan" />
      <Divider />
      <Box
        sx={{
          alignItems: 'center',
          display: 'flex',
          px: 3,
          py: 2
        }}
      >
        <Typography
          color="textPrimary"
          sx={{ mr: 3 }}
          variant="subtitle2"
        >
          Billing
        </Typography>
        <ToggleButtonGroup
          exclusive
          onChange={handleChargeTypeChange}
          size="small"
          value={chargeType}
        >
          <ToggleButton value="monthly">
            Monthly
          </ToggleButton>
          <ToggleButton value="yearly">
            Yearly
          </ToggleButton>
        </ToggleButtonGroup>
      </Box>
      <Divider />
      <RadioGroup
        name="plan"
        onBlur={formik.handleBlur}
        onChange={formik.handleChange}
        value={formik.values.plan}
      >
        {planOptions.map((option) => (
          <Fragment key={option.id}>
            <FormControlLabel
              disableTypography
              control={<Radio color="primary" />}
              label={(
                <Box
                  sx={{
                    alignItems: 'center',
                    display: 'flex',
                    width: '100%'
                  }}
                >
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
                  <Box sx={{ flexGrow: 1 }} />
                  <Typography
                    color="textPrimary"
                    variant="h5"
                  >
                    {numeral(option
                      .priceOptions
                      .find((priceOption) => priceOption.chargeType === chargeType)
                      .amount).format('$0,0')}
                  </Typography>
                </Box>
              )}
              sx={{
                m: 0,
                px: 3,
                py: 1.5
              }}
              value={option.value}
            />
            <Divider />
          </Fragment>
        ))}
      </RadioGroup>
      {formik.touched.plan && formik.errors.plan && (
        <FormHelperText error>
          {formik.errors.plan}
        </FormHelperText>
      )}
      {formik.errors.submit && (
        <FormHelperText
          error
          sx={{ mt: 2 }}
        >
          {formik.errors.submit}
        </FormHelperText>
      )}
      <CardActions>
        <Button
          color="primary"
          disabled={formik.isSubmitting}
          onClick={() => formik.handleSubmit()}
          variant="contained"
        >
          Upgrade Plan
        </Button>
      </CardActions>
    </Card>
  );
};
