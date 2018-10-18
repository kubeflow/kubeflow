## Overview

The application component creates an Application Kind based on the 
components ksonnet has generated. If using kfctl this would be all components 
or the result of executing `kfctl generate all`

## Sample script

```bash
  rm -rf kf_app
  kfctl.sh init kf_app --platform none
  pushd kf_app
  kfctl.sh generate all
  kfctl.sh apply all
```

## Expected output

### all cluster-wide resources are created

```bash
INFO Applying customresourcedefinitions workflows.argoproj.io
INFO Creating non-existent customresourcedefinitions workflows.argoproj.io
INFO Applying clusterroles argo
INFO Creating non-existent clusterroles argo
INFO Applying clusterrolebindings argo
INFO Creating non-existent clusterrolebindings argo
INFO Applying clusterroles argo-ui
INFO Creating non-existent clusterroles argo-ui
INFO Applying clusterrolebindings argo-ui
INFO Creating non-existent clusterrolebindings argo-ui
INFO Applying clusterroles vizier-core
INFO Creating non-existent clusterroles vizier-core
INFO Applying clusterrolebindings vizier-core
INFO Creating non-existent clusterrolebindings vizier-core
INFO Applying customresourcedefinitions studyjobs.kubeflow.org
INFO Creating non-existent customresourcedefinitions studyjobs.kubeflow.org
INFO Applying clusterroles metrics-collector
INFO Creating non-existent clusterroles metrics-collector
INFO Applying clusterrolebindings metrics-collector
INFO Creating non-existent clusterrolebindings metrics-collector
INFO Applying clusterroles studyjob-controller
INFO Creating non-existent clusterroles studyjob-controller
INFO Applying clusterrolebindings studyjob-controller
INFO Creating non-existent clusterrolebindings studyjob-controller
INFO Applying clusterroles pytorch-operator
INFO Creating non-existent clusterroles pytorch-operator
INFO Applying clusterrolebindings pytorch-operator
INFO Creating non-existent clusterrolebindings pytorch-operator
INFO Applying customresourcedefinitions pytorchjobs.kubeflow.org
INFO Creating non-existent customresourcedefinitions pytorchjobs.kubeflow.org
INFO Applying clusterroles spartakus
INFO Creating non-existent clusterroles spartakus
INFO Applying clusterrolebindings spartakus
INFO Creating non-existent clusterrolebindings spartakus
INFO Applying customresourcedefinitions tfjobs.kubeflow.org
INFO Creating non-existent customresourcedefinitions tfjobs.kubeflow.org
INFO Applying clusterroles tf-job-operator
INFO Creating non-existent clusterroles tf-job-operator
INFO Applying clusterrolebindings tf-job-operator
INFO Creating non-existent clusterrolebindings tf-job-operator
INFO Applying clusterroles tf-job-dashboard
INFO Creating non-existent clusterroles tf-job-dashboard
INFO Applying clusterrolebindings tf-job-dashboard
INFO Creating non-existent clusterrolebindings tf-job-dashboard
INFO Applying customresourcedefinitions applications.app.k8s.io
INFO Creating non-existent customresourcedefinitions applications.app.k8s.io
```

### all namespace scoped resources are created

