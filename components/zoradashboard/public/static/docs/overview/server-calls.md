---
title: Server Calls
---

# Server Calls

The application simulates all server calls using in memory data storage. This can be easily modified
to connect to any server.

You can use any library you like. Most apps use [Axios](https://github.com/axios/axios) since it
allows you to create instances, attach interceptors, and many other features. Another
good alternative could be [Fetch](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API).

## Example of current implementation

```jsx
const Customers = () => {
  const [customers, setCustomers] = useState(null);

  useEffect(async () => {
    const result = await customerApi.getCustomers();
    setCustomers(result);
  }, []);

  return (
    <div>
      {/* render content */}
    </div>
  );
};
```

The `customerApi` is a singleton class instance that simply responds with a Promise. You can add as
many requests methods as you need, test request structure or even use as middleware between UI and
server request to process your input and output data.

## Example with Fetch

```jsx
const Customers = () => {
  const [customers, setCustomers] = useState(null);

  useEffect(async () => {
    const response = await fetch('/api/customers');
    const data = await response.json();
    setCustomers(data);
  }, []);

  return (
    <div>
      {/* render content */}
    </div>
  );
};
```

## Example with Axios

```jsx
import axios from 'axios'; // You need to install it

const Customers = () => {
  const [customers, setCustomers] = useState(null);

  useEffect(async () => {
    const response = await axios.get('/api/customers');
    setCustomers(response.data);
  }, []);

  return (
    <div>
      {/* render content */}
    </div>
  );
};
```

## Axios Request interceptors

By using Axios you are able to
integrate [Axios Mock Adapter](https://github.com/ctimmerm/axios-mock-adapter) to simulate real
server calls. To archive that, you have to create an Axios instance and use it whenever you make a
request call. Now you can extend your instance and add Axios Mock Adapter to listen for requests and
return custom data.

## Adding request interceptors

It takes ony a few seconds to add a new http request listener. The interceptor has a similar format
to Express JS, for example:

```js
import axios from 'axios';
import AxiosMockAdapter from 'axios-mock-adapter';

export const axiosInstance = axios.create();

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject((
    error.response && error.response.data
  ) || 'Something went wrong')
);

const mock = new AxiosMockAdapter(axiosInstance, { delayResponse: 0 });

mock.onGet('/__fakeApi__/invoices').reply(200, {
  invoices: [
    { id: 1, total: 32.43 },
    { id: 2, total: 67.00 }
  ]
});
```

Now instead of importing axios from `axios` node module, import the exported `axiosInstance` to
get the customers' data.

## Removing existing request interceptors

There are two ways:

1. Simply use a new axios instance.
2. Remove the mocked listeners.
