import { subDays, subHours, subMinutes } from 'date-fns';
import { throttle } from '../config';
import { applyFilters } from '../utils/apply-filters';
import { applyPagination } from '../utils/apply-pagination';
import { applySort } from '../utils/apply-sort';
import { wait } from '../utils/wait';

const now = new Date();

const customers = [
  {
    id: 'hhFMa50nwJj69u8zuxhU4rB0',
    address: '61 Russell Way',
    avatar: '/static/user-alice_franklin.jpg',
    createdAt: subDays(subHours(subMinutes(now, 25), 9), 234),
    dateOfBirth: new Date('09/21/1998'),
    email: 'rrathe0@1688.com',
    fullName: 'Rustin Rathe',
    isFavorite: true,
    isReturning: false,
    lastOrderDate: subDays(subHours(subMinutes(now, 32), 9), 166),
    orderedRecently: false,
    phone: '641-789-4656',
    status: 'signedUp'
  },
  {
    id: 'PKO733MDY71CNAfP28zNIXxm',
    address: '007 Boyd Avenue',
    avatar: '/static/user-billy_harper.jpg',
    createdAt: subDays(subHours(subMinutes(now, 18), 9), 299),
    dateOfBirth: new Date('09/21/1998'),
    email: 'bcovely1@bing.com',
    fullName: 'Bell Covely',
    isFavorite: false,
    isReturning: false,
    lastOrderDate: subDays(subHours(subMinutes(now, 41), 16), 30),
    orderedRecently: false,
    phone: '603-472-3015',
    status: 'signedUp'
  },
  {
    id: 'nbaFORHcVIO9WZhB87bPA7UP',
    address: '1008 Morningstar Circle',
    avatar: '/static/user-brad_sipp.jpg',
    createdAt: subDays(subHours(subMinutes(now, 7), 3), 125),
    dateOfBirth: new Date('09/21/1998'),
    email: 'mheinonen2@wired.com',
    fullName: 'Meggie Heinonen',
    isFavorite: false,
    isReturning: false,
    lastOrderDate: subDays(subHours(subMinutes(now, 5), 8), 36),
    orderedRecently: false,
    phone: '706-923-5237',
    status: 'inactive'
  },
  {
    id: 'SVITwZUMQfKcYPcwnzhAUMxh',
    address: '13475 Florence Way',
    avatar: '/static/user-dewey_myers.jpg',
    createdAt: subDays(subHours(subMinutes(now, 19), 18), 175),
    dateOfBirth: new Date('09/21/1998'),
    email: 'glamlin3@uol.com.br',
    fullName: 'Giraud Lamlin',
    isFavorite: true,
    isReturning: false,
    lastOrderDate: subDays(subHours(subMinutes(now, 1), 3), 262),
    orderedRecently: true,
    phone: '386-276-7101',
    status: 'inactive'
  },
  {
    id: 'sLiBdwuZW16zStTOwl6VOXcT',
    address: '39613 Basil Road',
    avatar: '/static/user-horia_tepar.jpg',
    createdAt: subDays(subHours(subMinutes(now, 20), 7), 53),
    dateOfBirth: new Date('09/21/1998'),
    email: 'sodocherty4@army.mil',
    fullName: 'Shelby O\'Docherty',
    isFavorite: true,
    isReturning: true,
    lastOrderDate: subDays(subHours(subMinutes(now, 27), 15), 232),
    orderedRecently: true,
    phone: '440-345-1150',
    status: 'inactive'
  },
  {
    id: 'WiXebuVqltcV0kH1nNtNkbM7',
    address: '63 Lake View Drive',
    avatar: '/static/user-julie_reynaud.jpg',
    createdAt: subDays(subHours(subMinutes(now, 39), 19), 132),
    dateOfBirth: new Date('09/21/1998'),
    email: 'jfelderer5@slashdot.org',
    fullName: 'Jenilee Felderer',
    isFavorite: false,
    isReturning: false,
    lastOrderDate: subDays(subHours(subMinutes(now, 44), 23), 9),
    orderedRecently: false,
    phone: '410-337-5315',
    status: 'signedUp'
  },
  {
    id: 'DMrSJL0MQamehXAjOcDRcRtn',
    address: '67 Jana Park',
    avatar: '/static/user-minnie_fisher.jpg',
    createdAt: subDays(subHours(subMinutes(now, 19), 21), 251),
    dateOfBirth: new Date('09/21/1998'),
    email: 'aatthowe6@tiny.cc',
    fullName: 'Adler Atthowe',
    isFavorite: false,
    isReturning: false,
    lastOrderDate: subDays(subHours(subMinutes(now, 30), 16), 102),
    orderedRecently: false,
    phone: '894-105-9322',
    status: 'active'
  },
  {
    id: 'pxCg3anFlzlhNo1OckCJxLWt',
    address: '923 Claremont Terrace',
    avatar: '/static/user-nasimiyu_danai.jpg',
    createdAt: subDays(subHours(subMinutes(now, 45), 10), 40),
    dateOfBirth: new Date('09/21/1998'),
    email: 'croyden7@oakley.com',
    fullName: 'Candace Royden',
    isFavorite: true,
    isReturning: true,
    lastOrderDate: subDays(subHours(subMinutes(now, 40), 13), 35),
    orderedRecently: true,
    phone: '982-654-2992',
    status: 'active'
  },
  {
    id: 'rXGJEOCkmZsK3YQcJUOtNc0m',
    address: '51926 Lighthouse Bay Parkway',
    avatar: '/static/user-paul_boisson.jpg',
    createdAt: subDays(subHours(subMinutes(now, 11), 2), 30),
    dateOfBirth: new Date('09/21/1998'),
    email: 'spicott8@virginia.edu',
    fullName: 'Sean Picott',
    isFavorite: false,
    isReturning: true,
    lastOrderDate: subDays(subHours(subMinutes(now, 52), 6), 323),
    orderedRecently: true,
    phone: '573-547-1215',
    status: 'active'
  },
  {
    id: 'oYCVkxmJs2f0WwFvPAM8c2oP',
    address: '25 Kingsford Junction',
    avatar: '/static/user-santos_payne.jpg',
    createdAt: subDays(subHours(subMinutes(now, 19), 14), 299),
    dateOfBirth: new Date('09/21/1998'),
    email: 'ebrizland9@cloudflare.com',
    fullName: 'Emelia Brizland',
    isFavorite: false,
    isReturning: false,
    lastOrderDate: subDays(subHours(subMinutes(now, 14), 20), 204),
    orderedRecently: false,
    phone: '694-868-1976',
    status: 'signedUp'
  },
  {
    id: 'oId02O8Gh1D98aoOWCcGEp8T',
    address: '65909 Mayfield Lane',
    avatar: '/static/user-dewey_myers.jpg',
    createdAt: subDays(subHours(subMinutes(now, 27), 17), 23),
    dateOfBirth: new Date('09/21/1998'),
    email: 'pparadesd@ox.ac.uk',
    fullName: 'Priscilla Parades',
    isFavorite: true,
    isReturning: false,
    lastOrderDate: subDays(subHours(subMinutes(now, 52), 18), 315),
    orderedRecently: false,
    phone: '966-128-9837',
    status: 'inactive'
  },
  {
    id: 'Lz1J3xnrBiTDJLrvqJ7miYbU',
    address: '18 Eggendart Pass',
    avatar: '/static/user-horia_tepar.jpg',
    createdAt: subDays(subHours(subMinutes(now, 33), 5), 144),
    dateOfBirth: new Date('09/21/1998'),
    email: 'scattowe@senate.gov',
    fullName: 'Stefa Cattow',
    isFavorite: false,
    isReturning: false,
    lastOrderDate: subDays(subHours(subMinutes(now, 9), 12), 197),
    orderedRecently: true,
    phone: '299-669-8130',
    status: 'active'
  },
  {
    id: 'rmEI7FaOOtRdix9haLcHbJMY',
    address: '6562 Blackbird Crossing',
    avatar: '/static/user-julie_reynaud.jpg',
    createdAt: subDays(subHours(subMinutes(now, 54), 3), 188),
    dateOfBirth: new Date('09/21/1998'),
    email: 'ajevonsf@bluehost.com',
    fullName: 'Andi Jevons',
    isFavorite: false,
    isReturning: true,
    lastOrderDate: subDays(subHours(subMinutes(now, 48), 4), 235),
    orderedRecently: false,
    phone: '536-363-2846',
    status: 'signedUp'
  },
  {
    id: 'UlpXn34FzzQPCLP3eIfTGy6A',
    address: '57043 Del Sol Parkway',
    avatar: '/static/user-minnie_fisher.jpg',
    createdAt: subDays(subHours(subMinutes(now, 6), 23), 114),
    dateOfBirth: new Date('09/21/1998'),
    email: 'wengallg@state.tx.us',
    fullName: 'Wilhelm Engall',
    isFavorite: false,
    isReturning: false,
    lastOrderDate: subDays(subHours(subMinutes(now, 9), 20), 150),
    orderedRecently: false,
    phone: '814-804-8230',
    status: 'active'
  },
  {
    id: '0vKlpT7YwYguM25KVzgsSDVF',
    address: '7957 Shopko Junction',
    avatar: '/static/user-nasimiyu_danai.jpg',
    createdAt: subDays(subHours(subMinutes(now, 24), 11), 213),
    dateOfBirth: new Date('09/21/1998'),
    email: 'ebroadhursth@dmoz.org',
    fullName: 'Elbertine Broadhurst',
    isFavorite: true,
    isReturning: true,
    lastOrderDate: subDays(subHours(subMinutes(now, 21), 22), 16),
    orderedRecently: false,
    phone: '363-577-9420',
    status: 'signedUp'
  },
  {
    address: '4 Scoville Street',
    avatar: '/static/user-paul_boisson.jpg',
    createdAt: subDays(subHours(subMinutes(now, 41), 11), 149),
    dateOfBirth: new Date('09/21/1998'),
    email: 'fjoriozi@hp.com',
    fullName: 'Fabiano Jorioz',
    id: 'REK1G9S8XLJQnOyk2kvd2Gnv',
    isFavorite: false,
    isReturning: false,
    lastOrderDate: subDays(subHours(subMinutes(now, 54), 22), 124),
    orderedRecently: false,
    phone: '322-167-3824',
    status: 'signedUp'
  },
  {
    id: '3TE1ntSP1EO4VdsBJTBOmmW3',
    address: '01 Portage Junction',
    avatar: '/static/user-santos_payne.jpg',
    createdAt: subDays(subHours(subMinutes(now, 29), 16), 69),
    dateOfBirth: new Date('09/21/1998'),
    email: 'eanniesj@marketwatch.com',
    fullName: 'Eda Annies',
    isFavorite: true,
    isReturning: false,
    lastOrderDate: subDays(subHours(subMinutes(now, 11), 22), 226),
    orderedRecently: true,
    phone: '877-169-2776',
    status: 'signedUp'
  }
];

