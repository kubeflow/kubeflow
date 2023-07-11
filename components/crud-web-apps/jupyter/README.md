# Jupyter web app

This web app is responsible for allowing the user to manipulate the Jupyter Notebooks in their Kubeflow cluster. To achieve this it provides a user friendly way to handle the lifecycle of Notebook CRs.

## Image Groups

With the release of Kubeflow 1.3, two types have Notebook Servers have been added
alongside the familiar JupyterLab:

- Group 1
- Group 2

Some extra configurations are applied Notebook Servers belonging to these groups:

The annotation `notebooks.kubeflow.org/http-rewrite-uri: /` is added to Notebook
resources of both groups. This configures Istio to rewrite the URI to `/` on
the container. This is useful for applications which host their on `/`
and do not allow you to change the URI subpath easily.

The annotation `notebooks.kubeflow.org/http-headers-request-set:`
`'{"X-RStudio-Root-Path":"/notebook/<namespace>/<name>/"}'` is added to
Notebook resources belonging to Group 2. This configures Istio to add
this header to requests, which is necessary for images from Group 2 to work.

The Jupyter Web App displays the logos for each Notebook Server group
in a button toggle in the Spawner UI. To easily identify the group of
a running Notebook Server, the Index page contains a column that displays
the icon for each image group. The SVG logos and icons for each group are added
with a [configmap](./manifests/base/configs/logos-configmap.yaml) to make it easy for users to customize the logos and icons for their environment.

## Development

Requirements:
* node 12.0.0
* python 3.8

### Frontend

__Build the common library:__

```bash
cd components/crud-web-apps/common/frontend/kubeflow-common-lib
npm i
npm run build
cd dist/kubeflow
npm link
```

__Build the app frontend:__

```bash
cd components/crud-web-apps/jupyter/frontend
npm i
npm link kubeflow
npm run build:watch
```

### Backend

__Build the app backend:__

```bash
cd components/crud-web-apps/jupyter

# create a virtual env and install deps
# https://packaging.python.org/guides/installing-using-pip-and-virtual-environments/
python3.8 -m pip install --user virtualenv
python3.8 -m venv web-apps-dev
source web-apps-dev/bin/activate

# install the deps on the activated virtual env
make -C backend install-deps

# run the backend
# NOTE: if your on MacOS, you might need to disable "AirPlay Receiver" as this uses port 5000
#       https://developer.apple.com/forums/thread/682332
make -C backend run-dev
```

### Internationalization

Support for non-English languages is only supported in a best effort way.

Internationalization(i18n) was implemented using [Angular's i18n](https://angular.io/guide/i18n)
guide and practices, in the frontend. You can use the following methods to
ensure the text of the app will be localized:
1. `i18n` attribute in html elements, if the node's text should be translated
2. `i18n-{attribute}` in an html element, if the element's attribute should be
   translated
3. [$localize](https://angular.io/api/localize/init/$localize) to mark text in
   TypeScript variables that should be translated

The file for the English text is located under `i18n/messages.xlf` and other
languages under their respective locale folder, i.e. `i18n/fr/messages.fr.xfl`.
Each language's folder, aside from English, should have a distinct and up to
date OWNERs file that reflects the maintainers of that language.

**Testing**

You can run a different translation of the app, locally, by running
```bash
ng serve --configuration=fr
```

You must also ensure that the backend is running, since Angular's dev server
will be proxying request to the backend at `localhost:5000`.

## E2E Tests

To run the tests locally users will need to:
```bash
# navigate to the frontend and make sure the node modules are installed
cd frontend
npm i
# ensure the backend is running and serving the files under localhost:5000
# you can run the backend with: make run-dev
# run the tests
npm run e2e
```
