---
title: Guest Guard
---

# Guest Guard

There are some situations when you want to make a route visible exclusively for users that are not
authenticated, such as
`/authentication/register`, `/authentication/login`, etc. For such situations, the app provides you
with a sample `GuestGuard` component that can be used to make the provided child components redirect
to a certain (currently `/dashboard/account`) route. Should you want to modify said route you can do
so by modifying the `GuestGuard` component. There was no need to make a more complex logic for this
GuestGuard component, as the business logic needed for your specific app might need a different
approach regardless.

## Example

```jsx
import { BrowserRouter, Routes } from 'react-router-dom';
import GuestGuard from './components/GuestGuard';
import Login from './pages/authentication/Login';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/authentication/login"
          element={(
            <GuestGuard>
              <Login />
            </GuestGuard>
          )}
        />
      </Routes>
    </BrowserRouter>
  );
};
```

## How it works

It connects with the authentication provider (Amplify, Auth0, Firebase, or JWT, depending on your
setup) and extracts the required data to detect whether it can render the children passed as props,
otherwise it redirects the user to the `/dashboard/account` route.
