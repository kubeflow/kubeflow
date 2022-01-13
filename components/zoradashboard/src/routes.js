import { Suspense, lazy } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthGuard } from './components/auth-guard';
import { GuestGuard } from './components/guest-guard';
import { Customer } from './containers/customer';
import { LoadingScreen } from './components/loading-screen';
import { Account } from './containers/account';
import { DashboardLayout } from './containers/dashboard-layout';
import { Home } from './containers/home';
import { MainLayout } from './containers/main-layout';
import { Organization } from './containers/organization';
import { Product } from './containers/product';
import { Reports } from './containers/reports';

const Loadable = (Component) => (props) => (
  <Suspense fallback={<LoadingScreen />}>
    <Component {...props} />
  </Suspense>
);

// Not found pages
const NotFound = Loadable(lazy(() => import('./containers/not-found').then((module) => ({ default: module.NotFound }))));

// Auth pages
const Login = Loadable(lazy(() => import('./containers/login').then((module) => ({ default: module.Login }))));
const PasswordRecovery = Loadable(lazy(() => import('./containers/password-recovery').then((module) => ({ default: module.PasswordRecovery }))));
const PasswordReset = Loadable(lazy(() => import('./containers/password-reset').then((module) => ({ default: module.PasswordReset }))));
const Register = Loadable(lazy(() => import('./containers/register').then((module) => ({ default: module.Register }))));
const VerifyCode = Loadable(lazy(() => import('./containers/verify-code').then((module) => ({ default: module.VerifyCode }))));

// Dashboard pages
const ReportsOverview = Loadable(lazy(() => import('./containers/reports-overview').then((module) => ({ default: module.ReportsOverview }))));
const ReportsSales = Loadable(lazy(() => import('./containers/reports-sales').then((module) => ({ default: module.ReportsSales }))));

const Customers = Loadable(lazy(() => import('./containers/customers').then((module) => ({ default: module.Customers }))));
const CustomerActivity = Loadable(lazy(() => import('./containers/customer-activity').then((module) => ({ default: module.CustomerActivity }))));
const CustomerOrders = Loadable(lazy(() => import('./containers/customer-orders').then((module) => ({ default: module.CustomerOrders }))));
const CustomerSummary = Loadable(lazy(() => import('./containers/customer-summary').then((module) => ({ default: module.CustomerSummary }))));

const Order = Loadable(lazy(() => import('./containers/order').then((module) => ({ default: module.Order }))));
const Orders = Loadable(lazy(() => import('./containers/orders').then((module) => ({ default: module.Orders }))));

const Invoices = Loadable(lazy(() => import('./containers/invoices').then((module) => ({ default: module.Invoices }))));
const InvoiceCreate = Loadable(lazy(() => import('./containers/invoice-create').then((module) => ({ default: module.InvoiceCreate }))));
const InvoiceSummary = Loadable(lazy(() => import('./containers/invoice').then((module) => ({ default: module.Invoice }))));
const InvoicePreview = Loadable(lazy(() => import('./containers/invoice-preview').then((module) => ({ default: module.InvoicePreview }))));

const Products = Loadable(lazy(() => import('./containers/products').then((module) => ({ default: module.Products }))));
const ProductAnalytics = Loadable(lazy(() => import('./containers/product-analytics').then((module) => ({ default: module.ProductAnalytics }))));
const ProductInventory = Loadable(lazy(() => import('./containers/product-inventory').then((module) => ({ default: module.ProductInventory }))));
const ProductSummary = Loadable(lazy(() => import('./containers/product-summary').then((module) => ({ default: module.ProductSummary }))));

const AccountGeneral = Loadable(lazy(() => import('./containers/account-general').then((module) => ({ default: module.AccountGeneral }))));
const AccountNotifications = Loadable(lazy(() => import('./containers/account-notifications').then((module) => ({ default: module.AccountNotifications }))));

const OrganizationBilling = Loadable(lazy(() => import('./containers/organization-billing').then((module) => ({ default: module.OrganizationBilling }))));
const OrganizationGeneral = Loadable(lazy(() => import('./containers/organization-general').then((module) => ({ default: module.OrganizationGeneral }))));
const OrganizationTeam = Loadable(lazy(() => import('./containers/organization-team').then((module) => ({ default: module.OrganizationTeam }))));

const ComponentsCardHeadings = Loadable(lazy(() => import('./containers/components-card-headers').then(
  (module) => ({ default: module.ComponentsCardHeaders })
)));
const ComponentsDataStates = Loadable(lazy(() => import('./containers/components-data-states').then(
  (module) => ({ default: module.ComponentsDataStates })
)));
const ComponentsDataStats = Loadable(lazy(() => import('./containers/components-data-stats').then((module) => ({ default: module.ComponentsDataStats }))));
const ComponentsImageUploader = Loadable(lazy(() => import('./containers/components-image-uploader').then(
  (module) => ({ default: module.ComponentsImageUploader })
)));
const ComponentsLists = Loadable(lazy(() => import('./containers/components-lists').then((module) => ({ default: module.ComponentsLists }))));
const ComponentsOnboarding = Loadable(lazy(() => import('./containers/components-onboarding').then((module) => ({ default: module.ComponentsOnboarding }))));
const ComponentsPageHeadings = Loadable(lazy(() => import('./containers/components-page-headers').then(
  (module) => ({ default: module.ComponentsPageHeaders })
)));

