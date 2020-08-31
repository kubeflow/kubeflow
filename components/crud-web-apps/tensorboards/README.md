# GSoC 2020 - TENSORBOARD WEB-APP

## RUN TENSORBOARD WEB-APP LOCALLY

#### Prequisites to run the BACKEND locally:

1. Python 3.8

### Run the BACKEND:

1. Clone the repository 

2. Change directories to `components/crud-web-apps/tensorboards/backend`

3. Create and activate a Python virtual environment

3. Run: `make install-deps` to install backend dependencies inside the virtual environment

4. Run: `make run-dev` to run the backend locally

#### Prequisites to run the FRONTEND locally:

1. NodeJS 12

2. npm

3. Angular CLI 8.3.20

### Run the FRONTEND:

1. Change directories to `components/crud-web-apps/common/frontend/kubeflow-common-lib`

2. Run: `npm run build` το build the necessary `kubeflow` module and then change directories to the child directory `dist/kubeflow`

3. Run: `npm link` 

4. Change directories to `components/crud-web-apps/tensorboards/frontend`

5. Run: `npm install` to install the dependencies needed

6. Run: `npm link kubeflow` to link the `kubeflow` module to the frontend

#### To use the whole app, you will also need to run the [Tensorboard Controller](https://github.com/kandrio98/kubeflow/blob/master/components/tensorboard-controller/README.md).

- The UI of the TWA is simple and intuitive

![Index Page](https://github.com/kandrio98/kubeflow/blob/pictures-branch/components/crud-web-apps/tensorboards/pictures/index_page.png?raw=true)

- It follows the style of the Jupyter web-app

![Create Form](https://github.com/kandrio98/kubeflow/blob/pictures-branch/components/crud-web-apps/tensorboards/pictures/create_tensorboard_form.png?raw=true)
- You can create, delete, list Tensorboard CRs and connect to Tensorboard servers to visualize your logs

![Delete Tensorboard](https://github.com/kandrio98/kubeflow/blob/pictures-branch/components/crud-web-apps/tensorboards/pictures/delete_tensorboard_dialog.png?raw=true)

Since the TWA is not yet fully integrated with Kubeflow, in order to connect to a created Tensorboard server, you can:
1. Run: `kubectl port-forward svc/istio-ingressgateway -n istio-system 8000:80`
2. Go to: `localhost:8000` to login to Kubeflow
3. Change to: `localhost:8000/tensorboard/namespace/name/` in order to visualize your logs, where `name` and `namespace` are the metadata of the Tensorboard CR

![Tensorboard Server](https://github.com/kandrio98/kubeflow/blob/pictures-branch/components/crud-web-apps/tensorboards/pictures/tensorboard_server.png?raw=true)

## BUILD TENSORBOARD WEB-APP IMAGE

### Prequisites to build the image:

1. Docker

### Build the image:

1. Change directories to `components/crud-web-apps/tensorboards`

2. Run: `make image IMG=YOUR_REPO VER=YOUR_VERSION`