const customer = {
  id: '6541237',
  address: '8502 Preston Rd. Inglewood, Maine 98380',
  avatar: '/static/user-julie_reynaud.jpg',
  city: 'Berlin',
  country: 'Germany',
  createdAt: subDays(subHours(subMinutes(now, 19), 10), 50),
  dateOfBirth: new Date('09/21/1998'),
  email: 'julie.reynaud@nopta.com',
  fullName: 'Julie Reynaud',
  isTaxExempt: false,
  lastContactChannel: 'Organic',
  lastContactDate: subDays(subHours(subMinutes(now, 32), 5), 123),
  lastOrderDate: subDays(subHours(subMinutes(now, 2), 1), 20),
  orderValue: 12200,
  ordersPlaced: 17,
  phone: '(249) 894-7992',
  status: 'Active',
  storeCredit: 0
};

const customerOrders = [
  {
    id: '5273',
    courier: 'DHL',
    createdAt: new Date(),
    currency: 'USD',
    currencySymbol: '$',
    customer: {
      address: '8502 Preston Rd. Inglewood, Maine 98380',
      city: 'New York',
      country: 'USA',
      email: 'devon.lane@nopta.com',
      firstName: 'Devon',
      lastName: 'Lane',
      phone: '6035550123',
      stripeId: 'RRNQ8JLQ'
    },
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
    paymentMethod: 'debit',
    status: 'delivered',
    trackingCode: 'KDO020021',
    subtotalAmount: 160,
    taxAmount: 32.5,
    totalAmount: 192.5,
    updatedAt: new Date()
  }
];

