import { Link as RouterLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { Collapse, List, ListItemButton, ListItemIcon, ListItemText } from '@material-ui/core';
import { ChevronRight as ChevronRightIcon } from '../icons/chevron-right';
import { ChevronDown as ChevronDownIcon } from '../icons/chevron-down';
import { ExternalLink as ExternalLinkIcon } from '../icons/external-link';

export const DashboardNavbarMenuItem = (props) => {
  const {
    active,
    activeHref,
    external,
    href,
    icon: Icon,
    items,
    onClose,
    onOpenItem,
    open,
    title
  } = props;
  const { t } = useTranslation();

  // Branch
  if (items) {
    return (
      <List
        disablePadding
        sx={{ width: '100%' }}
      >
        <ListItemButton
          divider
          key={title}
          onClick={onOpenItem}
          sx={{
            alignItems: 'center',
            borderColor: '#3F455A',
            display: 'flex',
            px: 3,
            py: 1.5,
            ...active && ({
              backgroundColor: '#383D4D',
              color: '#ffffff'
            }),
            '&:hover': {
              backgroundColor: '#383D4D',
              color: '#ffffff'
            }
          }}
        >
          <ListItemIcon
            sx={{
              color: 'inherit',
              minWidth: 0,
              mr: 1
            }}
          >
            <Icon />
          </ListItemIcon>
          <ListItemText
            primary={t(title)}
            primaryTypographyProps={{
              color: 'inherit',
              variant: 'caption'
            }}
          />
          {open
            ? (
              <ChevronDownIcon
                fontSize="small"
                sx={{ color: '#506176' }}
              />
            )
            : (
              <ChevronRightIcon
                fontSize="small"
                sx={{ color: '#506176' }}
              />
            )}
        </ListItemButton>
        <Collapse
          in={open}
          unmountOnExit
        >
          <List
            disablePadding
            sx={{ width: '100%' }}
          >
            {items.map((item) => {
              const isActive = activeHref === item.href;

              return (
                <ListItemButton
                  component={RouterLink}
                  divider
                  key={item.href}
                  onClick={onClose}
                  sx={{
                    alignItems: 'center',
                    borderColor: '#3F455A',
                    display: 'flex',
                    px: 3,
                    py: 1.5,
                    ...isActive && ({
                      backgroundColor: '#383D4D',
                      color: '#ffffff'
                    }),
                    '&:hover': {
                      backgroundColor: '#383D4D',
                      color: '#ffffff'
                    }
                  }}
                  to={item.href}
                >
                  <ListItemText
                    primary={t(item.title)}
                    primaryTypographyProps={{
                      color: 'inherit',
                      variant: 'caption'
                    }}
                    sx={{ my: 0 }}
                  />
                </ListItemButton>
              );
            })}
          </List>
        </Collapse>
      </List>
    );
  }

  // Leaf
  return (
    <>
      <ListItemButton
        component={RouterLink}
        divider
        onClick={onClose}
        sx={{
          alignItems: 'center',
          borderColor: '#3F455A',
          display: 'flex',
          px: 3,
          py: 1.5,
          ...active && ({
            backgroundColor: '#383D4D',
            color: '#ffffff'
          }),
          '&:hover': {
            backgroundColor: '#383D4D',
            color: '#ffffff'
          }
        }}
        target={external ? '_target' : '_self'}
        to={href}
      >
        <ListItemIcon
          sx={{
            color: 'inherit',
            minWidth: 0,
            mr: 1
          }}
        >
          <Icon />
        </ListItemIcon>
        <ListItemText
          primary={t(title)}
          primaryTypographyProps={{
            color: 'inherit',
            variant: 'caption'
          }}
        />
        {external && <ExternalLinkIcon sx={{ color: '#506176' }} />}
      </ListItemButton>
    </>
  );
};

DashboardNavbarMenuItem.defaultProps = {
  open: false
};

DashboardNavbarMenuItem.propTypes = {
  active: PropTypes.bool,
  activeHref: PropTypes.string,
  external: PropTypes.bool,
  href: PropTypes.string,
  // @ts-ignore
  icon: PropTypes.elementType,
  items: PropTypes.array,
  onClose: PropTypes.func,
  onOpenItem: PropTypes.func,
  open: PropTypes.bool,
  title: PropTypes.string
};
