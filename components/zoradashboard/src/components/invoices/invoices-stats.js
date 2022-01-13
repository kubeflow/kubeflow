import Chart from 'react-apexcharts';
import numeral from 'numeral';
import { Box, Card, CardContent, Grid, List, ListItem, Typography } from '@material-ui/core';
import { alpha, useTheme } from '@material-ui/core/styles';
import { StatusBadge } from '../status-badge';

export const InvoicesStats = () => {
  const theme = useTheme();

  const series = [
    {
      color: theme.palette.info.main,
      data: 121,
      name: 'Ongoing'
    },
    {
      color: theme.palette.success.main,
      data: 21,
      name: 'Paid'
    },
    {
      color: theme.palette.error.main,
      data: 10,
      name: 'Overdue'
    }
  ];

  const chartOptions = {
    chart: {
      background: 'transparent',
      stacked: false,
      toolbar: {
        show: false
      },
      zoom: {
        enabled: false
      }
    },
    colors: series.map((item) => item.color),
    dataLabels: {
      enabled: false
    },
    grid: {
      padding: {
        left: 0,
        right: 0
      }
    },
    labels: series.map((item) => item.name),
    legend: {
      show: false
    },
    stroke: {
      width: 0
    },
    theme: {
      mode: theme.palette.mode
    },
    tooltip: {
      theme: theme.palette.mode
    }
  };

  const chartSeries = series.map((item) => item.data);

  return (
    <Card
      elevation={0}
      sx={{
        backgroundColor: alpha(theme.palette.info.main, 0.1),
        mb: 4
      }}
    >
      <CardContent>
        <Grid
          container
          spacing={2}
        >
          <Grid
            item
            md={6}
            xs={12}
          >
            <Typography
              color="textSecondary"
              variant="overline"
            >
              Total net income
            </Typography>
            <Typography
              color="textPrimary"
              sx={{ mb: 3 }}
              variant="h4"
            >
              $12,200.00
            </Typography>
            <Typography
              color="textSecondary"
              variant="body2"
            >
              From a total of
              {' '}
              <strong>6</strong>
              {' '}
              Invoices
            </Typography>
          </Grid>
          <Grid
            item
            md={6}
            xs={12}
            sx={{
              display: 'flex',
              flexDirection: {
                sm: 'row',
                xs: 'column'
              }
            }}
          >
            <Chart
              options={chartOptions}
              series={chartSeries}
              type="donut"
              width={150}
            />
            <List sx={{ flex: 1 }}>
              {series.map((item) => (
                <ListItem
                  disableGutters
                  key={item.name}
                  sx={{ display: 'flex' }}
                >
                  <StatusBadge
                    color={item.color}
                    sx={{ mr: 1 }}
                  />
                  <Typography
                    color="textSecondary"
                    variant="body2"
                  >
                    {item.name}
                  </Typography>
                  <Box sx={{ flexGrow: 1 }} />
                  <Typography
                    color="textPrimary"
                    variant="body2"
                  >
                    {numeral(item.data).format('$0,0.00')}
                  </Typography>
                </ListItem>
              ))}
            </List>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};