const customerNotes = [
  {
    id: '1',
    content: 'I really enjoyed working with this client! She is a ray of sunshine every time I call her. She has a cat called Sticks which she loves very much',
    createdAt: subMinutes(now, 12),
    senderAvatar: '/static/user-laurie_tardy.png',
    senderId: '2',
    senderName: 'Laurie T.'
  },
  {
    id: '2',
    content: 'Don’t call the client before 5 PM, trust me I know what I’m saying',
    createdAt: subMinutes(now, 78),
    senderAvatar: '/static/user-chen_simmons.png',
    senderId: '1',
    senderName: 'Chen Simmons'
  }
];

const customerActivities = [
  {
    id: '588237453',
    adminAvatar: '/static/user-chen_simmons.png',
    adminId: '58232367',
    adminName: 'Chen Simmons',
    createdAt: subMinutes(now, 12),
    message: 'updated customer',
    type: 'updatedCustomer'
  },
  {
    id: '534948327',
    adminAvatar: '/static/user-chen_simmons.png',
    adminId: '58232367',
    adminName: 'Chen Simmons',
    createdAt: subMinutes(now, 50),
    message: 'updated customer',
    type: 'updatedCustomer'
  },
  {
    id: '503923845',
    adminAvatar: '/static/user-horia_tepar.png',
    adminId: '48237437',
    adminName: 'Horia Tepar',
    createdAt: subDays(subMinutes(now, 17), 15),
    message: 'triggered the action “Generate Invoice” on the customer',
    type: 'generateInvoice'
  },
  {
    id: '501923847',
    adminAvatar: '/static/user-horia_tepar.png',
    adminId: '48237437',
    adminName: 'Horia Tepar',
    createdAt: subDays(subMinutes(now, 54), 16),
    message: 'triggered the action “Generate Invoice” on the customer',
    type: 'generateInvoice'
  }
];

