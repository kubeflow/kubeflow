---
title: Analytics Configuration
---

# Configuration

## Create GTM account

In order to use the GTM platform, you need to create a GTM account. Read more about it
[here](https://support.google.com/tagmanager/answer/6103696?hl=en#install&zippy=%2Cweb-pages).

## Set up configuration options

The app uses environment variables because it can be deployed with different accounts
for `development`, `qa`, and `production`. This allows you to configure the GTM library differently
for each environment.

Open `.env` file (or create) in the project's root folder and set the
variable `REACT_APP_GTM_CONTAINER_ID` with the container ID provided by GTM platform.

```shell
REACT_APP_GTM_CONTAINER_ID=GTM-XXXXXX
```

If you do not want to set up environment variables, settings can be applied simply on
the `gtmConfig` object found in the `src/config.js` file.

```js
export const gtmConfig = {
    containerId: ''
};
```
