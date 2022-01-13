import { useState } from 'react';
import { Box, Button, FormHelperText } from '@material-ui/core';
import { useAuth } from '../../hooks/use-auth';
import { useMounted } from '../../hooks/use-mounted';

export const LoginAuth0 = (props) => {
  const mounted = useMounted();
  const { loginWithPopup } = useAuth();
  const [error, setError] = useState(null);

  const handleLogin = async () => {
    try {
      await loginWithPopup();
    } catch (err) {
      console.error(err);
      if (mounted.current) {
        setError(err.message);
      }
    }
  };

  return (
    <div {...props}>
      {error && (
        <Box sx={{ my: 3 }}>
          <FormHelperText error>
            {error}
          </FormHelperText>
        </Box>
      )}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center'
        }}
      >
        <Button
          color="primary"
          onClick={handleLogin}
          variant="contained"
        >
          Log In
        </Button>
      </Box>
    </div>
  );
};