class CustomerApi {
  async getCustomers(options) {
    if (throttle) {
      await wait(throttle);
    }

    const { filters, sort, sortBy, page, query, view } = options;

    /*
     NOTE: Query, filter, sort and pagination are operation meant to be executed on the server.
     Since this does not connect to a real backend, we simulate these operations.
     */

    const queriedCustomers = customers.filter((_customer) => {
      // If query exists, it looks only in customer full name field
      if (!!query && !_customer.fullName?.toLowerCase().includes(query.toLowerCase())) {
        return false;
      }

      // No need to look for any resource fields
      if (typeof view === 'undefined' || view === 'all') {
        return true;
      }

      if (view === 'isReturning' && !_customer.isReturning) {
        return false;
      }

      if (view === 'orderedRecently' && !_customer.orderedRecently) {
        return false;
      }

      return true;
    });
    const filteredCustomers = applyFilters(queriedCustomers, filters);
    const sortedCustomers = applySort(filteredCustomers, sort, sortBy);
    const paginatedCustomers = applyPagination(sortedCustomers, page);

    return Promise.resolve({
      customers: paginatedCustomers,
      customersCount: filteredCustomers.length
    });
  }

  async getCustomer() {
    if (throttle) {
      await wait(throttle);
    }

    return Promise.resolve(customer);
  }

  async getCustomerOrders(options = {}) {
    if (throttle) {
      await wait(throttle);
    }

    const { sort, sortBy } = options;

    /*
     NOTE: Query, filter, sort and pagination are operation meant to be executed on the server.
     Since this does not connect to a real backend, we simulate these operations.
     */

    const sortedOrders = applySort(customerOrders, sort, sortBy);

    return Promise.resolve(sortedOrders);
  }

  async getCustomerActivities() {
    if (throttle) {
      await wait(throttle);
    }

    return Promise.resolve(customerActivities);
  }

  async getCustomerNotes() {
    if (throttle) {
      await wait(throttle);
    }

    return Promise.resolve(customerNotes);
  }
}

export const customerApi = new CustomerApi();
