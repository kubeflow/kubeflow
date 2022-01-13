---
title: Code Splitting
---

# Code Splitting

This feature is guaranteed by the `Suspense` React component as documented in the official React
[documentation](https://reactjs.org/docs/react-api.html#suspense).

```jsx
import { Suspense } from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';

const Dashboard = lazy(() => import('./pages/Dashboard'));

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="dashboard"
          element={(
            <Suspense fallback={<div>Loading...</div>}>
              <Dashboard />
            </Suspense>
          )}
        />
      </Routes>
    </BrowserRouter>
  );
};
```

Usually code splitting is used to alleviate the time to interactive time through the use of
[dynamic import](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import)
. Code splitting also works for programmatic routing model.
