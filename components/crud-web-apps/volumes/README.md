# Volumes web app

This web app is responsible for allowing the user to manipulate PVCs in their Kubeflow cluster. To achieve this it provides a user friendly way to handle the lifecycle of PVC objects.

## Development

Requirements:
* node 16.20.2
* python 3.8

### Frontend

```bash
# build the common library
cd components/crud-web-apps/common/frontend/kubeflow-common-lib
npm i
npm run build
cd dist/kubeflow
npm link

# build the app frontend
cd ../../../volumes/frontend
npm i
npm link kubeflow
npm run build:watch
```

### Backend
```bash
# create a virtual env and install deps
# https://packaging.python.org/guides/installing-using-pip-and-virtual-environments/
cd component/crud-web-apps/volumes/backend
python3.8 -m pip install --user virtualenv
python3.8 -m venv web-apps-dev
source web-apps-dev/bin/activate

# install the deps on the activated virtual env
make -C backend install-deps

# run the backend
make -C backend run-dev
```

### internationalization
support for non-english languages is only supported in a best effort way.

internationalization(i18n) was implemented using [angular's i18n](https://angular.io/guide/i18n)
guide and practices, in the frontend. you can use the following methods to
ensure the text of the app will be localized:
1. `i18n` attribute in html elements, if the node's text should be translated
2. `i18n-{attribute}` in an html element, if the element's attribute should be
   translated
3. [$localize](https://angular.io/api/localize/init/$localize) to mark text in
   typescript variables that should be translated

the file for the english text is located under `i18n/messages.xlf` and other
languages under their respective locale folder, i.e. `i18n/fr/messages.fr.xfl`.
each language's folder, aside from english, should have a distinct and up to
date owners file that reflects the maintainers of that language.

**testing**

you can run a different translation of the app, locally, by running
```bash
ng serve --configuration=fr
```

you must also ensure that the backend is running, since angular's dev server
will be proxying request to the backend at `localhost:5000`.
