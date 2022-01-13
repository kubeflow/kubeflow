import { Box, Card, Grid, Typography } from '@material-ui/core';
import { Cash as CashIcon } from '../../icons/cash';
import { CheckCircle as CheckCircleIcon } from '../../icons/check-circle';
import { ShoppingCart as ShoppingCartIcon } from '../../icons/shopping-cart';
import { XCircle as XCircleIcon } from '../../icons/x-circle';

// NOTE: This should be generated based on products data
const stats = [
  {
    content: '5,000',
    icon: CheckCircleIcon,
    iconColor: 'success.main',
    label: 'Total Stock'
  },
  {
    content: '15',
    icon: XCircleIcon,
    iconColor: 'warning.main',
    label: 'OUT OF STOCK ITEMS'
  },
  {
    content: '$ 25,200.00',
    icon: CashIcon,
    iconColor: 'primary.main',
    label: 'Retail Value'
  },
  {
    content: '$ 8,250.00',
    icon: ShoppingCartIcon,
    iconColor: 'secondary.main',
    label: 'Unrealized Profit'
  }
];

export const ProductsSummary = () => (
  <Card
    sx={{ mb: 3 }}
    variant="outlined"
  >
    <Grid container>
      {stats.map((item, index) => {
        const { icon: Icon, iconColor, content, label } = item;

        return (
          <Grid
            item
            key={item.label}
            md={3}
            sm={6}
            sx={{
              borderBottom: (theme) => ({
                md: 0,
                sm: stats.length > index + 2 ? `1px solid ${theme.palette.divider}` : 0,
                xs: stats.length > index + 1 ? `1px solid ${theme.palette.divider}` : 0
              }),
              borderRight: (theme) => ({
                md: stats.length > index + 1 ? `1px solid ${theme.palette.divider}` : 0,
                xs: 0
              })
            }}
            xs={12}
          >
            <Box
              sx={{
                alignItems: 'center',
                borderRadius: 1,
                display: 'flex',
                p: 2
              }}
            >
              <Icon sx={{ color: iconColor || 'text.secondary' }} />
              <Box sx={{ ml: 2 }}>
                <Typography
                  color="textSecondary"
                  variant="overline"
                >
                  {label}
                </Typography>
                <Typography
                  color="textPrimary"
                  variant="h6"
                >
                  {content}
                </Typography>
              </Box>
            </Box>
          </Grid>
        );
      })}
    </Grid>
  </Card>
);
