---
title: Environment Variables
---

# Environment Variables

By default, Create React App configuration looks for `.env` file in projects root folder and reads
its content. In the project files you'll find a file `.env.example` that contains all the
environment variables that were used in the app environment. **Not all are required.**

You must create custom environment variables beginning with `REACT_APP_`. Any other variables
except `NODE_ENV` will be ignored to avoid accidentally exposing a private key on the machine that
could have the same name. Changing any environment variables will require you to restart the
development server if it is running.

> WARNING: Do not store any secrets (such as private API keys or passwords) in your React app!
> Environment variables are embedded into the build, meaning anyone can view them by inspecting your app's files.

Having access to the `NODE_ENV` is also useful for performing actions conditionally:

```js
if (process.env.NODE_ENV !== 'production') {
  analytics.disable();
}
```

Read more about environment
variables [here](https://create-react-app.dev/docs/adding-custom-environment-variables).
