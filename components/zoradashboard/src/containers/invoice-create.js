import { Fragment } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import numeral from 'numeral';
import toast from 'react-hot-toast';
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Checkbox,
  Container,
  Divider,
  FormControlLabel,
  Grid,
  IconButton,
  InputAdornment,
  Typography
} from '@material-ui/core';
import { DateField } from '../components/date-field';
import { InputField } from '../components/input-field';
import { ArrowLeft as ArrowLeftIcon } from '../icons/arrow-left';
import { Plus as PlusIcon } from '../icons/plus';
import { Trash as TrashIcon } from '../icons/trash';

export const InvoiceCreate = () => {
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      customerEmail: '',
      customerName: '',
      dueDate: null,
      id: '#DEV5438',
      issueDate: null,
      isTaxable: false,
      items: [
        {
          description: '',
          price: '',
          quantity: 1
        }
      ],
      note: '',
      subject: '',
      submit: null
    },
    validationSchema: Yup.object().shape({
      customerEmail: Yup.string().email().max(255).required('Customer email is required'),
      customerName: Yup.string().max(255).required('Customer name is required'),
      dueDate: Yup.date().required('Due date is required'),
      issueDate: Yup.date().required('Issued date is required'),
      isTaxable: Yup.boolean().required('Taxable is required'),
      items: Yup.array().of(Yup.object().shape({
        description: Yup.string().max(255).required('Service description is required'),
        quantity: Yup.number().min(1).required('Quantity is required'),
        price: Yup.number().required('Price is required')
      })),
      note: Yup.string().max(1024),
      subject: Yup.string().max(255).required('Subject is required')
    }),
    onSubmit: async (values, helpers) => {
      try {
        toast.success('Invoice created');
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

  const handleAddItem = () => {
    formik.setFieldValue('items', [
      ...formik.values.items, {
        description: '',
        price: '',
        quantity: 1
      }
    ]);
  };

  const handleDeleteItem = (itemIndex) => {
    if (formik.values.items.length > 1) {
      formik.setFieldValue('items',
        formik.values.items.filter((item, index) => index !== itemIndex));
    }
  };

  const totalInvoicePrice = formik.values.items.reduce((acc, item) => acc
    + (Number.parseFloat(item.price) * item.quantity), 0);

  const getItemError = (index, property) => formik?.touched?.items
    && formik?.errors?.items
    && formik?.touched?.items[index]?.[property]
    && formik?.errors?.items[index]?.[property];

  return (
    <>
      <Helmet>
        <title>Invoice: Create | Carpatin Dashboard</title>
      </Helmet>
      <Box
        sx={{
          backgroundColor: 'background.default',
          flexGrow: 1
        }}
      >
        <Container maxWidth="lg">
          <Box sx={{ py: 4 }}>
            <Box sx={{ mb: 2 }}>
              <Button
                color="primary"
                component={RouterLink}
                startIcon={<ArrowLeftIcon />}
                to="/dashboard/invoices"
                variant="text"
              >
                Invoices
              </Button>
            </Box>
            <Typography
              color="textPrimary"
              variant="h4"
            >
              Create Invoice
            </Typography>
          </Box>
          <Card variant="outlined">
            <form onSubmit={formik.handleSubmit}>
              <CardContent>
                <Grid
                  container
                  spacing={2}
                >
                  <Grid
                    item
                    md={6}
                    xs={12}
                  >
                    <InputField
                      error={Boolean(formik.touched.subject && formik.errors.subject)}
                      fullWidth
                      helperText={formik.touched.subject && formik.errors.subject}
                      label="Subject"
                      name="subject"
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                      value={formik.values.subject}
                    />
                  </Grid>
                  <Grid
                    item
                    md={6}
                    xs={12}
                  >
                    <InputField
                      disabled
                      error={Boolean(formik.touched.id && formik.errors.id)}
                      fullWidth
                      helperText={formik.touched.id && formik.errors.id}
                      label="Invoice #"
                      name="id"
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                      value={formik.values.id}
                    />
                  </Grid>
                  <Grid
                    item
                    md={6}
                    xs={12}
                  >
                    <InputField
                      error={Boolean(formik.touched.customerName
                        && formik.errors.customerName)}
                      fullWidth
                      helperText={formik.touched.customerName
                      && formik.errors.customerName}
                      label="Customer Name"
                      name="customerName"
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                      placeholder="Dinesh Chugtai"
                      value={formik.values.customerName}
                    />
                  </Grid>
                  <Grid
                    item
                    md={6}
                    xs={12}
                  >
                    <InputField
                      error={Boolean(formik.touched.customerEmail
                        && formik.errors.customerEmail)}
                      fullWidth
                      helperText={formik.touched.customerEmail
                      && formik.errors.customerEmail}
                      label="Customer Email"
                      name="customerEmail"
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                      type="email"
                      placeholder="dinesh@pipedpiper.com"
                      value={formik.values.customerEmail}
                    />
                  </Grid>
                  <Grid
                    item
                    md={6}
                    xs={12}
                  >
                    <DateField
                      error={Boolean(formik.touched.issueDate && formik.errors.issueDate)}
                      fullWidth
                      helperText={formik.touched.issueDate && formik.errors.issueDate}
                      label="Issued Date"
                      name="issueDate"
                      onChange={(date) => formik.setFieldValue('issueDate', date)}
                      value={formik.values.issueDate}
                    />
                  </Grid>
                  <Grid
                    item
                    md={6}
                    xs={12}
                  >
                    <DateField
                      error={Boolean(formik.touched.dueDate && formik.errors.dueDate)}
                      fullWidth
                      helperText={formik.touched.dueDate && formik.errors.dueDate}
                      label="Due Date"
                      name="dueDate"
                      onChange={(date) => formik.setFieldValue('dueDate', date)}
                      value={formik.values.dueDate}
                    />
                  </Grid>
                  <Grid
                    item
                    xs={12}
                  >
                    <Divider />
                  </Grid>
                  {formik.values.items.map((item, index) => {
                    const totalPrice = Number.parseFloat(item.price) * item.quantity;

                    return (
                      // eslint-disable-next-line react/no-array-index-key
                      <Fragment key={index}>
                        <Grid
                          item
                          md={6}
                          xs={12}
                        >
                          <InputField
                            error={Boolean(getItemError(index, 'description'))}
                            fullWidth
                            helperText={getItemError(index, 'description')}
                            label="Item"
                            name={`items[${index}].description`}
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            placeholder="Service description"
                            value={item.description}
                          />
                        </Grid>
                        <Grid
                          item
                          md={6}
                          xs={12}
                          sx={{ display: 'flex' }}
                        >
                          <Grid
                            container
                            spacing={2}
                          >
                            <Grid
                              item
                              xs={4}
                            >
                              <InputField
                                error={Boolean(getItemError(index, 'quantity'))}
                                fullWidth
                                helperText={getItemError(index, 'quantity')}
                                label="Qty"
                                name={`items[${index}].quantity`}
                                onBlur={formik.handleBlur}
                                onChange={formik.handleChange}
                                value={item.quantity}
                              />
                            </Grid>
                            <Grid
                              item
                              xs={4}
                            >
                              <InputField
                                error={Boolean(getItemError(index, 'price'))}
                                fullWidth
                                helperText={getItemError(index, 'price')}
                                label="Price"
                                name={`items[${index}].price`}
                                onBlur={formik.handleBlur}
                                onChange={formik.handleChange}
                                value={item.price}
                                InputProps={{
                                  startAdornment: (
                                    <InputAdornment position="start">$</InputAdornment>
                                  )
                                }}
                              />
                            </Grid>
                            <Grid
                              item
                              xs={4}
                            >
                              <InputField
                                disabled
                                fullWidth
                                label="Total"
                                onBlur={formik.handleBlur}
                                onChange={formik.handleChange}
                                value={Number.isNaN(totalPrice) ? '' : totalPrice}
                                InputProps={{
                                  startAdornment: (
                                    <InputAdornment position="start">$</InputAdornment>
                                  )
                                }}
                              />
                            </Grid>
                          </Grid>
                          <Box
                            sx={{
                              ml: 2,
                              mt: 3
                            }}
                          >
                            <IconButton
                              color="primary"
                              onClick={() => handleDeleteItem(index)}
                              type="button"
                            >
                              <TrashIcon />
                            </IconButton>
                          </Box>
                        </Grid>
                      </Fragment>
                    );
                  })}
                  <Grid
                    item
                    xs={12}
                    sx={{
                      alignItems: 'center',
                      display: 'flex'
                    }}
                  >
                    <Button
                      color="primary"
                      onClick={handleAddItem}
                      startIcon={<PlusIcon fontSize="small" />}
                      variant="text"
                    >
                      Add Item
                    </Button>
                    <Box sx={{ flexGrow: 1 }} />
                    <Typography
                      color="textSecondary"
                      sx={{ mr: 1 }}
                      variant="subtitle2"
                    >
                      Total
                    </Typography>
                    <Typography
                      color="textPrimary"
                      variant="h6"
                    >
                      {numeral(totalInvoicePrice).format('$0,0.00')}
                    </Typography>
                  </Grid>
                  <Grid
                    item
                    xs={12}
                  >
                    <FormControlLabel
                      control={(
                        <Checkbox
                          checked={formik.values.isTaxable}
                          onChange={(event) => formik.setFieldValue('isTaxable',
                            event.target.checked)}
                        />
                      )}
                      label="Taxable (VAT 19%)"
                    />
                  </Grid>
                  <Grid
                    item
                    xs={12}
                  >
                    <Divider />
                  </Grid>
                  <Grid
                    item
                    xs={12}
                  >
                    <InputField
                      error={Boolean(formik.touched.note && formik.errors.note)}
                      fullWidth
                      helperText={formik.touched.note && formik.errors.note}
                      label="Additional Notes"
                      multiline
                      name="note"
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                      placeholder="Client notes"
                      rows={4}
                      value={formik.values.note}
                    />
                  </Grid>
                </Grid>
              </CardContent>
              <CardActions sx={{ justifyContent: 'flex-end' }}>
                <Button
                  color="primary"
                  type="submit"
                  variant="contained"
                >
                  Create Invoice
                </Button>
              </CardActions>
            </form>
          </Card>
        </Container>
      </Box>
    </>
  );
};
