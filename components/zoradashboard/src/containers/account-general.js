import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Box } from '@material-ui/core';
import { AccountDetails } from '../components/account/account-details';
import { AccountChangePassword } from '../components/account/account-change-password';
import { Account2FA } from '../components/account/account-2fa';
import gtm from '../lib/gtm';
export const AccountGeneral = () => {
  useEffect(() => {
    gtm.push({ event: 'page_view' });
  }, []);
  return (
    <>
      <Helmet>
        <title>Account: Profile | Zora Cloud</title>
      </Helmet>
      <Box sx={{ backgroundColor: 'background.default' }}>
        <AccountDetails />
        <AccountChangePassword sx={{ my: 3 }} />
        <Account2FA />
      </Box>
    </>
  );
};
