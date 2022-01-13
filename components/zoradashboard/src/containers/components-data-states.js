import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import {
  Box,
  Button,
  Container,
  Skeleton,
  Table,
  TableCell,
  TableHead,
  TableRow,
  Typography
} from '@material-ui/core';
import { DemoPreview } from '../components/demo-preview';
import { Scrollbar } from '../components/scrollbar';
import { ExclamationOutlined as ExclamationIcon } from '../icons/exclamation-outlined';
import { Plus as PlusIcon } from '../icons/plus';
import { QuestionMarkOutlined as QuestionMarkIcon } from '../icons/question-mark-outlined';
import { Refresh as RefreshIcon } from '../icons/refresh';
import gtm from '../lib/gtm';

export const ComponentsDataStates = () => {
  useEffect(() => {
    gtm.push({ event: 'page_view' });
  }, []);

  return (
    <>
      <Helmet>
        <title>Components: Data States | Carpatin Dashboard</title>
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
            sx={{ mb: 4 }}
            variant="h4"
          >
            Data States
          </Typography>
          <Box
            sx={{
              display: 'grid',
              gap: 5,
              gridAutoFlow: 'row'
            }}
          >
            <DemoPreview
              description="Display a placeholder preview of your content before the data gets loaded to reduce load-time frustration."
              title="Table loading state"
            >
              <Scrollbar>
                <Table sx={{ minWidth: 600 }}>
                  <TableHead>
                    <TableRow>
                      {['Name', 'Phone', 'Email', 'Create at', 'Actions'].map((column) => (
                        <TableCell key={column}>
                          {column}
                        </TableCell>
                      ))}
                    </TableRow>
                  </TableHead>
                </Table>
              </Scrollbar>
              <Box sx={{ p: 2 }}>
                <Skeleton height={42} />
                <Skeleton height={42} />
                <Skeleton height={42} />
              </Box>
            </DemoPreview>
            <DemoPreview
              description="Display a feedback placeholder to let users know there is an empty object."
              title="Component empty state"
            >
              <Box
                sx={{
                  alignItems: 'center',
                  backgroundColor: 'neutral.100',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  p: 3
                }}
              >
                <QuestionMarkIcon sx={{ color: 'text.secondary' }} />
                <Typography
                  color="textSecondary"
                  sx={{ mt: 2 }}
                  variant="body2"
                >
                  There are not objects here yet.
                </Typography>
                <Button
                  color="primary"
                  startIcon={<PlusIcon fontSize="small" />}
                  sx={{ mt: 2 }}
                  variant="contained"
                >
                  Create Object
                </Button>
              </Box>
            </DemoPreview>
            <DemoPreview
              description="Display a feedback placeholder to let users know there’s an server error."
              title="Component error state"
            >
              <Box
                sx={{
                  alignItems: 'center',
                  backgroundColor: 'neutral.100',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  p: 3
                }}
              >
                <ExclamationIcon sx={{ color: 'text.secondary' }} />
                <Typography
                  color="textSecondary"
                  sx={{ mt: 2 }}
                  variant="body2"
                >
                  Error loading data, please try again.
                </Typography>
                <Button
                  color="primary"
                  startIcon={<RefreshIcon fontSize="small" />}
                  sx={{ mt: 2 }}
                  variant="text"
                >
                  Reload Data
                </Button>
              </Box>
            </DemoPreview>
          </Box>
        </Container>
      </Box>
    </>
  );
};
