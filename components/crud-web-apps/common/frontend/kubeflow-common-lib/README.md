# Kubeflow Common Frontend Library

This code provides a common library of reusable Angular Components that can be used from our different Kubeflow web apps. This library aims to:
* Enforce a common UX throughout the different apps
* Reduce the development effort required to propagate changes to all the web apps
* Minimize the code duplication between our Kubeflow web apps

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 8.3.20, which is required to build and run the unit tests.

## Local development
In order to use this library while developing locally your Angular app you will need to:
1. Build the `kubeflow` node module from this source code
2. Link the produced module to your global npm modules
3. Link the `kubeflow` module in the npm modules of you app

### Building the library locally
```bash
# build the npm module
npm run build

# might need sudo, depending on where you global folder lives
# https://nodejs.dev/learn/where-does-npm-install-the-packages
npm link dist/kubeflow
```
### Linking it to the app
```bash
cd ${APP_DIR}
npm install
npm link kubeflow
```

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Contributor Guidelines

### Unit tests
1. Any new component added to this library should also include some basic unit tests
2. The unit tests should be passing at any point of time

### Git commits
Git commits that modify this code should be prefixed with `web-apps(front)`.
