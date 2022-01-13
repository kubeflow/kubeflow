---
title: Implementation
---

# Implementation

To control the navigation and linking between components the app uses `react-router`
, `react-router-dom` and `history` libraries.

The app uses a **programmatic routing model**. Its configuration can be found in `src/routes.js`
file, where you can modify it to match your preferences.

## Declarative routing model

```jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
};
```

## Programmatic routing model

```jsx
const App = () => {
  const content = useRoutes([
    { path: '/', element: <Home /> },
    { path: 'dashboard', element: <Dashboard /> },
  ]);

  return content;
};
```

> Note that `App` component must be inside the `BrowserRouter` component to be able to make use of `useRoutes` hook.

## Navigation

Navigation can be achieved in multiple ways, depending on your app needs. Under the hood, all
navigation strategies use the history provider.

### Navigation via link

```jsx
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div>
      <Link to="/dashboard">
        Go to Dashboard
      </Link>
    </div>
  );
};
```

### Navigation via hook

```jsx
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/dashboard');
  };

  return (
    <div>
      <button onClick={handleClick}>
        Go to Dashboard
      </button>
    </div>
  );
};
```

### Navigation via component

```jsx
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <Navigate to="/dashboard" />
  );
};
```
