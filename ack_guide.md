# Setup kubeflow in Alibaba Container Service for Kubernetes

```
# Create namespace for kubeflow
NAMESPACE=kubeflow
kubectl create namespace ${NAMESPACE}

# Which version of Kubeflow to use
# For a list of releases refer to:
# https://github.com/kubeflow/kubeflow/releases
#VERSION=v0.1.3
VERSION=jupyterhub-alibaba-cloud

# Initialize a ksonnet app. Set the namespace for it's default environment.
APP_NAME=my-kubeflow
ks init ${APP_NAME} --api-spec=version:v1.9.3
cd ${APP_NAME}
ks env set default --namespace ${NAMESPACE}

# Install Kubeflow components
# ks registry add kubeflow github.com/kubeflow/kubeflow/tree/${VERSION}/kubeflow
ks registry add kubeflow github.com/cheyang/kubeflow/tree/${VERSION}/kubeflow
ks registry list

ks pkg install kubeflow/core@${VERSION}
ks pkg install kubeflow/tf-serving@${VERSION}
ks pkg install kubeflow/tf-job@${VERSION}

# Create templates for core components
ks generate kubeflow-core kubeflow-core

# If your cluster is running on Alibaba Cloud you will need to set the cloud parameter.
# PLATFORM=<ack>
ks param set kubeflow-core cloud ack

ks param set kubeflow-core jupyterHubImage registry.aliyuncs.com/kubeflow-images-public/jupyterhub-k8s:1.0.2
ks param set kubeflow-core tfJobImage registry.aliyuncs.com/kubeflow-images-public/tf_operator:v20180615-b2ac020
ks param set kubeflow-core tfAmbassadorImage registry.aliyuncs.com/datawire/ambassador:0.34.0
ks param set kubeflow-core tfStatsdImage registry.aliyuncs.com/datawire/statsd:0.34.0

ks param set kubeflow-core jupyterNotebookRegistry registry.aliyuncs.com
ks param set kubeflow-core JupyterNotebookRepoName kubeflow-images-public

ks param set kubeflow-core jupyterHubServiceType LoadBalancer
ks param set kubeflow-core tfAmbassadorServiceType LoadBalancer
ks param set kubeflow-core tfJobUiServiceType LoadBalancer

# Enable collection of anonymous usage metrics
# Skip this step if you don't want to enable collection.
# ks param set kubeflow-core reportUsage true
# ks param set kubeflow-core usageId $(uuidgen)

# Deploy Kubeflow
ks apply default -c kubeflow-core
```