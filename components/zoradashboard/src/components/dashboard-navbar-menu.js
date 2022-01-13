import { useState, useEffect } from 'react';
import { matchPath, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Drawer, List } from '@material-ui/core';
import { DashboardNavbarMenuItem } from './dashboard-navbar-menu-item';
import { Cog as CogIcon } from '../icons/cog';
import { CustomChartPie as ChartPieIcon } from '../icons/custom-chart-pie';
import { CustomCube as CubeIcon } from '../icons/custom-cube';
import { CustomShoppingCart as ShoppingCartIcon } from '../icons/custom-shopping-cart';
import { CustomUsers as UsersIcon } from '../icons/custom-users';
import { OfficeBuilding as OfficeBuildingIcon } from '../icons/office-building';
import { ReceiptTax as ReceiptTaxIcon } from '../icons/receipt-tax';
import { ColorSwatch as ColorSwatchIcon } from '../icons/color-swatch';
import { Template as TemplateIcon } from '../icons/template';
import { DocumentText as DocumentTextIcon } from '../icons/document-text';

const items = [
  {
    icon: ChartPieIcon,
    title: 'Reports',
    items: [
      {
        href: '/dashboard/reports',
        title: 'Overview'
      },
      {
        href: '/dashboard/reports/sales',
        title: 'Sales'
      }
    ]
  },
  {
    icon: UsersIcon,
    title: 'Customers',
    items: [
      {
        href: '/dashboard/customers',
        title: 'List'
      },
      {
        href: '/dashboard/customers/1',
        title: 'Summary'
      },
      {
        href: '/dashboard/customers/1/orders',
        title: 'Orders'
      },
      {
        href: '/dashboard/customers/1/activity',
        title: 'Activity'
      }
    ]
  },
  {
    icon: CubeIcon,
    title: 'Orders',
    items: [
      {
        href: '/dashboard/orders',
        title: 'List'
      },
      {
        href: '/dashboard/orders/1',
        title: 'Summary'
      }
    ]
  },
  {
    icon: ShoppingCartIcon,
    title: 'Products',
    items: [
      {
        href: '/dashboard/products',
        title: 'List'
      },
      {
        href: '/dashboard/products/1',
        title: 'Summary'
      },
      {
        href: '/dashboard/products/1/inventory',
        title: 'Inventory'
      },
      {
        href: '/dashboard/products/1/analytics',
        title: 'Insights'
      }
    ]
  },
  {
    icon: ReceiptTaxIcon,
    title: 'Invoices',
    items: [
      {
        href: '/dashboard/invoices',
        title: 'List'
      },
      {
        href: '/dashboard/invoices/create',
        title: 'Create'
      },
      {
        href: '/dashboard/invoices/1',
        title: 'Details'
      },
      {
        href: '/dashboard/invoices/1/preview',
        title: 'Preview'
      }
    ]
  },
  {
    icon: CogIcon,
    title: 'Account',
    items: [
      {
        href: '/dashboard/account',
        title: 'General Settings'
      },
      {
        href: '/dashboard/account/notifications',
        title: 'Notifications'
      }
    ]
  },
  {
    icon: OfficeBuildingIcon,
    title: 'Organization',
    items: [
      {
        href: '/dashboard/organization',
        title: 'General Settings'
      },
      {
        href: '/dashboard/organization/team',
        title: 'Team'
      },
      {
        href: '/dashboard/organization/billing',
        title: 'Billing'
      }
    ]
  },
  {
    icon: ColorSwatchIcon,
    title: 'Foundation',
    items: [
      {
        href: '/dashboard/foundation/typography',
        title: 'Typography'
      },
      {
        href: '/dashboard/foundation/colors',
        title: 'Colors'
      },
      {
        href: '/dashboard/foundation/shadows',
        title: 'Shadows'
      },
      {
        href: '/dashboard/foundation/buttons',
        title: 'Buttons'
      },
      {
        href: '/dashboard/foundation/inputs',
        title: 'Inputs'
      },
      {
        href: '/dashboard/foundation/tables',
        title: 'Tables'
      },
      {
        href: '/dashboard/foundation/blank-page',
        title: 'Blank Page'
      }
    ]
  },
  {
    icon: TemplateIcon,
    title: 'Components',
    items: [
      {
        href: '/dashboard/components/onboarding',
        title: 'Onboarding'
      },
      {
        href: '/dashboard/components/empty-states',
        title: 'Data States'
      },
      {
        href: '/dashboard/components/property-lists',
        title: 'Lists'
      },
      {
        href: '/dashboard/components/stats',
        title: 'Data Stats'
      },
      {
        href: '/dashboard/components/page-headings',
        title: 'Page Headers'
      },
      {
        href: '/dashboard/components/card-headings',
        title: 'Card Headers'
      },
      {
        href: '/dashboard/components/image-uploader',
        title: 'Image Uploader'
      }
    ]
  },
  {
    icon: DocumentTextIcon,
    title: 'Documentation',
    href: '/docs',
    external: true
  }
];

export const DashboardNavbarMenu = (props) => {
  const { open, onClose } = props;
  const { pathname } = useLocation();
  const [openedItem, setOpenedItem] = useState(null);
  const [activeItem, setActiveItem] = useState(null);
  const [activeHref, setActiveHref] = useState('');

  const handleOpenItem = (item) => {
    if (openedItem === item) {
      setOpenedItem(null);
      return;
    }

    setOpenedItem(item);
  };

  useEffect(() => {
    items.forEach((item) => {
      if (item.items) {
        for (let index = 0; index < item.items.length; index++) {
          const active = matchPath({ path: item.items[index].href, end: true }, pathname);

          if (active) {
            setActiveItem(item);
            setActiveHref(item.items[index].href);
            setOpenedItem(item);
            break;
          }
        }
      } else {
        const active = !!matchPath({ path: item.href, end: true }, pathname);

        if (active) {
          setActiveItem(item);
          setOpenedItem(item);
        }
      }
    });
  }, [pathname]);

  return (
    <Drawer
      anchor="top"
      onClose={onClose}
      open={open}
      transitionDuration={0}
      ModalProps={{
        BackdropProps: {
          invisible: true
        }
      }}
      PaperProps={{
        sx: {
          backgroundColor: '#2B2F3C',
          color: '#B2B7C8',
          display: 'flex',
          flexDirection: 'column',
          top: 64,
          maxHeight: 'calc(100% - 64px)',
          width: '100vw'
        }
      }}
    >
      <List>
        {activeItem && (items.map((item) => (
          <DashboardNavbarMenuItem
            active={activeItem?.title === item.title}
            activeHref={activeHref}
            key={item.title}
            onClose={onClose}
            onOpenItem={() => handleOpenItem(item)}
            open={openedItem?.title === item.title}
            {...item}
          />
        )))}
      </List>
    </Drawer>
  );
};

DashboardNavbarMenu.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func
};
