---
title: Event tracking
---

# Event tracking

By default, the GTM library's push platform captures the browser location data, such as url,
pathname, title, and other details. You can extend it to match your business needs. For example, you
may need the event name, site section, campaign name, product name, price, process step, etc.

## Page view

```jsx
import { useEffect } from 'react';
import gtm from './lib/gtm';

const Login = () => {
  useEffect(() => {
    gtm.push({ event: 'page_view' });
  }, []);

  return (
    <div>
      content
    </div>
  );
};
```

This example shows you how to track the page view event once the page component gets mounted. It can
also be used on mounting virtual pages, such as modals, dialogs, etc.

## Other action

```jsx
import gtm from './lib/gtm';

const App = () => {
  const handleAddToCart = () => {
    gtm.push({
      event: 'add_to_cart',
      price: '317,65',
      currency: 'EUR',
      name: 'Dell Monitor 27"'
    });
  };

  return (
    <div>
      <div>Dell Monitor 27"</div>
      <div>EUR 317,65</div>
      <button onClick={handleAddToCart}>Add to cart</button>
    </div>
  );
};
```

As it can be seen, this example has multiple variables to help you identify the product that was
added to cart and its price. These are called conversion variables in most systems, and they are
used to determine the user behaviour after visiting a specific page or site section. If the user
does not complete the checkout process, you are able to identify most products added to the cart,
and make decisions based on metrics.
