import { subDays, subMinutes } from 'date-fns';
import { throttle } from '../config';
import { applyFilters } from '../utils/apply-filters';
import { applyPagination } from '../utils/apply-pagination';
import { applySort } from '../utils/apply-sort';
import { wait } from '../utils/wait';

const now = new Date();

const invoices = [
  {
    currencySymbol: '$',
    dueDate: subDays(now, 2),
    id: 'DEV5437',
    issueDate: subDays(now, 9),
    paymentMethod: 'Credit Card',
    status: 'ongoing',
    totalAmount: 192.5
  },
  {
    currencySymbol: '$',
    dueDate: subDays(now, 1),
    id: 'DEV5436',
    issueDate: subDays(now, 12),
    paymentMethod: 'Credit Card',
    status: 'ongoing',
    totalAmount: 192
  },
  {
    currencySymbol: '$',
    dueDate: subDays(now, 14),
    id: 'DEV54375',
    issueDate: subDays(now, 4),
    paymentMethod: 'PayPal',
    status: 'ongoing',
    totalAmount: 60
  },
  {
    currencySymbol: '$',
    dueDate: subDays(now, 22),
    id: 'DEV5434',
    issueDate: subDays(now, 12),
    paymentMethod: 'Credit Card',
    status: 'draft',
    totalAmount: 631
  },
  {
    currencySymbol: '$',
    dueDate: subDays(now, 32),
    id: 'DEV5433',
    issueDate: subDays(now, 19),
    paymentMethod: 'PayPal',
    status: 'paid',
    totalAmount: 1200
  },
  {
    currencySymbol: '$',
    dueDate: subDays(now, 12),
    id: 'DEV5432',
    issueDate: subDays(now, 5),
    paymentMethod: 'PayPal',
    status: 'overdue',
    totalAmount: 631
  }
];

const invoice = {
  createdAt: subDays(now, 10),
  currencySymbol: '$',
  customerName: 'Natalie Rusell',
  dueDate: subDays(subMinutes(now, 29), 2),
  id: 'DEV5437',
  issueDate: subDays(subMinutes(now, 45), 9),
  note: '“Please confirm once paid.”',
  paymentAt: subDays(subMinutes(now, 11), 5),
  paymentMethod: 'Credit Card',
  paymentStatus: 'Failed',
  status: 'ongoing',
  subtotalAmount: 160,
  taxAmount: 32.5,
  totalAmount: 192.5,
  transactionFees: 0,
  transactionId: 'tran_54febasdaoiuhqja1837hj',
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
      unitAmount: 160,
      isTaxable: true
    }
  ]
};

class InvoiceApi {
  async getInvoices(options) {
    if (throttle) {
      await wait(throttle);
    }

    const { filters, sort, sortBy, page, query, view } = options;

    /*
     NOTE: Query, filter, sort and pagination are operation meant to be executed on the server.
     Since this does not connect to a real backend, we simulate these operations.
     */

    const queriedInvoices = invoices.filter((_invoice) => {
      // If query exists, it looks only in customer id field
      if (!!query && !_invoice.id?.toLowerCase().includes(query.toLowerCase())) {
        return false;
      }

      // No need to look for any resource fields
      if (typeof view === 'undefined' || view === 'all') {
        return true;
      }

      // In this case, the view represents the resource status
      return _invoice.status === view;
    });
    const filteredInvoices = applyFilters(queriedInvoices, filters);
    const sortedInvoices = applySort(filteredInvoices, sort, sortBy);
    const paginatedInvoices = applyPagination(sortedInvoices, page);

    return Promise.resolve({
      invoices: paginatedInvoices,
      invoicesCount: filteredInvoices.length
    });
  }

  async getInvoice() {
    if (throttle) {
      await wait(throttle);
    }

    return Promise.resolve(invoice);
  }
}

export const invoiceApi = new InvoiceApi();
