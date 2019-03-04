# Kubeflow Landing-Page

This component is the dashboard for Kubeflow deployments. The front-end is
built with [Polymer 3](https://polymer-library.polymer-project.org/3.0/docs/about_30)
web components and the back-end is a NodeJS Express server written in
TypeScript.

## Getting Started

For development, follow these steps to set up a development environment with
hot-module reloading:
- Clone the repo
- `cd` to this component on the repo (*components/centraldashboard*)
- Ensure that you have `node` and `npm` installed and then run `npm install`
- To start a development environment, run `npm run dev`.
  - This runs [webpack](https://webpack.js.org/) over the front-end code in
    the [public](./public) folder and starts the
    [webpack-dev-server](https://webpack.js.org/configuration/dev-server/) at
    http://localhost:8081.
  - It also starts the Express API server at http://localhost:8082. Requests
    from the front-end starting with `/api` are proxied to the Express server.

### Front-End Components

All Polymer components should be written under the [public/components](./public/components)
directory. You may use the [inline style](https://polymer-library.polymer-project.org/3.0/docs/first-element/step-2)
for creating your Shadow DOM, or seperate your CSS and HTML in seperate files.
We currently support [Pug](https://pugjs.org/api/getting-started.html)
templating for external markup. See [main-page.js](public/components/main-page.js)
for an example.

## Building for Production

Run `npm run build && npm start`. This packages the project for production
and serves both the front-end and API server on Express at
http://localhost:8082.
