# Credentials Pod Presets

> This package contains Kubernetes [PodPresets](https://kubernetes.io/docs/concepts/workloads/pods/podpreset/) for injecting credentials into Pods.

> Note: Pod Presets are namespace-scoped. A separate Pod Preset needs to be created for every namespace that needs credentials injected into pods.

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [Google Cloud Service Account Credentials](#google-cloud-service-account-credentials)
  - [Testing the pod preset](#testing-the-pod-preset)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Google Cloud Service Account Credentials

This is useful for injecting GCP Service Account Credentials into pods by using labels. Currently PodPresets is in alpha on GCP, so make sure that you are creating a GKE cluster with alpha features [enabled](https://cloud.google.com/kubernetes-engine/docs/concepts/alpha-clusters).

```
# Ensure that you have podpresets available on your kubernetes cluster

# This step should not return an error
$ kubectl get podpreset
```

Follow the steps below to create a service account, add roles to it and create a k8s secret containing its credentials.

```
# Create a service account in a GCP Project
SERVICE_ACCOUNT=kubeflow-gcp-service-account # Use any appropriate service account name
PROJECT=agwl-kubeflow                        # Name of GCP Project

gcloud iam service-accounts --project=${PROJECT} create ${SERVICE_ACCOUNT} \
  --display-name "GCP Service Account for use with kubeflow"

# Give the service account any roles that it requires. For example
# here we're giving it storage.admin role so that it can write to GCS
gcloud projects add-iam-policy-binding ${PROJECT} \
  --member serviceAccount:${SERVICE_ACCOUNT}@${PROJECT}.iam.gserviceaccount.com \
  --role=roles/storage.admin

# Download a key file for the service account
KEY_FILE=${HOME}/secrets/${SERVICE_ACCOUNT}@${PROJECT}.iam.gserviceaccount.com.json
gcloud iam service-accounts keys create ${KEY_FILE} \
  --iam-account ${SERVICE_ACCOUNT}@${PROJECT}.iam.gserviceaccount.com

# Create a k8s secret with the key file
SECRET_NAME="${SERVICE_ACCOUNT}-credentials"
NAMESPACE=default
kubectl create secret -n ${NAMESPACE} generic ${SECRET_NAME} --from-file="${SERVICE_ACCOUNT}-key.json"="${KEY_FILE}"
```

Now create a PodPreset which injects ${SERVICE_ACCOUNT} credentials into all the pods created in a namespace.

```
ks pkg install kubeflow/credentials-pod-preset

COMPONENT_NAME=${SERVICE_ACCOUNT}-credentials-injector
ks generate gcp-credentials-pod-preset ${COMPONENT_NAME} \
  --serviceAccountName ${SERVICE_ACCOUNT} \
  --secretName ${SECRET_NAME} \
  --namespace ${NAMESPACE}

KS_ENV=default
ks apply ${KS_ENV} -c ${COMPONENT_NAME}
```

### Testing the pod preset

Any pod which has the label `inject_gcp_service_account: ${SERVICE_ACCOUNT}` and created in the `${NAMESPACE}` will be injected with the `${SERVICE_ACCOUNT}` credentials.

```
# Create a simple pod manifest
cat <<EOF > pod.yaml
apiVersion: v1
kind: Pod
metadata:
  name: website
  namespace: ${NAMESPACE}
  labels:
    inject_gcp_service_account: ${SERVICE_ACCOUNT}
spec:
  containers:
    - name: website
      image: nginx
      ports:
        - containerPort: 80
EOF

# Apply it
kubectl apply -f pod.yaml

# Print the pod manifest. You should see the Service
# Account credentials injected into the pod
kubectl get -n ${NAMESPACE} pod/website -oyaml
```
