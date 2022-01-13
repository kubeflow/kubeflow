import { throttle } from '../config';
import { applyFilters } from '../utils/apply-filters';
import { applyPagination } from '../utils/apply-pagination';
import { applySort } from '../utils/apply-sort';
import { wait } from '../utils/wait';

const orders = [
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
  },
  {
    id: '2475',
    courier: 'Purolator',
    createdAt: new Date('2021-05-11T02:02:45.475Z'),
    currency: 'USD',
    currencySymbol: '$',
    customer: {
      city: 'Chicago',
      country: 'USA',
      firstName: 'Eydie',
      lastName: 'Hopkyns'
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
    paymentId: 'RKKD832L',
    paymentMethod: 'paypal',
    paymentStatus: 'paid',
    status: 'complete',
    trackingCode: null,
    totalAmount: 1200,
    updatedAt: new Date('2021-05-11T02:02:45.475Z')
  }
];

const order = {
  id: '5273',
  courier: 'DHL',
  createdAt: new Date('2021-06-02T14:32:45.475Z'),
  currency: 'USD',
  currencySymbol: '$',
  customer: {
    address: '8502 Preston Rd. Inglewood, Maine 98380',
    city: 'New York',
    country: 'USA',
    email: 'devon.lane@nopta.com',
    firstName: 'Devon',
    lastName: 'Lane',
    phone: '6035550123'
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
  paymentId: 'RRNQ8JLQ',
  paymentMethod: 'debit',
  paymentStatus: 'paid',
  status: 'delivered',
  trackingCode: 'KDO020021',
  subtotalAmount: 160,
  taxAmount: 32.5,
  totalAmount: 192.5,
  updatedAt: new Date('2021-06-02T14:32:45.475Z')
};

class OrderApi {
  async getOrders(options) {
    if (throttle) {
      await wait(throttle);
    }

    const { filters, sort, sortBy, page, query, view } = options;

    /*
     NOTE: Query, filter, sort and pagination are operation meant to be executed on the server.
     Since this does not connect to a real backend, we simulate these operations.
     */

    const queriedOrders = orders.filter((_order) => {
      if (!!query && !_order.id.toLowerCase().includes(query.toLowerCase())) {
        return false;
      }

      // No need to look for any resource fields
      if (typeof view === 'undefined' || view === 'all') {
        return true;
      }

      // In this case, the view represents the resource status
      return _order.status === view;
    });
    const filteredOrders = applyFilters(queriedOrders, filters);
    const sortedOrders = applySort(filteredOrders, sort, sortBy);
    const paginatedOrders = applyPagination(sortedOrders, page);

    return Promise.resolve({
      orders: paginatedOrders,
      ordersCount: filteredOrders.length
    });
  }

  async getOrder() {
    if (throttle) {
      await wait(throttle);
    }

    return Promise.resolve(order);
  }
}

export const orderApi = new OrderApi();
