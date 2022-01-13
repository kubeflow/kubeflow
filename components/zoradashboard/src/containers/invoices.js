import { useCallback, useEffect, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Box, Button, Card, Container, Divider, Typography } from '@material-ui/core';
import { invoiceApi } from '../api/invoice';
import { InvoicesFilter } from '../components/invoices/invoices-filter';
import { InvoicesStats } from '../components/invoices/invoices-stats';
import { InvoicesTable } from '../components/invoices/invoices-table';
import { useMounted } from '../hooks/use-mounted';
import { useSelection } from '../hooks/use-selection';
import { Plus as PlusIcon } from '../icons/plus';
import gtm from '../lib/gtm';

export const Invoices = () => {
  const mounted = useMounted();
  const [controller, setController] = useState({
    filters: [],
    page: 0,
    query: '',
    sort: 'desc',
    sortBy: 'createdAt',
    view: 'all'
  });
  const [invoicesState, setInvoicesState] = useState({ isLoading: true });
  const [
    selectedInvoices,
    handleSelect,
    handleSelectAll
  ] = useSelection(invoicesState.data?.invoices);

  const getCustomers = useCallback(async () => {
    setInvoicesState(() => ({ isLoading: true }));

    try {
      const result = await invoiceApi.getInvoices({
        filters: controller.filters,
        page: controller.page,
        query: controller.query,
        sort: controller.sort,
        sortBy: controller.sortBy,
        view: controller.view
      });

      if (mounted.current) {
        setInvoicesState(() => ({
          isLoading: false,
          data: result
        }));
      }
    } catch (err) {
      console.error(err);

      if (mounted.current) {
        setInvoicesState(() => ({
          isLoading: false,
          error: err.message
        }));
      }
    }
  }, [controller]);

  useEffect(() => {
    getCustomers().catch(console.error);
  }, [controller]);

  useEffect(() => {
    gtm.push({ event: 'page_view' });
  }, []);

  const handleViewChange = (newView) => {
    setController({
      ...controller,
      page: 0,
      view: newView
    });
  };

  const handleQueryChange = (newQuery) => {
    setController({
      ...controller,
      page: 0,
      query: newQuery
    });
  };

  const handleFiltersApply = (newFilters) => {
    const parsedFilters = newFilters.map((filter) => ({
      property: filter.property.name,
      value: filter.value,
      operator: filter.operator.value
    }));

    setController({
      ...controller,
      page: 0,
      filters: parsedFilters
    });
  };

  const handleFiltersClear = () => {
    setController({
      ...controller,
      page: 0,
      filters: []
    });
  };

  const handlePageChange = (newPage) => {
    setController({
      ...controller,
      page: newPage - 1
    });
  };

  const handleSortChange = (event, property) => {
    const isAsc = controller.sortBy === property && controller.sort === 'asc';

    setController({
      ...controller,
      page: 0,
      sort: isAsc ? 'desc' : 'asc',
      sortBy: property
    });
  };

  return (
    <>
      <Helmet>
        <title>Invoice: List | Carpatin Dashboard</title>
      </Helmet>
      <Box
        sx={{
          backgroundColor: 'background.default',
          flexGrow: 1
        }}
      >
        <Container
          maxWidth="lg"
          sx={{
            display: 'flex',
            flexDirection: 'column',
            height: '100%'
          }}
        >
          <Box sx={{ py: 4 }}>
            <Box
              sx={{
                alignItems: 'center',
                display: 'flex'
              }}
            >
              <Typography
                color="textPrimary"
                variant="h4"
              >
                Invoices
              </Typography>
              <Box sx={{ flexGrow: 1 }} />
              <Button
                color="primary"
                component={RouterLink}
                size="large"
                startIcon={<PlusIcon fontSize="small" />}
                to="/dashboard/invoices/create"
                variant="contained"
              >
                Add
              </Button>
            </Box>
          </Box>
          <InvoicesStats />
          <Card
            sx={{
              display: 'flex',
              flexDirection: 'column',
              flexGrow: 1
            }}
            variant="outlined"
          >
            <InvoicesFilter
              disabled={invoicesState.isLoading}
              filters={controller.filters}
              onFiltersApply={handleFiltersApply}
              onFiltersClear={handleFiltersClear}
              onQueryChange={handleQueryChange}
              onViewChange={handleViewChange}
              query={controller.query}
              selectedInvoices={selectedInvoices}
              view={controller.view}
            />
            <Divider />
            <InvoicesTable
              error={invoicesState.error}
              invoices={invoicesState.data?.invoices}
              invoicesCount={invoicesState.data?.invoicesCount}
              isLoading={invoicesState.isLoading}
              onPageChange={handlePageChange}
              onSelect={handleSelect}
              onSelectAll={handleSelectAll}
              onSortChange={handleSortChange}
              page={controller.page + 1}
              selectedInvoices={selectedInvoices}
              sort={controller.sort}
              sortBy={controller.sortBy}
            />
          </Card>
        </Container>
      </Box>
    </>
  );
};
