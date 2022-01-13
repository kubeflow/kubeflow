---
title: Settings
---

# Settings

It is important for your customers to have some control over the app interface. To make that
possible you need a way to let the app know which are the user preferences. In order to achieve it,
the app uses a context that can make its data available in the entire component tree for usage and
control.

Currently, the app allows you to control the `theme`, and you can choose between available options
(`light` or `dark`).

## How it works

```jsx
import { SettingsProvider } from './contexts/SettingsContext';
import App from './App';

ReactDOM.render(
  <SettingsProvider>
    <App />
  </SettingsProvider>,
  document.getElementById('root')
);
```

The `App` component is wrapped with the `SettingsProvider`, and by doing this its context data is
made available inside the App.

## How to use

There are two methods, using the hook or the context consumer.

```jsx
import useSettings from './hooks/useSettings';

const App = () => {
  const { settings } = useSettings();

  return (
    <div>
      Current theme: {settings.theme}
    </div>
  );
};
```

```jsx
import { SettingsConsumer } from './contexts/SettingsContext';

const App = () => {
  return (
    <SettingsConsumer>
      {({ settings }) => (
        <div>
          Current theme: {settings.theme}
        </div>
      )}
    </SettingsConsumer>
  );
};
```

## Triggering the settings update

It can be implemented in any component within seconds.

```jsx
import useSettings from './hooks/useSettings';

const App = () => {
  const { settings, saveSettings } = useSettings();

  const handleSave = () => {
    saveSettings({
      ...settings,
      theme: 'dark'
    });
  };

  return (
    <div>
      <Button onClick={handleSave}>
        Save
      </Button>
    </div>
  );
};
```

## Store / restore user preferences

The SettingsContext on mount event, it extracts stored settings from `localStorage` (if available);
if not, a default value is provided. This can be extended and, instead of using the localStorage,
you can use a server. This gives the user the possibility to have the same settings across multiple
devices.
