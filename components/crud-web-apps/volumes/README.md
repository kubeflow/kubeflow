# Volumes web app

This web app is responsible for allowing the user to manipulate PVCs in their Kubeflow cluster. To achieve this it provides a user friendly way to handle the lifecycle of PVC objects.

## Development

Requirements:
* node 12.0.0
* python 3.7

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
python3.7 -m pip install --user virtualenv
python3.7 -m venv web-apps-dev
source web-apps-dev/bin/activate

# install the deps on the activated virtual env
make -C backend install-deps

# run the backend
make -C backend run-dev
```
### Internationalization
Internationalization was implemented using [ngx-translate](https://github.com/ngx-translate/core).

This is based on the browser's language. If the browser detects a language that is not implemented in the application, it will default to English.

The i18n asset files are located under `frontend/src/assets/i18n`. One file is needed per language.

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
