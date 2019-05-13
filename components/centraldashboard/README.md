# Kubeflow Landing-Page

This component serves as the landing page and central dashboard for Kubeflow
deployments. It provides a jump-off point to all other facets of the platform.

## Building and Deploying

The build artifact of this folder is a Docker container image that hosts the
Express webserver that serves the API endpoints and front-end application code.

To build a new container image, run `make` from within this directory. To push
it to the kubeflow-images-public repository, run `make push`.

### Testing a build in an existing Kubeflow deployment

After running `make push`, make note of the tag created.

```
Pushed gcr.io/kubeflow-images-public/centraldashboard with :v20190328-v0.4.0-rc.1-280-g8563142d-dirty-319cfe tags
```

Then, use **kubectl** to update the image on the existing Central Dashboard
deployment, specifying the image name and tag that was output in the step above.

```
kubectl --record deployment.apps/centraldashboard \
    set image deployment.v1.apps/centraldashboard \
    centraldashboard=gcr.io/kubeflow-images-public/centraldashboard:v20190328-v0.4.0-rc.1-280-g8563142d-dirty-319cfe
```

## Development

### Getting Started
Make sure you have the latest LTS version of `node` installed along with `npm`.

1. Clone the repository and change directories to `components/centraldashboard`
2. Run `make build-local`. This will install all of the project dependencies and
   prepare your system for development.
3. To start a development environment, run `npm run dev`.
    - This runs [webpack](https://webpack.js.org/) over the front-end code in
      the [public](./public) folder and starts the
      [webpack-dev-server](https://webpack.js.org/configuration/dev-server/) at
      http://localhost:8081.
    - It also starts the Express API server at http://localhost:8082. Requests
      from the front-end starting with `/api` are proxied to the Express
      server. All other requests are handled by the front-end server which
      mirrors the production configuration.

### Server Components

Server side code resides in the [app](./app) directory. The server uses
[Express](https://expressjs.com/) and is written in [Typescript](https://www.typescriptlang.org/docs/home.html).

### Front-End Components

Client side code resides in the [public](./public) directory. Client components
are written using the [Polymer 3](https://polymer-library.polymer-project.org/3.0/docs/about_30)
web components library. All Polymer components should be written under the
[public/components](./public/components) directory. You may use the [inline style](https://polymer-library.polymer-project.org/3.0/docs/first-element/step-2) for creating your Shadow DOM, or seperate your
CSS and HTML in seperate files. We currently support [Pug](https://pugjs.org/api/getting-started.html)
templating for external markup. See [main-page.js](public/components/main-page.js)
for an example.

### Testing

When introducing new changes, you should ensure that your code is tested. By
convention, tests should reside in the same directory as the code under test and
be named with the suffix `_test.(js|ts)`. For a module named
`new-fancy-component.js`, its test should be in a file named `new-fancy-component_test.js`.

Both server and client-side unit tests are written using [Jasmine](https://jasmine.github.io/api/3.3/global).
Client-side tests are run with Karma using headless Chrome by default.

#### Code Coverage

To run unit tests and collect coverage, run `npm run coverage`. This will output
coverage statistics on the console and also create subfolders for `app` and
`public` inside of the `coverage` folder with interactive displays of the code
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

Name | Value | Usage
--- | --- | ---
`--accent-color` | #007dfc | Should be used to highlight Action Buttons, borders, FABs
`-kubeflow-color` | #003c75 | The primary background color for Kubeflow CentralDashboard
`--primary-background-color` | #2196f3 | Used as the background color for all navigation elements (Toolbars, FOBs)
`--sidebar-color` | #f8fafb | Background Color for Sub-App Sidebar
`--border-color` | #f4f4f6 | All borders on the page

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
  <link rel='stylesheet' href='kubeflow-palette.css'>
```

And then in your stylesheets you can use your palette variables like:

```css
body > .Main-Toolbar {background-color: var(--primary-background-color)}
.List > .item:not(:first-of-type) {border-top: 1px solid var(--border-color)}
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

```
window.addEventListener('DOMContentLoaded', function (event) {
    if (window.centraldashboard.CentralDashboardEventHandler) {
        // Init method will invoke the callback with the event handler instance
        // and a boolean indicating whether the page is iframed or not
        window.centraldashboard.CentralDashboardEventHandler
            .init(function (cdeh, isIframed) {
                var namespaceSelector = document.getElementById('ns-select');
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
