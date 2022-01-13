import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Box, Grid } from '@material-ui/core';
import { Bills } from '../components/reports/bills';
import { LatestOrders } from '../components/reports/latest-orders';
import { Notifications } from '../components/reports/notifications';
import { OrdersOverview } from '../components/reports/orders-overview';
import { SummaryItem } from '../components/reports/summary-item';
import { Cube as CubeIcon } from '../icons/cube';
import { ShoppingCart as ShoppingCartIcon } from '../icons/shopping-cart';
import { CustomCreditCard as CustomCreditCardIcon } from '../icons/custom-credit-card';
import gtm from '../lib/gtm';

const latestOrders = [
  {
    id: '5273',
    courier: 'DHL',
    createdAt: new Date('2021-06-02T14:32:45.475Z'),
    currency: 'USD',
    currencySymbol: '$',
    customer: {
      city: 'New York',
      country: 'USA',
      firstName: 'Devon',
      lastName: 'Lane'
    },
    discountAmount: 0,
    lineItems: [
      {
        currency: 'USD',
        currencySymbol: '$',
        discountAmount: 0,
        image: '/static/product-01.png',
        name: 'Watch with Leather Strap',
        quantity: 1,
        sku: 'BBAK01-A',
        subtotalAmount: 160,
        taxAmount: 32.5,
        totalAmount: 192.5,
        unitAmount: 160
      }
    ],
    paymentId: 'ORIL8823',
    paymentMethod: 'debit',
    paymentStatus: 'paid',
    status: 'delivered',
    trackingCode: 'KDO020021',
    totalAmount: 192.5,
    updatedAt: new Date('2021-06-02T14:32:45.475Z')
  },
  {
    id: '9265',
    courier: 'DHL',
    createdAt: new Date('2021-05-12T20:10:45.475Z'),
    currency: 'USD',
    currencySymbol: '$',
    customer: {
      city: 'Berlin',
      country: 'Germany',
      firstName: 'Livia',
      lastName: 'Louthe'
    },
    discountAmount: 0,
    lineItems: [
      {
        currency: 'USD',
        currencySymbol: '$',
        discountAmount: 0,
        image: '/static/product-01.png',
        name: 'Watch with Leather Strap',
        quantity: 1,
        sku: 'BBAK01-A',
        subtotalAmount: 160,
        taxAmount: 32.5,
        totalAmount: 192.5,
        unitAmount: 160
      }
    ],
    paymentId: 'L993DDLS',
    paymentMethod: 'paypal',
    paymentStatus: 'paid',
    status: 'complete',
    trackingCode: null,
    totalAmount: 631,
    updatedAt: new Date('2021-05-12T20:10:45.475Z')
  },
  {
    id: '9266',
    courier: 'UPS',
    createdAt: new Date('2021-02-21T12:12:45.475Z'),
    currency: 'USD',
    currencySymbol: '$',
    customer: {
      city: 'Hamburg',
      country: 'Germany',
      firstName: 'Peri',
      lastName: 'Ottawell'
    },
    discountAmount: 0,
    lineItems: [
      {
        currency: 'USD',
        currencySymbol: '$',
        discountAmount: 0,
        image: '/static/product-01.png',
        name: 'Watch with Leather Strap',
        quantity: 1,
        sku: 'BBAK01-A',
        subtotalAmount: 160,
        taxAmount: 32.5,
        totalAmount: 192.5,
        unitAmount: 160
      }
    ],
    paymentId: 'OPP482L',
    paymentMethod: 'creditCard',
    paymentStatus: 'paid',
    status: 'placed',
    totalAmount: 631,
    updatedAt: new Date('2021-02-21T12:12:45.475Z')
  },
  {
    id: '1090',
    courier: 'UPS',
    createdAt: new Date('2021-09-09T10:10:45.475Z'),
    currency: 'USD',
    currencySymbol: '$',
    customer: {
      city: 'Madrid',
      country: 'Spain',
      firstName: 'Thadeus',
      lastName: 'Jacketts'
    },
    discountAmount: 0,
    lineItems: [
      {
        currency: 'USD',
        currencySymbol: '$',
        discountAmount: 0,
        image: '/static/product-01.png',
        name: 'Watch with Leather Strap',
        quantity: 1,
        sku: 'BBAK01-A',
        subtotalAmount: 160,
        taxAmount: 32.5,
        totalAmount: 192.5,
        unitAmount: 160
      }
    ],
    paymentId: 'DZS194LD',
    paymentMethod: 'stripe',
    paymentStatus: 'paid',
    status: 'processed',
    trackingCode: null,
    totalAmount: 100,
    updatedAt: new Date('2021-09-09T10:10:45.475Z')
  },
  {
    id: '1111',
    courier: 'Purolator',
    createdAt: new Date('2021-05-21T02:02:45.475Z'),
    currency: 'USD',
    currencySymbol: '$',
    customer: {
      city: 'Barcelona',
      country: 'Spain',
      firstName: 'Rad',
      lastName: 'Jose'
    },
    discountAmount: 0,
    lineItems: [
      {
        currency: 'USD',
        currencySymbol: '$',
        discountAmount: 0,
        image: '/static/product-01.png',
        name: 'Watch with Leather Strap',
        quantity: 1,
        sku: 'BBAK01-A',
        subtotalAmount: 160,
        taxAmount: 32.5,
        totalAmount: 192.5,
        unitAmount: 160
      }
    ],
    paymentId: 'OTIK283L',
    paymentMethod: 'debit',
    paymentStatus: 'paid',
    status: 'processed',
    trackingCode: null,
    totalAmount: 60,
    updatedAt: new Date('2021-05-21T02:02:45.475Z')
  }
];

const stats = [
  {
    content: '3450',
    icon: ShoppingCartIcon,
    label: 'Orders',
    linkHref: '/dashboard/orders',
    linkLabel: 'Orders'
  },
  {
    content: '68',
    icon: CubeIcon,
    label: 'Products',
    linkHref: '/dashboard/customers',
    linkLabel: 'Products'
  },
  {
    content: '3120',
    icon: CustomCreditCardIcon,
    label: 'Transactions',
    linkHref: '#',
    linkLabel: 'Transactions'
  }
];

export const ReportsOverview = () => {
  useEffect(() => {
    gtm.push({ event: 'page_view' });
  }, []);

  return (
    <>
      <Helmet>
        <title>Reports: Overview | Carpatin Dashboard</title>
      </Helmet>
      <Box sx={{ backgroundColor: 'background.default' }}>
        <Grid
          container
          spacing={3}
        >
          <Grid
            item
            xs={12}
          >
            <Notifications />
          </Grid>
          {stats.map((item) => (
            <Grid
              item
              key={item.label}
              md={4}
              xs={12}
            >
              <SummaryItem
                content={item.content}
                icon={item.icon}
                label={item.label}
                linkHref={item.linkHref}
                linkLabel={item.linkLabel}
              />
            </Grid>
          ))}
          <Grid
            item
            xs={12}
          >
            <Bills />
          </Grid>
          <Grid
            item
            md={6}
            xs={12}
          >
            <OrdersOverview />
          </Grid>
          <Grid
            item
            md={6}
            xs={12}
          >
            <LatestOrders orders={latestOrders} />
          </Grid>
        </Grid>
      </Box>
    </>
  );
};
