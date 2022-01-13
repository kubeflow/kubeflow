---
title: Role Based Guard
---

# Role Based Guard

Many apps have complex user interfaces and flows. Some might have a list of routes for specific user
roles or rights, such as admin, editor, content manager, etc, or even display a completely different
interface for the same route. If that's the case for your project, you may want to check whether the
user is authenticated their Access Control List (ACL)
This depends a lot on your business, and your chosen ACL implementation / provider.

Guarding is a concept that usually refers to route protection, but it can also be applied to
components, and instead of redirecting the user to another route, you can render a different
component.

## How it can be implemented

This guard is not created as there's no real way to know the actual business case, the needs, or the
strategy used in your specific app. Meanwhile, there are some standardized ACL strategies, there are
still too many of them and picking one is not fathomable in any way.

As an effect you can find below a suggestion on how it _could_ be implemented, should you want it.

In situations where various rights determine bits of the same UI, you may want to change the
redirection to either only display the functionality as disabled or simply not display it. The route
scenario is a much easier one.

```jsx
import { BrowserRouter, Routes } from 'react-router-dom';
import RoleBasedGuard from './components/RoleBasedGuard';
import Article from './pages/Article';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/articles/:id"
          element={(
            <RoleBasedGuard roles={['admin', 'editor']} rights={['edit', 'read']}>
              <Article />
            </RoleBasedGuard>
          )}
        />
      </Routes>
    </BrowserRouter>
  );
};
```
