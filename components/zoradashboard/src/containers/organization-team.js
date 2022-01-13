import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import {
  Avatar,
  Box,
  Button,
  Card,
  CardHeader,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography
} from '@material-ui/core';
import { OrganizationInviteDialog } from '../components/organization/organization-invite-dialog';
import { Scrollbar } from '../components/scrollbar';
import { Plus as PlusIcon } from '../icons/plus';
import gtm from '../lib/gtm';

const roles = [
  {
    label: 'Administrator',
    value: 'administrator'
  },
  {
    label: 'Editor',
    value: 'editor'
  }
];

const members = [
  {
    id: '1',
    avatar: '/static/user-chen_simmons.png',
    name: 'Chen Simmons',
    email: 'chen.simmons@acmecorp.com',
    role: 'administrator'
  },
  {
    id: '2',
    avatar: '/static/user-horia_tepar.png',
    name: 'Horia Tepar',
    email: 'horia.tepar@acmecorp.com',
    role: 'editor'
  }
];

export const OrganizationTeam = () => {
  const [openInvite, setOpenInvite] = useState();

  useEffect(() => {
    gtm.push({ event: 'page_view' });
  }, []);

  return (
    <>
      <Helmet>
        <title>Organization: Team | Carpatin Dashboard</title>
      </Helmet>
      <Card variant="outlined">
        <CardHeader
          action={(
            <Button
              color="primary"
              onClick={() => setOpenInvite(true)}
              size="small"
              startIcon={(
                <PlusIcon />
              )}
              variant="contained"
            >
              Invite
            </Button>
          )}
          title="Members"
        />
        <Divider />
        <Scrollbar>
          <Table sx={{ minWidth: 700 }}>
            <TableHead>
              <TableRow>
                <TableCell>
                  Name
                </TableCell>
                <TableCell>
                  Email
                </TableCell>
                <TableCell>
                  Role
                </TableCell>
                <TableCell>
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {members.map((member) => {
                const roleOption = roles.find((option) => option.value === member.role);

                return (
                  <TableRow key={member.id}>
                    <TableCell>
                      <Box
                        sx={{
                          alignItems: 'center',
                          display: 'flex'
                        }}
                      >
                        <Avatar
                          alt={member.name}
                          src={member.avatar}
                          sx={{ mr: 1 }}
                        />
                        <Typography
                          color="textPrimary"
                          variant="subtitle2"
                        >
                          {member.name}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>
                      {member.email}
                    </TableCell>
                    <TableCell
                      sx={{
                        color: member.role === 'administrator'
                          ? 'text.secondary'
                          : 'text.primary'
                      }}
                    >
                      {roleOption.label}
                    </TableCell>
                    <TableCell sx={{ width: 145 }}>
                      <Box sx={{ display: 'flex' }}>
                        <Typography
                          color="primary"
                          sx={{ cursor: 'pointer' }}
                          variant="subtitle2"
                        >
                          Edit
                        </Typography>
                        {member.role !== 'administrator' && (
                          <>
                            <Divider
                              flexItem
                              orientation="vertical"
                              sx={{ mx: 2 }}
                            />
                            <Typography
                              color="primary"
                              sx={{ cursor: 'pointer' }}
                              variant="subtitle2"
                            >
                              Remove
                            </Typography>
                          </>
                        )}
                      </Box>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </Scrollbar>
      </Card>
      <OrganizationInviteDialog
        onClose={() => setOpenInvite(false)}
        open={openInvite}
      />
    </>
  );
};