const FoundationBlankPage = Loadable(lazy(() => import('./containers/foundation-blank-page').then((module) => ({ default: module.FoundationBlankPage }))));
const FoundationButtons = Loadable(lazy(() => import('./containers/foundation-buttons').then((module) => ({ default: module.FoundationButtons }))));
const FoundationColors = Loadable(lazy(() => import('./containers/foundation-colors').then((module) => ({ default: module.FoundationColors }))));
const FoundationInputs = Loadable(lazy(() => import('./containers/foundation-inputs').then((module) => ({ default: module.FoundationInputs }))));
const FoundationShadows = Loadable(lazy(() => import('./containers/foundation-shadows').then((module) => ({ default: module.FoundationShadows }))));
const FoundationTables = Loadable(lazy(() => import('./containers/foundation-tables').then((module) => ({ default: module.FoundationTables }))));
const FoundationTypography = Loadable(lazy(() => import('./containers/foundation-typography').then((module) => ({ default: module.FoundationTypography }))));

// Docs pages
const Docs = Loadable(lazy(() => import('./containers/docs').then((module) => ({ default: module.Docs }))));

const routes = [
  {
    path: '/',
    element: (
      <MainLayout>
        <Home />
      </MainLayout>
    )
  },
  {
    path: 'login',
    element: (
      <GuestGuard>
        <Login />
      </GuestGuard>
    )
  },
  {
    path: 'register',
    element: (
      <GuestGuard>
        <Register />
      </GuestGuard>
    )
  },
  {
    path: 'verify-code',
    element: (
      <GuestGuard>
        <VerifyCode />
      </GuestGuard>
    )
  },
  {
    path: 'password-recovery',
    element: (
      <GuestGuard>
        <PasswordRecovery />
      </GuestGuard>
    )
  },
  {
    path: 'password-reset',
    element: (
      <PasswordReset />
    )
  },
  {
    path: 'dashboard',
    element: (
      <AuthGuard>
        <DashboardLayout />
      </AuthGuard>
    ),
    children: [
      {
        path: '/',
        element: (
          <Navigate
            to="/dashboard/reports"
            replace
          />
        )
      },
      {
        path: 'reports',
        element: <Reports />,
        children: [
          {
            path: '/',
            element: <ReportsOverview />
          },
          {
            path: 'sales',
            element: <ReportsSales />
          }
        ]
      },
      {
        path: 'account',
        element: <Account />,
        children: [
          {
            path: '/',
            element: <AccountGeneral />
          },
          {
            path: 'notifications',
            element: <AccountNotifications />
          },
          {
            path: 'team',
            element: <OrganizationTeam />
          }
        ]
      },
      {
        path: 'customers',
        children: [
          {
            path: '/',
            element: <Customers />
          },
          {
            path: ':customerId',
            element: <Customer />,
            children: [
              {
                path: '/',
                element: <CustomerSummary />
              },
              {
                path: 'activity',
                element: <CustomerActivity />
              },
              {
                path: 'orders',
                element: <CustomerOrders />
              }
            ]
          }
        ]
      },
      {
        path: 'orders',
        children: [
          {
            path: '/',
            element: <Orders />
          },
          {
            path: ':orderId',
            element: <Order />
          }
        ]
      },
      {
        path: 'organization',
        element: <Organization />,
        children: [
          {
            path: '/',
            element: <OrganizationGeneral />
          },
          {
            path: '/team',
            element: <OrganizationTeam />
          },
          {
            path: '/billing',
            element: <OrganizationBilling />
          }
        ]
      },
      {
        path: 'products',
        children: [
          {
            path: '/',
            element: <Products />
          },
          {
            path: ':productId',
            element: <Product />,
            children: [
              {
                path: '/',
                element: <ProductSummary />
              },
              {
                path: 'analytics',
                element: <ProductAnalytics />
              },
              {
                path: 'inventory',
                element: <ProductInventory />
              }
            ]
          }
        ]
      },
      {
        path: 'invoices',
        children: [
          {
            path: '/',
            element: <Invoices />
          },
          {
            path: 'create',
            element: <InvoiceCreate />
          },
          {
            path: ':invoiceId',
            children: [
              {
                path: '/',
                element: <InvoiceSummary />
              },
              {
                path: '/preview',
                element: <InvoicePreview />
              }
            ]
          }
        ]
      },
      {
        path: 'components',
        children: [
          {
            path: 'onboarding',
            element: <ComponentsOnboarding />
          },
          {
            path: 'empty-states',
            element: <ComponentsDataStates />
          },
          {
            path: 'page-headings',
            element: <ComponentsPageHeadings />
          },
          {
            path: 'card-headings',
            element: <ComponentsCardHeadings />
          },
          {
            path: 'image-uploader',
            element: <ComponentsImageUploader />
          },
          {
            path: 'stats',
            element: <ComponentsDataStats />
          },
          {
            path: 'property-lists',
            element: <ComponentsLists />
          }
        ]
      },
      {
        path: 'foundation',
        children: [
          {
            path: 'colors',
            element: <FoundationColors />
          },
          {
            path: 'typography',
            element: <FoundationTypography />
          },
          {
            path: 'shadows',
            element: <FoundationShadows />
          },
          {
            path: 'buttons',
            element: <FoundationButtons />
          },
          {
            path: 'inputs',
            element: <FoundationInputs />
          },
          {
            path: 'tables',
            element: <FoundationTables />
          },
          {
            path: 'blank-page',
            element: <FoundationBlankPage />
          }
        ]
      }
    ]
  },
  {
    path: 'docs',
    children: [
      {
        path: '/',
        element: (
          <Navigate
            to="/docs/overview/welcome"
            replace
          />
        )
      },
      {
        path: '*',
        element: <Docs />
      }
    ]
  },
  {
    path: '*',
    element: <NotFound />
  }
];

export default routes;
