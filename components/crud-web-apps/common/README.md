# Common code for CRUD web apps

Since our CRUD web apps like the Jupyter, Tensorboards and Volumes UIs are similarly build with Angular and Python/Flask we should factor the common code in to modules and libraries.

This directory will contain:

1. A Python package with a base backend. Each one of the mentioned apps are supposed to extend this backend.
2. An Angular library that will contain the common frontend code that these apps will be sharing

## Backend

The backend will be exposing a base backend which will be taking care of:

* Serving the Single Page Application
* Adding liveness/readiness probes
* Authentication based on the `kubeflow-userid` header
* Authorization using SubjectAccessReviews
* Uniform logging
* Exceptions handling
* Common helper functions for dates, yaml file parsing etc.
* Providing Prometheus metrics

### Supported ENV Vars

The following is a list of ENV var that can be set for any web app that is using this base app.
This is list is incomplete, we will be adding more variables in the future.

| ENV Var | Description |
| - | - |
| CSRF_SAMESITE | Controls the [SameSite value](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Set-Cookie#SameSite) of the CSRF cookie |
| METRICS | Enable the exporting of Prometheus metrics on `/metrics` path |

### How to use

In order to use this code during the development process one could use the `-e` [flag](https://pip.pypa.io/en/stable/reference/pip_install/#install-editable) with `pip install`. For example:

```bash
# I'm currently in /components/crud-web-apps/volumes/backend
cd ../../common/backend && pip install -e .
```

This will install all the dependencies of the package and you will now be able to include code from `kubeflow.kubeflow.crud_backend` in you current Python environment.

In order to build a Docker image and use this code you coud build a wheel and then install it:

```dockerfile
### Docker
FROM python:3.7 AS backend-kubeflow-wheel

WORKDIR /src
COPY ./components/crud-web-apps/common/backend .

RUN python3 setup.py bdist_wheel

...
# Web App
FROM python:3.7

WORKDIR /package
COPY --from=backend-kubeflow-wheel /src .
RUN pip3 install .
...
```

### Metrics

The following metrics are exported:

flask_http_request_duration_seconds (Histogram)
flask_http_request_total (Counter)
flask_http_request_exceptions_total (Counter)
flask_exporter_info (Gauge)

For more information visit the [prometheus_flask_exporter](https://github.com/rycus86/prometheus_flask_exporter).

## Frontend

The common Angular library contains common code for:

* Communicating with the Central Dashboard to handle the Namespace selection
* Making http calls and handing their errors
* Surfacing errors and warnings
* Polling mechanisms
* Universal styling accross the different web apps
* Handling forms

### How to use

```bash
# build the common library
cd common/frontend/kubeflow-common-lib
npm i
npm run build

# for development link the created module to the app
cd dist/kubeflow
npm link

# navigate to the corresponding app's frontend
cd crud-web-apps/volumes/frontend
npm i
npm link kubeflow
```

### Common errors

```
NullInjectorError: StaticInjectorError(AppModule)[ApplicationRef -> NgZone]:
  StaticInjectorError(Platform: core)[ApplicationRef -> NgZone]:
    NullInjectorError: No provider for NgZone!
```

You also need to add `"preserveSymlinks": true` to the app's frontend `angular.json` at `projects.frontend.architect.build.options`.

### Docker

```dockerfile
# --- Build the frontend kubeflow library ---
FROM node:12 as frontend-kubeflow-lib

WORKDIR /src

COPY ./components/crud-web-apps/common/frontend/kubeflow-common-lib/package*.json ./
RUN npm install

COPY ./components/crud-web-apps/common/frontend/kubeflow-common-lib/ .
RUN npm run build

...
# --- Build the frontend ---
FROM node:12 as frontend
RUN npm install -g @angular/cli

WORKDIR /src
COPY ./components/crud-web-apps/volumes/frontend/package*.json ./
RUN npm install
COPY --from=frontend-kubeflow-lib /src/dist/kubeflow/ ./node_modules/kubeflow/

COPY ./components/crud-web-apps/volumes/frontend/ .

RUN npm run build -- --output-path=./dist/default --configuration=production
```

### Internationalization

Internationalization was implemented using [ngx-translate](https://github.com/ngx-translate/core).

This is based on the browser's language. If the browser detects a language that is not implemented in the application, it will default to English.

The i18n asset files are located under `frontend/src/assets/i18n` of each application (jupyter, volumes and tensorboard). One file is needed per language. The common project is duplicated in every asset.

The translation asset files are set in the `app.module.ts`, which should not be needed to modify.
The translation default language is set in the `app.component.ts`.

For each language added, `app.component.ts` will need to be updated.

**When a language is added:**

- Copy the en.json file and rename is to the language you want to add. As it currently is, the culture should not be included.
- Change the values to the translated ones

**When a translation is added or modified:**

- Choose an appropriate key
- Make sure to add the key in every language file
- If text is added/modified in the Common Project, it needs to be added/modified in the other applications as well.

**Testing**

To test the i18n works as expected, simply change your browser's language to whichever language you want to test.  
