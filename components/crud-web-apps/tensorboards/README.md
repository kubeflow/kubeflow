# GSoC 2020 - Tensorboard web-app

This part of the project entails the [code for the FRONTEND and BACKEND](https://github.com/kubeflow/kubeflow/tree/master/components/crud-web-apps/tensorboards) of the Tensorboard web-app. The project also entailed extending the Tensorboard controller to support RWO PVCs as log storages for Tensorboard servers. You can find the code for the Tensorboard controller [here](https://github.com/kubeflow/kubeflow/tree/master/components/tensorboard-controller), and you can also find the corresponding documentation [here](https://github.com/kubeflow/kubeflow/blob/master/components/tensorboard-controller/README.md).


## Run Tensorboard web-app locally

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

7. Run: `ng serve`

#### To use the whole app, you will also need to run the [Tensorboard Controller](https://github.com/kubeflow/kubeflow/blob/master/components/tensorboard-controller/README.md).

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

## Build Tensorboard web-app image

### Prequisites to build the image:

1. Docker

### Build the image:

1. Change directories to `components/crud-web-apps/tensorboards`

2. Run: `make image IMG=YOUR_REPO VER=YOUR_VERSION`

# Challenges of the project

Due to the nature of this project, which entailed the development of 3 major parts of the TWA (controller, backend and frontend), we faced a lot of difficulties during the summer. These mainly included building errors and library code malfunctions. Kimonas and Ilias, my mentors, were really helpful as the always provided feedback and made sure I was moving towards the right direction.

In addition, the covid-19 pandemic greatly affected my work schedule as my college exams were pushed forward in the summer and scheduled in July, which was a crucial month for the development of my GSoC project.

# Further Improvements

I hope to be able to maintain and improve the TWA, using it where possibly throughout my further studies. Some identifiable improvements are:

- The creation of a scipt to auto build the Tensorboard web app image
- The integration of the TWA in the Kubeflow dashboard
- The development of an [extensible story](https://github.com/kubeflow/kubeflow/issues/3578#issuecomment-655724933) for deploying our stateful apps, like Jupyter and Tensorboard

# Acknowledgements

First and foremost, I would like to thank my mentors Kimonas and Ilias. Both of them, despite their busy timelines were always willing to answer my (very often) questions and provide suggestions. They were always there for me, and I can't thank them enough for that. Also, Kubeflow, which introduced me to the world of open-source programming and gave me the opportunity to work on such an exiting project. Finally the Google Summer of Code program, that provided the necessary funding so I could undertake this project throughout the summer months and have a wonderful experience. 
