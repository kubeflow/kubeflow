import { useEffect } from 'react';
import { useRoutes } from 'react-router-dom';
import { CssBaseline, ThemeProvider } from '@material-ui/core';
import { initializeI18n } from './i18n';
import { RTL } from './components/rtl';
import { gtmConfig } from './config';
import { useSettings } from './contexts/settings-context';
import { useAuth } from './hooks/use-auth';
import gtm from './lib/gtm';
import routes from './routes';
import { createCustomTheme } from './theme';

export const App = () => {
  const content = useRoutes(routes);
  const { settings } = useSettings();
  const { isInitialized } = useAuth();

  useEffect(() => {
    gtm.initialize(gtmConfig);
    initializeI18n(settings.language);
  }, [settings]);

  const theme = createCustomTheme({
    direction: settings.direction,
    theme: settings.theme
  });

  return (
    <ThemeProvider theme={theme}>
      <RTL direction={settings.direction}>
        <CssBaseline />
        {isInitialized && content}
      </RTL>
    </ThemeProvider>
  );
};
