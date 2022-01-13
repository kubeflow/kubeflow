import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet-async';
import { format } from 'date-fns';
import numeral from 'numeral';
import {
  Box,
  Collapse,
  Container,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
  Typography
} from '@material-ui/core';
import { DemoPreview } from '../components/demo-preview';
import { Archive as ArchiveIcon } from '../icons/archive';
import { ArrowRight as ArrowRightIcon } from '../icons/arrow-right';
import { Cash as CashIcon } from '../icons/cash';
import { ChatAlt2 as ChatAlt2Icon } from '../icons/chat-alt2';
import { CheckCircle as CheckCircleIcon } from '../icons/check-circle';
import { ChevronDown as ChevronDownIcon } from '../icons/chevron-down';
import { Duplicate as DuplicateIcon } from '../icons/duplicate';
import { ReceiptRefund as ReceiptRefundIcon } from '../icons/receipt-refund';
import { ShoppingCart as ShoppingCartIcon } from '../icons/shopping-cart';
import gtm from '../lib/gtm';

const ExpandableListItem = (props) => {
  const { transaction, ...other } = props;
  const [open, setOpen] = useState(false);

  const handleOpenChange = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  return (
    <ListItem
      disableGutters
      disablePadding
      sx={{
        width: '100%',
        flexDirection: 'column',
        alignItems: 'stretch'
      }}
      {...other}
    >
      <Box
        sx={{
          display: 'flex',
          px: {
            sm: 2,
            xs: 0
          },
          py: 2
        }}
      >
        <Box
          sx={{
            alignItems: 'center',
            display: 'flex'
          }}
        >
          <Box
            sx={{
              alignItems: 'center',
              display: 'flex',
              flexDirection: 'column',
              mr: {
                sm: 2,
                xs: 0
              },
              px: 1.5,
              py: 0.5
            }}
          >
            <Typography
              color="textSecondary"
              variant="h5"
            >
              {format(new Date(transaction.date), 'dd')}
            </Typography>
            <Typography
              color="textSecondary"
              variant="caption"
            >
              {format(new Date(transaction.date), 'MMM yy')}
            </Typography>
          </Box>
          <div>
            <Typography
              color="textPrimary"
              sx={{ display: 'block' }}
              variant="body2"
            >
              {transaction.company}
            </Typography>
            <Typography
              color="textSecondary"
              variant="body2"
            >
              {transaction.bankAccount}
            </Typography>
          </div>
        </Box>
        <Box sx={{ flexGrow: 1 }} />
        <div>
          <Typography
            sx={{
              color: transaction.type === 'receive'
                ? 'text.primary'
                : 'success.main'
            }}
            variant="subtitle2"
          >
            {numeral(transaction.amount).format(`${transaction.currencySymbol}0,0.00`)}
          </Typography>
          <Typography
            color="textSecondary"
            variant="body2"
          >
            {transaction.currency}
          </Typography>
        </div>
        <Box
          sx={{
            alignItems: 'center',
            display: 'flex',
            ml: 2
          }}
        >
          <IconButton onClick={handleOpenChange}>
            <ChevronDownIcon />
          </IconButton>
        </Box>
      </Box>
      <Collapse in={open}>
        <Box
          sx={{
            px: 2,
            py: 1
          }}
        >
          <Typography
            color="textPrimary"
            variant="body2"
          >
            Content
          </Typography>
        </Box>
      </Collapse>
    </ListItem>
  );
};

ExpandableListItem.propTypes = {
  transaction: PropTypes.object.isRequired
};

const transactions = [
  {
    amount: 250,
    bankAccount: 'GB 0000 6499 7623 1100 11122',
    company: 'Material-UI SAS',
    currency: 'USD',
    currencySymbol: '$',
    date: new Date(),
    id: '1',
    type: 'receive'
  },
  {
    amount: 100,
    bankAccount: 'GB 0000 6499 7623 1100 11122',
    company: 'Material-UI SAS',
    currency: 'USD',
    currencySymbol: '$',
    date: new Date(),
    id: '2',
    type: 'send'
  }
];

