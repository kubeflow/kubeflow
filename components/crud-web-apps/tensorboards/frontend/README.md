# Frontend

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 8.3.20.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running UI tests

To run UI tests locally, make sure that node modules are installed and the frontend is serving the UI under `localhost:4200`. Then use `npm run ui-test` to execute the UI tests via [Cypress](https://www.cypress.io/). This will open Cypress and from there you may select the browser in which the tests will run.

Ideally, tests should be run both in Chrome and Firefox and for that there is the script `npm run ui-test-ci-all` that `runs` (instead of `opening`) Cypress. Note that in order for tests to run in a browser, the browser needs to be already installed on the system.S

Make sure to check out these guides for system-specific information on installing and running Cypress

- https://docs.cypress.io/guides/getting-started/installing-cypress
- https://docs.cypress.io/guides/references/advanced-installation

### WSL2

In order to be run in a WSL2 installation, Cypress requires these [dependencies](https://docs.cypress.io/guides/getting-started/installing-cypress#Linux-Prerequisites).

In the case of WSL2 on _Windows 10_, [this extra setup](https://docs.cypress.io/guides/references/advanced-installation#Windows-Subsystem-for-Linux) is required in order to have an X Server running in Windows host and creating the browser window.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI documents](https://angular.io/cli).
