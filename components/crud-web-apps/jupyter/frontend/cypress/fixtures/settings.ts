export const settings = {
  // namespace to create test Notebooks in
  namespace: 'default',

  // POST/PATCH/PUT/DELETE requests will need these headers since we are
  // using the double submit cookie CSRF mechanism
  postHeaders: {
    'X-XSRF-Token': 'asdf',
    Cookie: 'XSRF-TOKEN=asdf',
  },
};
