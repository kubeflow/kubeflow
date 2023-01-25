# Kubeflow Landing-Page

This component serves as the landing page and central dashboard for Kubeflow
deployments. It provides a jump-off point to all other facets of the platform.

## Building and Deploying

wip-placeholder

### Testing a build in an existing Kubeflow deployment

wip-placeholder

## Development

### Getting Started

Make sure you have and use the proper version of `node` installed along with `npm` for this component (See Dockerfile). First, clone the repository and change directories to `components/centraldashboard`

### Backend

Backend server side code resides in the [backend](./backend) directory. The server uses
[Express](https://expressjs.com/) and is written in [Typescript](https://www.typescriptlang.org/docs/home.html). To run the backend server locally

```
cd components/centraldashboard-angular/backend
npm i
npm run backend
```

This starts the Express API server at http://localhost:8082. Requests from the front-end starting with `/api` are proxied to the Express server. All other requests are handled by the front-end server which mirrors the production configuration.

### Frontend

```bash
cd components/centraldashboard-angular/frontend
npm i
npm run serve
```

This installs all dependencies and serves the frontend at http://localhost:4200.

### Access Kubernetes services

- To access the Profiles KFAM service: `kubectl port-forward -n kubeflow svc/profiles-kfam 8081:8081`
- To access the Jupyter Web App run: `kubectl port-forward -n kubeflow svc/jupyter-web-app-service 8085:80`.
- To access the Pipeline Web App run: `kubectl port-forward -n kubeflow svc/ml-pipeline-ui 8086:80`.`
- To access the Volumes Web App run: `kubectl port-forward -n kubeflow svc/volumes-web-app-service 8087:80`.`

This forwards requests to Kubernetes services from `http://localhost:service-proxy-port`. See the [proxy config file](frontend/proxy.conf.json) for more details.

### Testing

When introducing new changes, you should ensure that your code is tested. By
convention, tests should reside in the same directory as the code under test and
be named with the suffix `_test.(js|ts)`. For a module named
`new-fancy-component.js`, its test should be in a file named `new-fancy-component_test.js`.

Backend server unit tests are written using [Jasmine](https://jasmine.github.io/api/3.3/global).

#### Code Coverage

To run unit tests and collect coverage, run `npm run coverage`. This will output
coverage statistics on the console and also create subfolders for `app` inside of the `coverage` folder with interactive displays of the code
coverage. Please try to strive for high levels of coverage for sections of your
code with business logic.

---

## Style-Guide

Kubeflow central dashboard is a visualization and networking platform that links
fellow sub-apps within the Kubeflow Ecosystem together. As a result we have
various web-apps that are iframed within the app. To keep this experience
uniform, we have a style guide for all Kubeflow Integrators to follow / use.

### Approach

The CSS palette is found at [_public/kubeflow-palette.css_](public/kubeflow-palette.css).
When deployed to a cluster, it can be imported from `cluster-host/kubeflow-palette.css`

| Name                         | Value   | Usage                                                                     |
| ---------------------------- | ------- | ------------------------------------------------------------------------- |
| `--accent-color`             | #007dfc | Should be used to highlight Action Buttons, borders, FABs                 |
| `-kubeflow-color`            | #003c75 | The primary background color for Kubeflow CentralDashboard                |
| `--primary-background-color` | #2196f3 | Used as the background color for all navigation elements (Toolbars, FOBs) |
| `--sidebar-color`            | #f8fafb | Background Color for Sub-App Sidebar                                      |
| `--border-color`             | #f4f4f6 | All borders on the page                                                   |

_**Note:** This style-guide is subject to change, and will eventually be served as a CDN, so eventually manual updates will not be required._

### General Principles

- Follow the Material Design 2 Spec, when possible
- Elevations should match the [_**MD2 Elevation Spec**_](https://material.io/design/environment/elevation.html)
- The subapp should not mention namespaces, and should use the value provided by the Central Dashboard.

### Usage

Download the [_**styleguide**_](public/kubeflow-palette.css). And then in your html, import it like:

```html
<head>
  <!-- Meta tags / etc -->
  <link rel="stylesheet" href="kubeflow-palette.css" />
</head>
```

And then in your stylesheets you can use your palette variables like:

```css
body > .Main-Toolbar {
  background-color: var(--primary-background-color);
}
.List > .item:not(:first-of-type) {
  border-top: 1px solid var(--border-color);
}
/* etc */
```

## Client-Side Library

Since the Central Dashboard wraps other Kubeflow components in an iframe, a
standalone Javascript library is exposed to make it possible to communicate
between the child pages and the dashboard.

The library is available for import from `/dashboard_lib.bundle.js` within the
cluster. When imported in this manner, a `centraldashboard` module is created in
the global scope. To establish a channel for communication between the iframed
page and the Dashboard, use the following example which would disable a
`<select>` element and assign the value from the Dashboard's Namespace selector
when it changes:

```js
window.addEventListener("DOMContentLoaded", function (event) {
  if (window.centraldashboard.CentralDashboardEventHandler) {
    // Init method will invoke the callback with the event handler instance
    // and a boolean indicating whether the page is iframed or not
    window.centraldashboard.CentralDashboardEventHandler.init(function (
      cdeh,
      isIframed
    ) {
      var namespaceSelector = document.getElementById("ns-select");
      namespaceSelector.disabled = isIframed;
      // Binds a callback that gets invoked anytime the Dashboard's
      // namespace is changed
      cdeh.onNamespaceSelected = function (namespace) {
        namespaceSelector.value = namespace;
      };
    });
  }
});
```