```bash
INFO Applying services kubeflow.modeldb-db
INFO Creating non-existent services kubeflow.modeldb-db
INFO Applying services kubeflow.ambassador-admin
INFO Creating non-existent services kubeflow.ambassador-admin
INFO Applying roles kubeflow.ambassador
INFO Creating non-existent roles kubeflow.ambassador
INFO Applying serviceaccounts kubeflow.ambassador
INFO Creating non-existent serviceaccounts kubeflow.ambassador
INFO Applying rolebindings kubeflow.ambassador
INFO Creating non-existent rolebindings kubeflow.ambassador
INFO Applying serviceaccounts kubeflow.tf-job-dashboard
INFO Creating non-existent serviceaccounts kubeflow.tf-job-dashboard
INFO Applying services kubeflow.tf-job-dashboard
INFO Creating non-existent services kubeflow.tf-job-dashboard
INFO Applying services kubeflow.ambassador
INFO Creating non-existent services kubeflow.ambassador
INFO Applying services kubeflow.argo-ui
INFO Creating non-existent services kubeflow.argo-ui
INFO Applying configmaps kubeflow.workflow-controller-configmap
INFO Creating non-existent configmaps kubeflow.workflow-controller-configmap
INFO Applying serviceaccounts kubeflow.argo
INFO Creating non-existent serviceaccounts kubeflow.argo
INFO Applying serviceaccounts kubeflow.argo-ui
INFO Creating non-existent serviceaccounts kubeflow.argo-ui
INFO Applying serviceaccounts kubeflow.tf-job-operator
INFO Creating non-existent serviceaccounts kubeflow.tf-job-operator
INFO Applying services kubeflow.centraldashboard
INFO Creating non-existent services kubeflow.centraldashboard
INFO Applying configmaps kubeflow.tf-job-operator-config
INFO Creating non-existent configmaps kubeflow.tf-job-operator-config
INFO Applying roles kubeflow.centraldashboard
INFO Creating non-existent roles kubeflow.centraldashboard
INFO Applying configmaps kubeflow.jupyterhub-config
INFO Creating non-existent configmaps kubeflow.jupyterhub-config
INFO Applying services kubeflow.jupyterhub-0
INFO Creating non-existent services kubeflow.jupyterhub-0
INFO Applying applications kubeflow.application
INFO Creating non-existent applications kubeflow.application
INFO Applying roles kubeflow.jupyter-role
INFO Creating non-existent roles kubeflow.jupyter-role
INFO Applying roles kubeflow.jupyter-notebook-role
INFO Creating non-existent roles kubeflow.jupyter-notebook-role
INFO Applying services kubeflow.jupyterhub-lb
INFO Creating non-existent services kubeflow.jupyterhub-lb
INFO Applying serviceaccounts kubeflow.jupyterhub
INFO Creating non-existent serviceaccounts kubeflow.jupyterhub
INFO Applying serviceaccounts kubeflow.jupyter-notebook
INFO Creating non-existent serviceaccounts kubeflow.jupyter-notebook
INFO Applying rolebindings kubeflow.jupyter-role
INFO Creating non-existent rolebindings kubeflow.jupyter-role
INFO Applying rolebindings kubeflow.jupyter-notebook-role
INFO Creating non-existent rolebindings kubeflow.jupyter-notebook-role
INFO Applying services kubeflow.vizier-core
INFO Creating non-existent services kubeflow.vizier-core
INFO Applying serviceaccounts kubeflow.spartakus
INFO Creating non-existent serviceaccounts kubeflow.spartakus
INFO Applying services kubeflow.vizier-db
INFO Creating non-existent services kubeflow.vizier-db
INFO Applying persistentvolumeclaims kubeflow.vizier-db
INFO Creating non-existent persistentvolumeclaims kubeflow.vizier-db
INFO Applying serviceaccounts kubeflow.pytorch-operator
INFO Creating non-existent serviceaccounts kubeflow.pytorch-operator
INFO Applying serviceaccounts kubeflow.vizier-core
INFO Creating non-existent serviceaccounts kubeflow.vizier-core
INFO Applying services kubeflow.vizier-suggestion-random
INFO Creating non-existent services kubeflow.vizier-suggestion-random
INFO Applying configmaps kubeflow.pytorch-operator-config
INFO Creating non-existent configmaps kubeflow.pytorch-operator-config
INFO Applying services kubeflow.vizier-suggestion-grid
INFO Creating non-existent services kubeflow.vizier-suggestion-grid
INFO Applying configmaps kubeflow.worker-template
INFO Creating non-existent configmaps kubeflow.worker-template
INFO Applying services kubeflow.vizier-suggestion-hyperband
INFO Creating non-existent services kubeflow.vizier-suggestion-hyperband
INFO Applying configmaps kubeflow.metricscollector-template
INFO Creating non-existent configmaps kubeflow.metricscollector-template
INFO Applying services kubeflow.vizier-suggestion-bayesianoptimization
INFO Creating non-existent services kubeflow.vizier-suggestion-bayesianoptimization
INFO Applying serviceaccounts kubeflow.metrics-collector
INFO Creating non-existent serviceaccounts kubeflow.metrics-collector
INFO Applying services kubeflow.modeldb-backend
INFO Creating non-existent services kubeflow.modeldb-backend
INFO Applying services kubeflow.modeldb-frontend
INFO Creating non-existent services kubeflow.modeldb-frontend
INFO Applying serviceaccounts kubeflow.centraldashboard
INFO Creating non-existent serviceaccounts kubeflow.centraldashboard
INFO Applying serviceaccounts kubeflow.studyjob-controller
INFO Creating non-existent serviceaccounts kubeflow.studyjob-controller
INFO Applying deployments kubeflow.pytorch-operator
INFO Creating non-existent deployments kubeflow.pytorch-operator
INFO Applying deployments kubeflow.modeldb-frontend
INFO Creating non-existent deployments kubeflow.modeldb-frontend
INFO Applying deployments kubeflow.vizier-suggestion-bayesianoptimization
INFO Creating non-existent deployments kubeflow.vizier-suggestion-bayesianoptimization
INFO Applying deployments kubeflow.vizier-suggestion-hyperband
INFO Creating non-existent deployments kubeflow.vizier-suggestion-hyperband
INFO Applying deployments kubeflow.spartakus-volunteer
INFO Creating non-existent deployments kubeflow.spartakus-volunteer
INFO Applying deployments kubeflow.studyjob-controller
INFO Creating non-existent deployments kubeflow.studyjob-controller
INFO Applying deployments kubeflow.vizier-suggestion-grid
INFO Creating non-existent deployments kubeflow.vizier-suggestion-grid
INFO Applying deployments kubeflow.vizier-suggestion-random
INFO Creating non-existent deployments kubeflow.vizier-suggestion-random
INFO Applying deployments kubeflow.vizier-db
INFO Creating non-existent deployments kubeflow.vizier-db
INFO Applying deployments kubeflow.modeldb-backend
INFO Creating non-existent deployments kubeflow.modeldb-backend
INFO Applying deployments kubeflow.vizier-core
INFO Creating non-existent deployments kubeflow.vizier-core
INFO Applying statefulsets kubeflow.jupyterhub
INFO Creating non-existent statefulsets kubeflow.jupyterhub
INFO Applying deployments kubeflow.tf-job-operator-v1alpha2
INFO Creating non-existent deployments kubeflow.tf-job-operator-v1alpha2
INFO Applying deployments kubeflow.argo-ui
INFO Creating non-existent deployments kubeflow.argo-ui
INFO Applying deployments kubeflow.centraldashboard
INFO Creating non-existent deployments kubeflow.centraldashboard
INFO Applying deployments kubeflow.workflow-controller
INFO Creating non-existent deployments kubeflow.workflow-controller
INFO Applying deployments kubeflow.ambassador
INFO Creating non-existent deployments kubeflow.ambassador
INFO Applying deployments kubeflow.tf-job-dashboard
INFO Creating non-existent deployments kubeflow.tf-job-dashboard
INFO Applying deployments kubeflow.modeldb-db
INFO Creating non-existent deployments kubeflow.modeldb-db
```

