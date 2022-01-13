import { useState } from 'react';
import Chart from 'react-apexcharts';
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Divider,
  List,
  ListItem,
  ListSubheader,
  Typography
} from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';
import { ActionsMenu } from '../actions-menu';
import { StatusBadge } from '../status-badge';

const series = [
  {
    color: 'rgba(49, 129, 237, 1)',
    data: 10,
    name: 'Complete'
  },
  {
    color: 'rgba(19, 93, 190, 1)',
    data: 10,
    name: 'Pending'
  },
  {
    color: 'rgba(6, 70, 153, 1)',
    data: 10,
    name: 'Cancelled'
  },
  {
    color: 'rgba(71, 148, 235, 1)',
    data: 70,
    name: 'Refunded'
  }
];

export const OrdersOverview = (props) => {
  const theme = useTheme();
  const [range, setRange] = useState('Last 7 days');

  const ranges = [
    {
      label: 'Last 7 days',
      onClick: () => { setRange('Last 7 days'); }
    },
    {
      label: 'Last Month',
      onClick: () => { setRange('Last Month'); }
    },
    {
      label: 'Last Year',
      onClick: () => { setRange('Last Year'); }
    }
  ];

  const chartOptions = {
    chart: {
      background: 'transparent'
    },
    colors: series.map((item) => item.color),
    dataLabels: {
      enabled: false
    },
    labels: series.map((item) => item.name),
    legend: {
      show: false
    },
    stroke: {
      show: false
    },
    theme: {
      mode: theme.palette.mode
    }
  };

  const chartSeries = series.map((item) => item.data);

  return (
    <Card
      variant="outlined"
      {...props}
    >
      <CardHeader
        action={(
          <ActionsMenu
            actions={ranges}
            label={range}
            size="small"
            variant="text"
          />
        )}
        title="Orders Overview"
      />
      <Divider />
      <CardContent>
        <Chart
          height={200}
          options={chartOptions}
          series={chartSeries}
          type="donut"
        />
        <List>
          <ListSubheader
            disableGutters
            component="div"
            sx={{
              alignItems: 'center',
              display: 'flex',
              py: 1
            }}
          >
            <Typography
              color="textPrimary"
              variant="subtitle2"
            >
              Total
            </Typography>
            <Box sx={{ flexGrow: 1 }} />
            <Typography
              color="textPrimary"
              variant="subtitle2"
            >
              {series.reduce((acc, currentValue) => acc + currentValue.data, 0)}
            </Typography>
          </ListSubheader>
          <Divider />
          {series.map((item, index) => (
            <ListItem
              disableGutters
              divider={series.length > index + 1}
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
                color="textSecondary"
                variant="body2"
              >
                {item.data}
              </Typography>
            </ListItem>
          ))}
        </List>
      </CardContent>
    </Card>
  );
};
