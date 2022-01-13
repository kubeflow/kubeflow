import { useState, useEffect } from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  Box,
  Button,
  Collapse,
  Drawer,
  IconButton,
  List,
  ListSubheader,
  Typography
} from '@material-ui/core';
import { DeviasChevronDown as ChevronDownIcon } from '../icons/devias-chevron-down';
import { DeviasChevronRight as ChevronRightIcon } from '../icons/devias-chevron-right';
import { X as XICon } from '../icons/x';
import { lightNeutral } from '../colors';
import { MainSidebarLink } from './main-sidebar-link';

const sections = [
  {
    title: 'Products',
    items: [
      {
        title: 'List',
        href: '/dashboard/products'
      },
      {
        title: 'Summary',
        href: '/dashboard/products/1'
      },
      {
        title: 'Inventory',
        href: '/dashboard/products/1/inventory'
      },
      {
        title: 'Insights',
        href: '/dashboard/products/1/analytics'
      }
    ]
  },
  {
    title: 'Orders',
    items: [
      {
        title: 'List',
        href: '/dashboard/orders'
      },
      {
        title: 'Summary',
        href: '/dashboard/orders/1'
      }
    ]
  },
  {
    title: 'Customers',
    items: [
      {
        title: 'List',
        href: '/dashboard/customers'
      },
      {
        title: 'Summary',
        href: '/dashboard/customers/1'
      },
      {
        title: 'Orders',
        href: '/dashboard/customers/1/orders'
      },
      {
        title: 'Activity',
        href: '/dashboard/customers/1/orders'
      }
    ]
  },
  {
    title: 'Invoices',
    items: [
      {
        title: 'List',
        href: '/dashboard/invoices'
      },
      {
        title: 'Create',
        href: '/dashboard/invoices/create'
      },
      {
        title: 'Details',
        href: '/dashboard/invoices/1'
      },
      {
        title: 'Preview',
        href: '/dashboard/invoices/1/preview'
      }
    ]
  },
  {
    title: 'Dashboards',
    items: [
      {
        title: 'Overview',
        href: '/dashboard'
      },
      {
        title: 'Reports',
        href: '/dashboard/sales'
      }
    ]
  },
  {
    title: 'Account',
    items: [
      {
        title: 'General',
        href: '/dashboard/account'
      },
      {
        title: 'Notifications',
        href: '/dashboard/account/notifications'
      }
    ]
  },
  {
    title: 'Organization',
    items: [
      {
        title: 'General',
        href: '/dashboard/organization'
      },
      {
        title: 'Team',
        href: '/dashboard/organization/team'
      },
      {
        title: 'Billing',
        href: '/dashboard/organization/billing'
      }
    ]
  }
];

const MainSidebarSection = (props) => {
  const { section } = props;
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <>
      <li>
        <Button
          color="inherit"
          sx={{
            alignItems: 'center',
            justifyContent: 'space-between',
            display: 'flex',
            width: '100%'
          }}
          variant="text"
          onClick={handleClick}
        >
          {section.title}
          {open ? <ChevronDownIcon /> : <ChevronRightIcon />}
        </Button>
      </li>
      <Collapse
        in={open}
        timeout="auto"
        unmountOnExit
      >
        <List
          disablePadding
          sx={{ color: 'neutral.500' }}
        >
          {section.items.map((item) => (
            <MainSidebarLink
              key={item.title}
              label={item.title}
              sx={{ pl: 3 }}
              component={RouterLink}
              to={item.href}
            />
          ))}
        </List>
      </Collapse>
    </>
  );
};

MainSidebarSection.propTypes = {
  section: PropTypes.object.isRequired
};

export const MainSidebar = (props) => {
  const { onClose, open } = props;
  const location = useLocation();

  useEffect(() => {
    if (open && onClose) {
      onClose();
    }
  }, [location.pathname]);

  return (
    <Drawer
      anchor="right"
      onClose={onClose}
      open={open}
      variant="temporary"
      PaperProps={{
        sx: {
          backgroundColor: lightNeutral[900],
          color: 'primary.contrastText',
          width: 256
        }
      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          pt: 2,
          px: 3
        }}
      >
        <IconButton
          onClick={onClose}
          sx={{ color: '#ffffff' }}
        >
          <XICon />
        </IconButton>
      </Box>
      <Box
        sx={{
          alignItems: 'flex-start',
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          p: 2
        }}
      >
        <List sx={{ width: '100%' }}>
          <MainSidebarLink
            component={RouterLink}
            to="/dashboard"
            label="Live Demo"
          />
          <MainSidebarLink
            component={RouterLink}
            to="/docs"
            label="Docs"
          />
          <List
            subheader={(
              <ListSubheader
                disableGutters
                disableSticky
              >
                <Typography
                  color="textSecondary"
                  variant="overline"
                  sx={{ pl: 1 }}
                >
                  Pages
                </Typography>
              </ListSubheader>
            )}
            sx={{ width: '100%' }}
          >
            {sections.map((section) => (
              <MainSidebarSection
                section={section}
                key={section.title}
              />
            ))}
          </List>
        </List>
      </Box>
    </Drawer>
  );
};

MainSidebar.propTypes = {
  onClose: PropTypes.func,
  open: PropTypes.bool
};