## Expected Application yaml

```yaml
apiVersion: app.k8s.io/v1beta1
kind: Application
metadata:
  annotations:
    ksonnet.io/managed: '{"pristine":"H4sIAAAAAAAA/6yXT3OzNhDG7/0YOoP7pr10fHv79tZ2JlPP5JLJYZHWRkHSaqTFLsn4u3dkExtcCMbODcRv/zwPCEnvArx+whA1ObEU4P2i+i0uNP28fSiQ4UFkotJOiaX47r3REjiRmbDIoIBBLN+FgQJNTFfg/TFLhzzkrAsMDhkPqR1Y/B9WRXIOOT2XZD05dHwB7TMxGJoGoweZnqRKa0O7BEeP8tBVjGgL0zyWEBOzqqVEVKhEJk61/tRORbF8fhdgC4gRFIUU3KpfYdhqiWK/z7pEDspqN80lYhOoTvaEAuQCai4p6LeDhtbzs9f/kBlM0S/yXUqqHX9Brd+1U9ptPsuE/zK69JnEc+gf6A01Fj962FGokvm5JMeBjMHZKSBsKK/1HWFDL2KgsXS51hsLvhP04zD2N/hz1inbxwr3KImOAxgFsSwIgporbyh+SOc0d3Vbs77S19o3jKGsi9bWcU876LcxGWem2xF437FoxcC4rs0KuReUh9TVnUJyR4wFUfUl2ZJWU1wn9pO3ddnblfiNCnq/hK+ypZd0q9/0YR4GHPPmApkzZdpQNer7EPCYVsLI6PiJTG3xhwFtB/AbGhmW2XtjLRnrzQZj8jAP4BTZCQWD/A0ddvJsgh79x4zT99UsG4+hADejcC/kvuoFNBg1OPKsbfsJX9/IWPScniwpNKrIC5AVjrswgN1SZXxe9Ilbcq8DOb5CQpebVQc5aBlzmRZyyZNbo5Y/4Tmj9QYYx1epyLVqXqm42Ml8UmQkYu72Ca/pzjdMQZY5eQyQBE0tupcBE1qG8DlCoofAUNVxyrMPLt+SqR3jfM94nSfTT05sH8D4En65N8+Uoxf8hNCWnty/TXOTaa8W/ZIJhVEG7dv+P+6OR0GRCS1T9PL5JRMVNjsKqr0z2lXtpQXtGLTD0A6kLUI8xtPuPMyN7x3PMrE9nTq/LX5NxzXt1nSEI57ntQWW5V/dE+b0aXK/3+9/+g8AAP//AQAA//9VguNJ2w4AAA=="}'
  clusterName: ""
  creationTimestamp: 2018-10-18T00:19:45Z
  generation: 1
  labels:
    app: application
    app.kubernetes.io/deploy-manager: ksonnet
    app.kubernetes.io/name: application
    ksonnet.io/component: application
  name: application
  namespace: kubeflow
  resourceVersion: "3935594"
  selfLink: /apis/app.k8s.io/v1beta1/namespaces/kubeflow/applications/application
  uid: 8466e9c8-d26b-11e8-83f2-42010a8a0020
spec:
  assemblyPhase: Succeeded
  componentKinds:
  - ambassador:
      kind: Service
  - ambassador-admin:
      kind: Service
  - ambassador:
      group: rbac.authorization.k8s.io
      kind: Role
  - ambassador:
      kind: ServiceAccount
  - ambassador:
      group: rbac.authorization.k8s.io
      kind: RoleBinding
  - ambassador:
      group: extensions
      kind: Deployment
  - workflow-controller:
      group: extensions
      kind: Deployment
  - argo-ui:
      group: extensions
      kind: Deployment
  - argo-ui:
      kind: Service
  - workflow-controller-configmap:
      kind: ConfigMap
  - argo:
      kind: ServiceAccount
  - argo-ui:
      kind: ServiceAccount
  - centraldashboard:
      group: extensions
      kind: Deployment
  - centraldashboard:
      kind: Service
  - centraldashboard:
      kind: ServiceAccount
  - centraldashboard:
      group: rbac.authorization.k8s.io
      kind: Role
  - jupyterhub-config:
      kind: ConfigMap
  - jupyterhub-0:
      kind: Service
  - jupyterhub:
      group: apps
      kind: StatefulSet
  - jupyter-role:
      group: rbac.authorization.k8s.io
      kind: Role
  - jupyter-notebook-role:
      group: rbac.authorization.k8s.io
      kind: Role
  - jupyterhub-lb:
      kind: Service
  - jupyterhub:
      kind: ServiceAccount
  - jupyter-notebook:
      kind: ServiceAccount
  - jupyter-role:
      group: rbac.authorization.k8s.io
      kind: RoleBinding
  - jupyter-notebook-role:
      group: rbac.authorization.k8s.io
      kind: RoleBinding
  - vizier-core:
      kind: Service
  - vizier-core:
      group: extensions
      kind: Deployment
  - vizier-db:
      kind: Service
  - vizier-db:
      kind: PersistentVolumeClaim
  - vizier-db:
      group: extensions
      kind: Deployment
  - vizier-core:
      kind: ServiceAccount
  - vizier-suggestion-random:
      kind: Service
  - vizier-suggestion-random:
      group: extensions
      kind: Deployment
  - vizier-suggestion-grid:
      kind: Service
  - vizier-suggestion-grid:
      group: extensions
      kind: Deployment
  - vizier-suggestion-hyperband:
      kind: Service
  - vizier-suggestion-hyperband:
      group: extensions
      kind: Deployment
  - vizier-suggestion-bayesianoptimization:
      kind: Service
  - vizier-suggestion-bayesianoptimization:
      group: extensions
      kind: Deployment
  - modeldb-backend:
      kind: Service
  - modeldb-backend:
      group: extensions
      kind: Deployment
  - modeldb-db:
      kind: Service
  - modeldb-db:
      group: extensions
      kind: Deployment
  - modeldb-frontend:
      kind: Service
  - modeldb-frontend:
      group: extensions
      kind: Deployment
  - metrics-collector:
      kind: ServiceAccount
  - metricscollector-template:
      kind: ConfigMap
  - studyjob-controller:
      kind: ServiceAccount
  - studyjob-controller:
      group: extensions
      kind: Deployment
  - worker-template:
      kind: ConfigMap
  - pytorch-operator-config:
      kind: ConfigMap
  - pytorch-operator:
      kind: ServiceAccount
  - pytorch-operator:
      group: extensions
      kind: Deployment
  - spartakus:
      kind: ServiceAccount
  - spartakus-volunteer:
      group: extensions
      kind: Deployment
  - tf-job-operator-v1alpha2:
      group: extensions
      kind: Deployment
  - tf-job-operator-config:
      kind: ConfigMap
  - tf-job-operator:
      kind: ServiceAccount
  - tf-job-dashboard:
      kind: Service
  - tf-job-dashboard:
      kind: ServiceAccount
  - tf-job-dashboard:
      group: extensions
      kind: Deployment
  descriptor:
    description: ""
    icons: []
    keywords: []
    links: []
    maintainers: []
    notes: ""
    owners: []
    type: kubeflow
    version: "0.3"
  info: []
  selector:
    matchLabels:
      app.kubernetes.io/name: application
```

