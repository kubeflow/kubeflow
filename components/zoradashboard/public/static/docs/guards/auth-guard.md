---
title: Auth Guard
---

# Auth Guard

This is a simple component that can be used to protect a private route. It controls whether it
should allow navigation to a requested route based on given context.

## Example

```jsx
import { BrowserRouter, Routes } from 'react-router-dom';
import AuthGuard from './components/AuthGuard';
import Dashboard from './pages/Dashboard';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/dashboard"
          element={(
            <AuthGuard>
              <Dashboard />
            </AuthGuard>
          )}
        />
      </Routes>
    </BrowserRouter>
  );
};
```

## How it works

It connects with the authentication provider (Amplify, Auth0, Firebase, or JWT, depending on your
setup) and extracts the required data to detect whether it should render the children passed as
props, otherwise it renders the `Login` component.

This is done so that the user can access private routes, or login on the rendered `Login` component.
On a successful login, the component renders the correct component as necessary. Usually this
behaviour is named `Deep Linking`.

## How it can be extended

As mentioned, this is a sample component, thus it can and should be adjusted to match your business
needs.

## Caution

Most client apps migrated to JSON Web Tokens (JWT), and if you decided to have this platform, there
are some cases where you want to ensure that the token did not expire between multiple page
navigations.

Auth clients usually invalidate the **access token** after a `401` status code received, and this
has to be connected with the http client. In an SPA the page content (or some of it) exists on the
client, and gets populated using server requests after accessing the page route. This means that you
may have the following scenario:

1. User navigates to `/` (home page)
2. User navigates to `/dashboard/analytics` (private page)
3. `AuthGuard` connects with the `AuthProvider`
4. `AuthGuard` allows the navigation because user is authenticated
5. `Analytics` component starts rendering and begins making its data requests
6. The http client connects with the server and starts populating `Analytics` component data via
   multiple async requests.
7. The **access token** expires during the requests (maybe because the **refresh token** has not
   succeeded)
8. The `Analytics` component starts rendering some of the data as it becomes available, but ...
9. Once one of the requests fails, and receives a `401` status code, the AuthGuard is updated with
   the user login status.
10. The user should be automatically redirected to the login screen mid loading session.

To offer a good user experience to your customers you may want to make some extra checks, and ensure
as soon as possible the various authentication status changes, depending on your security and / or
business needs.
