---
title: Deployment
---

# Deployment

## Building

`npm run build` creates a build directory with a production build of your app. Read more about this
functionality on the official Create React
App [docs website](https://create-react-app.dev/docs/available-scripts#npm-run-build).

## Hosting

Set up your favorite HTTP server to serve the entirety of the output build folder, or upload it
directly on a CDN platform. Point its default to `index.html` file.

## Local development

### Default script

`npm run dev` starts a local Webpack development server with hot-reload which registers every change
as they are saved in your files.

### Serve

For environments using NodeJS, the easiest way to handle this would be to install `serve`
[npm package](https://www.npmjs.com/package/serve) and let it handle the requests:

> Please note that `serve` **_can not_** and **_should not_** be used on production environments.

```shell
npm install -g serve
serve -s build
```

The last command shown above will serve your static site on the port `5000`. Like many of serve’s
internal settings, the port can be adjusted using the `-l` or `--listen` flags:

```shell
serve -s build -l 4000
```

Run this command to get a full column of the options available:

```shell
serve -h
```

### ExpressJS

Here’s a programmatic example using NodeJS and
Express [npm package](https://www.npmjs.com/package/express):

```js
const express = require('express');
const path = require('path');
const app = express();

app.use(express.static(path.join(__dirname, 'build')));
app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});
app.listen(9000);
```

The choice of your server software isn’t important either. Since Create React App is completely
platform-agnostic, there’s no need to explicitly use Node.

The build folder with static assets is the only output produced by Create React App.

### Netlify CLI

Netlify's command line interface (CLI) lets you deploy sites or configure continuous deployment
straight from the command line.

To install Netlify CLI, make sure you have Node.js version 8 or higher, then run this command from
any directory in your terminal:

```shell
npm install netlify-cli -g
```

It is possible to deploy a site manually, without continuous deployment. This platform uploads files
directly from your local project directory to your site on Netlify.

```shell
netlify deploy
```

The first time you run the command, Netlify CLI will prompt you to select an existing site or create
a new one, linking the site for all future deploys.

You will need to set up a redirect and rewrite rule for the single page app.

That redirect rule would look like this:

```shell
/*    /index.html   200
```

You can add redirect rules to the _redirects file or to your netlify.toml config file. For more
information on redirects on Netlify [checkout the docs](https://www.netlify.com/docs/redirects).

### Firebase Hosting

Using the Firebase CLI, you deploy files from local directories on your computer to your Hosting
server. Beyond serving static content, you can use Cloud Functions for Firebase or Cloud Run to
serve dynamic content and host microservices on your sites. Read more about it
from [official docs](https://firebase.google.com/docs/hosting).
