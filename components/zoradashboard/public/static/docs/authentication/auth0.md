---
title: Auth0
---

# Auth0

Auth0 is an easy to implement, adaptable authentication and authorization platform. Auth0 provides a
library built for React, but the app uses a more generic library designed for universal SPAs. This
gives you more control over the components, as the app needs to provide support for multiple
authentication providers. You can refer to their [documentation](https://auth0.com/docs/)
as you deem fit, or in case you need things not covered in the app.

## Set up your Auth0 account

The documentation for this, can be found in the official documentation of the service, mentioned
above.

## Configuration

To configure Auth0 client library you have to open (or create) `.env` file in the project's root
folder and set the following variables as presented in your Auth0 account settings:

```shell
REACT_APP_AUTH0_CLIENT_ID=
REACT_APP_AUTH0_DOMAIN=
```

If you do not want to set up environment variables you can simply set the `auth0Config` object
from `src/config.js` file.

```js
export const auth0Config = {
    client_id: '',
    domain: ''
};
```

## How it was implemented

As mentioned, Auth0 offers a set of components to help your development process, although they're
not used in the app.

The `Auth0Client` class from the library is used to provide the authentication feature to a
context (which wraps the `App`).

This aforementioned context is then used in the component tree to access the `Auth0Client` instance
public methods. It provides the user authentication status and user profile, if available.

## How to use Auth0 Provider

By default, the project uses a mocked `JWT provider` (as in: it doesn't use an actual JWT based
authentication server). To make use of Amplify simply follow these steps:

### Step 1. Replace the provider

Open `src/index.js` file and replace the following line:

```js
import { AuthProvider } from './contexts/JWTContext';
```

with

```js
import { AuthProvider } from './contexts/Auth0Context';
```

### Step 2. Replace the hook context

Open `src/hooks/useAuth.js` file and replace the following line:

```js
import AuthContext from '../contexts/JWTContext';
```

with

```js
import AuthContext from '../contexts/Auth0Context';
```

## How to use auth

### Retrieve user profile

In the example below, you can find how it can be used in any component not just the `App`. Should
you want to use it in any other component, you'll have to import the `useAuth` hook and use it as
needed.

```jsx
import useAuth from './hooks/useAuth';

const App = () => {
    const { user } = useAuth();

    return (
      <div>
          Email: {user.email}
      </div>
    );
};
```

### Auth methods / actions

> For simplicity and space limitations, the code below is used only to exemplify, actual code can be found in the components.

```jsx
import useAuth from './hooks/useAuth';

const App = () => {
    const { login } = useAuth();

    return (
      <div>
          <Button onClick={() => login()}>Login</Button>
      </div>
    );
};
```

## Implemented flows

Currently, the app only covers the main flows:

- Login with popup (also used to register)
- Logout