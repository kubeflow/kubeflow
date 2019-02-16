// @apiVersion 0.1
// @name io.ksonnet.pkg.jupyter-web-app
// @shortDescription A WebApp that controlls Jupyter Notebooks
// @param name string Name to give to the Jupyter UI
// @optionalParam image string gcr.io/kubeflow-images-public/jupyter-web-app:v20190215-v0.4.0-rc.1-138-g1f61e52d Docker Image used for the Jupyter UI
// @optionalParam ui string default Choose the UI to use. Supported: default | rok
// @optionalParam port string 80 Port to expose the UI's Service
// @optionalParam policy string IfNotPresent imagePullPolicy for the UI's image
// @optionalParam prefix string jupyter The prefix under which the app is accessed

local jupyter_ui = import "kubeflow/jupyter/jupyter-web-app.libsonnet";

local instance = jupyter_ui.new(env, params);
instance.list(instance.all)
