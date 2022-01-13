import { useEffect } from 'react';
import NProgress from 'nprogress';
import { Box } from '@material-ui/core';

export const LoadingScreen = () => {
  useEffect(() => {
    NProgress.start();

    return () => {
      NProgress.done();
    };
  }, []);

  return (
    <Box
      sx={{
        backgroundColor: 'background.default',
        flexGrow: 1
      }}
    />
  );
};
