---
title: Internationalization
---

# Internationalization

Supporting multiple languages may represent an important feature for your app. To have this enabled
the app uses
`i18next` framework. Read more about it [here](https://www.i18next.com/).

## How it works

Although, none of the components use it per se, the application is able to support translations. You
might need to change all instances of inline text in any components to be wrapped with the `t()`
function as presented below.

The library needs a configuration and initialization file, in this case, `src/i18n.js` file.

First step is to declare the app translations as resources.

```js
const resources = {
  en: {
    translation: {
      'Welcome to React': 'Welcome to React and react-i18next'
    }
  },
  fr: {
    translation: {
      'Welcome to React': 'Bienvenue à React et react-i18next'
    }
  },
  es: {
    translation: {
      'Welcome to React': 'Bienvenido a React and react-i18next'
    }
  },
  // ...
};
```

These translations need to be passed in the `i18n.init()` function to make them available
inside `App` components tree using the `useTranslation` hook.

```jsx
import { useTranslation } from 'react-i18next';

const App = () => {
  const { t } = useTranslation();

  return (
    <h1>{t('Welcome to React')}</h1>
  );
}
```

For all configuration options, please follow the
[official documentation](https://www.i18next.com/overview/configuration-options).

## Removing internationalization support

1. Remove `import './i18n` line from `App` component.
2. Remove `i18n.js` configuration file from `src` folder.
3. Remove `LanguagePopover` component since it connects with the library.
3. Uninstall `i18next` and `react-i18next` dependencies.
