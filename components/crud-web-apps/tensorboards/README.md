# Tensorboards web app

This web app is responsible for allowing the user to manipulate Tensorboard instances in their Kubeflow cluster. To achieve this it provides a user friendly way to handle the lifecycle of Tensorboard CRs.

- The Tensorboards web app's UI is simple and intuitive
![Index Page](https://github.com/kandrio98/kubeflow/blob/pictures-branch/components/crud-web-apps/tensorboards/pictures/index_page.png?raw=true)

- It follows the style of the Jupyter web-app
![Create Form](https://github.com/kandrio98/kubeflow/blob/pictures-branch/components/crud-web-apps/tensorboards/pictures/create_tensorboard_form.png?raw=true)
- You can create, delete, list Tensorboard CRs and connect to Tensorboard servers to visualize your logs
![Delete Tensorboard](https://github.com/kandrio98/kubeflow/blob/pictures-branch/components/crud-web-apps/tensorboards/pictures/delete_tensorboard_dialog.png?raw=true)
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
cd ../../../tensorboards/frontend
npm i
npm link kubeflow
npm run build:watch
```

### Backend
```bash
# create a virtual env and install deps
# https://packaging.python.org/guides/installing-using-pip-and-virtual-environments/
cd component/crud-web-apps/tensorboards/backend
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

### Run the Tensorboards Controller
Since the Tensorboards controller is not currently a part of the manifests you will need to manually run the [Tensorboard Controller](https://github.com/kubeflow/kubeflow/blob/master/components/tensorboard-controller/README.md)
### Connect to the Tensorboard Server

Since the TWA is not yet fully integrated with Kubeflow, in order to connect to a created Tensorboard server, you can:
1. Run: `kubectl port-forward svc/istio-ingressgateway -n istio-system 8000:80`
2. Go to: `localhost:8000` to login to Kubeflow
3. Change to: `localhost:8000/tensorboard/<namespace>/<name>/` in order to visualize your logs, where `name` and `namespace` are the metadata of the Tensorboard CR

![Tensorboard Server](https://github.com/kandrio98/kubeflow/blob/pictures-branch/components/crud-web-apps/tensorboards/pictures/tensorboard_server.png?raw=true)
## GSoC 2020

This part of the project entails the [code for the FRONTEND and BACKEND](https://github.com/kubeflow/kubeflow/tree/master/components/crud-web-apps/tensorboards) of the Tensorboard web-app. The project also entailed extending the Tensorboard controller to support RWO PVCs as log storages for Tensorboard servers. You can find the code for the Tensorboard controller [here](https://github.com/kubeflow/kubeflow/tree/master/components/tensorboard-controller), and you can also find the corresponding documentation [here](https://github.com/kubeflow/kubeflow/blob/master/components/tensorboard-controller/README.md).

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
