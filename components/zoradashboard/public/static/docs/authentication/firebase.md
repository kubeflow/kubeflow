---
title: Firebase
---

# Firebase

Firebase is a complete set of solutions, from Analytics to Cloud Functions. In the app at hand, only
the authentication service is used, although you can decide to use more of their features. Please
refer to their [documentation](https://firebase.google.com/docs)
as you deem necessary.

## Set up your Firebase account

The documentation for this, can be found in the official documentation of the service, mentioned
above.

## Configuration

To configure Firebase client library you have to open (or create) `.env` file in the project's root
folder and set the following variables as presented in your Firebase account settings:

```shell
REACT_APP_FIREBASE_API_KEY=
REACT_APP_FIREBASE_APP_ID=
REACT_APP_FIREBASE_AUTH_DOMAIN=
REACT_APP_FIREBASE_DATABASE_URL=
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=
REACT_APP_FIREBASE_PROJECT_ID=
REACT_APP_FIREBASE_STORAGE_BUCKET=
```

If you do not want to set up environment variables, settings can be applied simply on
the `firebaseConfig` object found in the `src/config.js` file.

```js
export const firebaseConfig = {
    apiKey: '',
    appId: '',
    authDomain: '',
    databaseURL: '',
    messagingSenderId: '',
    projectId: '',
    storageBucket: ''
};
```

## How it was implemented

As mentioned above, Amplify offers a set of components to help your development process, although
they're not used in the app.

The `firebase.auth` factory from the library is used to create and provide the authentication
feature to a context (which wraps the `App`).

This aforementioned context is then used in the component tree to access the `Auth` public methods.
It provides the user authentication status and user profile, if available.

## How to use Firebase Auth Provider

By default, the project uses a mocked `JWT provider` (as in: it doesn't use an actual JWT based
authentication server). To make use of Amplify simply follow these steps:

### Step 1. Replace the provider

Open `src/index.js` file and replace the following line:

```js
import { AuthProvider } from './contexts/JWTContext';
```

with

```js
import { AuthProvider } from './contexts/FirebaseContext';
```

### Step 2. Replace the hook context

Open `src/hooks/useAuth.js` file and replace the following line:

```js
import AuthContext from '../contexts/JWTContext';
```

with

```js
import AuthContext from '../contexts/FirebaseContext';
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

- Create user with email and password
- Sign in with email and password
- Sign in with popup (Google)
- Logout