export const ComponentsLists = () => {
  useEffect(() => {
    gtm.push({ event: 'page_view' });
  }, []);

  return (
    <>
      <Helmet>
        <title>Components: Lists | Carpatin Dashboard</title>
      </Helmet>
      <Box
        sx={{
          backgroundColor: 'background.default',
          flexGrow: 1,
          py: 4
        }}
      >
        <Container maxWidth="lg">
          <Typography
            color="textPrimary"
            sx={{ mb: 6 }}
            variant="h4"
          >
            Lists
          </Typography>
          <Box
            sx={{
              display: 'grid',
              gap: 5,
              gridAutoFlow: 'row'
            }}
          >
            <DemoPreview title="Actionable list">
              <List dense>
                <ListItemButton>
                  <ListItemIcon>
                    <CheckCircleIcon
                      fontSize="small"
                      sx={{ color: 'action.active' }}
                    />
                  </ListItemIcon>
                  <ListItemText primary="Check" />
                </ListItemButton>
                <ListItemButton>
                  <ListItemIcon>
                    <DuplicateIcon
                      fontSize="small"
                      sx={{ color: 'action.active' }}
                    />
                  </ListItemIcon>
                  <ListItemText primary="Copy" />
                </ListItemButton>
                <ListItemButton disabled>
                  <ListItemIcon>
                    <ReceiptRefundIcon
                      fontSize="small"
                      sx={{ color: 'action.active' }}
                    />
                  </ListItemIcon>
                  <ListItemText primary="Send" />
                </ListItemButton>
                <ListItemButton>
                  <ListItemIcon>
                    <ArchiveIcon
                      fontSize="small"
                      sx={{ color: 'action.active' }}
                    />
                  </ListItemIcon>
                  <ListItemText primary="Archive" />
                </ListItemButton>
              </List>
            </DemoPreview>
            <DemoPreview title="Icon list with right action">
              <List>
                <ListItem divider>
                  <ListItemIcon>
                    <ShoppingCartIcon sx={{ color: 'action.active' }} />
                  </ListItemIcon>
                  <ListItemText primary="Orders" />
                  <ListItemSecondaryAction>
                    <IconButton size="small">
                      <ArrowRightIcon fontSize="small" />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
                <ListItem divider>
                  <ListItemIcon>
                    <ChatAlt2Icon sx={{ color: 'action.active' }} />
                  </ListItemIcon>
                  <ListItemText primary="Messages" />
                  <ListItemSecondaryAction>
                    <IconButton size="small">
                      <ArrowRightIcon fontSize="small" />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <CashIcon sx={{ color: 'action.active' }} />
                  </ListItemIcon>
                  <ListItemText primary="Transactions" />
                  <ListItemSecondaryAction>
                    <IconButton size="small">
                      <ArrowRightIcon fontSize="small" />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              </List>
            </DemoPreview>
            <DemoPreview title="Expanding list with date">
              <List
                disablePadding
                sx={{ width: '100%' }}
              >
                {transactions.map((transaction, index) => (
                  <ExpandableListItem
                    key={transaction.id}
                    transaction={transaction}
                    divider={index + 1 < transactions.length}
                  />
                ))}
              </List>
            </DemoPreview>
            <DemoPreview title="Property lists with value below the label">
              <List disablePadding>
                <ListItem
                  disableGutters
                  divider
                  sx={{
                    px: 3,
                    py: 1.5
                  }}
                >
                  <ListItemText
                    disableTypography
                    primary={(
                      <Typography
                        color="textPrimary"
                        variant="subtitle2"
                      >
                        Full Name
                      </Typography>
                    )}
                    secondary={(
                      <Box
                        sx={{
                          flex: 1,
                          mt: 0.5
                        }}
                      >
                        <Typography
                          color="textSecondary"
                          variant="body2"
                        >
                          Natalie Rusell
                        </Typography>
                      </Box>
                    )}
                    sx={{ my: 0 }}
                  />
                </ListItem>
                <ListItem
                  disableGutters
                  divider
                  sx={{
                    px: 3,
                    py: 1.5
                  }}
                >
                  <ListItemText
                    disableTypography
                    primary={(
                      <Typography
                        color="textPrimary"
                        variant="subtitle2"
                      >
                        Email Address
                      </Typography>
                    )}
                    secondary={(
                      <Box
                        sx={{
                          flex: 1,
                          mt: 0.5
                        }}
                      >
                        <Typography
                          color="textSecondary"
                          variant="body2"
                        >
                          natalie.rusell@gmail.com
                        </Typography>
                      </Box>
                    )}
                    sx={{ my: 0 }}
                  />
                </ListItem>
                <ListItem
                  disableGutters
                  sx={{
                    px: 3,
                    py: 1.5
                  }}
                >
                  <ListItemText
                    disableTypography
                    primary={(
                      <Typography
                        color="textPrimary"
                        variant="subtitle2"
                      >
                        Job Position
                      </Typography>
                    )}
                    secondary={(
                      <Box
                        sx={{
                          flex: 1,
                          mt: 0.5
                        }}
                      >
                        <Typography
                          color="textSecondary"
                          variant="body2"
                        >
                          Backend Developer
                        </Typography>
                      </Box>
                    )}
                    sx={{ my: 0 }}
                  />
                </ListItem>
              </List>
            </DemoPreview>
            <DemoPreview
              title="Property lists with value opposing the label"
              sx={{
                display: {
                  md: 'block',
                  xs: 'none'
                }
              }}
            >
              <List disablePadding>
                <ListItem
                  disableGutters
                  divider
                  sx={{
                    px: 3,
                    py: 1.5
                  }}
                >
                  <ListItemText
                    disableTypography
                    primary={(
                      <Typography
                        color="textPrimary"
                        sx={{ minWidth: 180 }}
                        variant="subtitle2"
                      >
                        Full Name
                      </Typography>
                    )}
                    secondary={(
                      <Box sx={{ flex: 1 }}>
                        <Typography
                          color="textSecondary"
                          variant="body2"
                        >
                          Natalie Rusell
                        </Typography>
                      </Box>
                    )}
                    sx={{
                      alignItems: 'flex-start',
                      display: 'flex',
                      flexDirection: 'row',
                      my: 0
                    }}
                  />
                </ListItem>
                <ListItem
                  disableGutters
                  divider
                  sx={{
                    px: 3,
                    py: 1.5
                  }}
                >
                  <ListItemText
                    disableTypography
                    primary={(
                      <Typography
                        color="textPrimary"
                        sx={{ minWidth: 180 }}
                        variant="subtitle2"
                      >
                        Email Address
                      </Typography>
                    )}
                    secondary={(
                      <Box sx={{ flex: 1 }}>
                        <Typography
                          color="textSecondary"
                          variant="body2"
                        >
                          natalie.rusell@gmail.com
                        </Typography>
                      </Box>
                    )}
                    sx={{
                      alignItems: 'flex-start',
                      display: 'flex',
                      flexDirection: 'row',
                      my: 0
                    }}
                  />
                </ListItem>
                <ListItem
                  disableGutters
                  sx={{
                    px: 3,
                    py: 1.5
                  }}
                >
                  <ListItemText
                    disableTypography
                    primary={(
                      <Typography
                        color="textPrimary"
                        sx={{ minWidth: 180 }}
                        variant="subtitle2"
                      >
                        Job Position
                      </Typography>
                    )}
                    secondary={(
                      <Box sx={{ flex: 1 }}>
                        <Typography
                          color="textSecondary"
                          variant="body2"
                        >
                          Backend Developer
                        </Typography>
                      </Box>
                    )}
                    sx={{
                      alignItems: 'flex-start',
                      display: 'flex',
                      flexDirection: 'row',
                      my: 0
                    }}
                  />
                </ListItem>
              </List>
            </DemoPreview>
          </Box>
        </Container>
      </Box>
    </>
  );
};
