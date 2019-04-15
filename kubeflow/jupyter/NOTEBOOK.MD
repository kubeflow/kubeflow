## Creating a Jupyter notebook in user-defined namespaces
In order to create a notebook in a given namespace, Kubeflow expects a service account named `jupyter-notebook`, whcih allows k8s resource access,  and a secret named `user-gcp-sa,` which allows GCP service access, to exist in the namespace. 
By default these serice acounts exist in `kubeflow` namespace so that you are able to create notebooks in this namespace. 
You can also create jupyter notebooks in other namespaces than `kubeflow`. However, before creating any notebook you have to make sure that you create the above servic eaccounts in your desired namespace. 
To this end, you can simply copy the aforementioned service accounts from `kubeflow` namespace to your desired namespace as follows:
``` 
kubectl get secret user-gcp-sa  --namespace=kubeflow --export -o yaml |\
 kubectl apply --namespace=<your-desired-namespace> -f -
```
```
kubectl get serviceaccount jupyter-notebook  --namespace=kubeflow --export -o yaml |\
 kubectl apply --namespace=<your-desired-namespace> -f -
``` 

Alternatively, if you would like to leverage GCP services and have access to K8s resources (e.g, to make use of  Kubeflow Fairing functionality) using your account you can  manually create 
them in your namespace as follows:
* Create a GCP service account with your desired role (to use Kubeflow Fairing, choose `roles/editor`):
```
export PROJECT_ID=<your-project-id>
export SA_NAME=<your-sa-name>
export NAMESPACE=<your-desired-namespace>
export GCPROLES=<your-desired-gcp-role>
gcloud iam service-accounts create $SA_NAME
gcloud projects add-iam-policy-binding $PROJECT_ID \
    --member serviceAccount:$SA_NAME@$PROJECT_ID.iam.gserviceaccount.com \
    --role $GCPROLE
```
* Create a key from your GCP service account:
```
gcloud iam service-accounts keys create <path-to-key>/key.json \
    --iam-account $SA_NAME@$PROJECT_ID.iam.gserviceaccount.com
```
* Create a secret from your key JSON file and name it `user-gcp-sa`:

```
kubectl create secret generic user-gcp-sa -n $NAMESPACE\
  --from-file=user-gcp-sa.json=<path-to-key>/key.json
```
* Create a service account bounding to a role which has permission for k8s resources in your namespace. 
To this end, you need to create three manifests to declare role, service account and rolebinding. Then you need to deploy them in your cluster and desired namespace.
  * Create notebook-role using the following manifest in a file named  `jupyterRole.yaml`, and then deploy it:
```
apiVersion: rbac.authorization.k8s.io/v1beta1
kind: Role
metadata:
  name: jupyter-notebook-role
rules:
- apiGroups: [ ""]
  resources: ["pods","pods/log","secrets","services"]
  verbs: ["*",]
- apiGroups: ["","apps","extensions"]
  resources: ["deployments","replicasets"]
  verbs: ["*"]
- apiGroups: ["kubeflow.org"]
  resources: ["*"]
  verbs: ["*"]
- apiGroups: ["batch"]
  resources: ["jobs"]
  verbs: ["*"]
```

```
   kubectl apply -n $NAMESPACE -f jupyterRole.yaml
```


  * Write the service account `jupyter-notebook` from the following manifest in a file named `jupyterNotebook.yaml` and then deploy it:
```
apiVersion: v1
kind: ServiceAccount
metadata: 
  name: jupyter-notebook
```

```
kubectl apply -n $NAMESPACE -f jupyterNotebook.yaml
```

  * Write a `RoleBinding` to bound `jupyter-notebook` to the role from the following manifest in a file named `jupyterRoleBinding.yaml`, and then deploy it.
``` 
apiVersion: rbac.authorization.k8s.io/v1beta1
kind: RoleBinding
metadata:
  name: jupyter-notebook-role-binding
roleRef:
  apiGroup: rbac.authorization.k8s.io
  kind: Role
  name: jupyter-notebook-role
subjects:
- kind: ServiceAccount
  name: jupyter-notebook  
```
```
kubectl apply -n $NAMESPACE -f jupyterRoleBinding.yaml
```

Finally, if you are not interested in using GCP services and/or Kubeflow Fairing, but just need to create a notebook in your desired namespace, the work around is to create  
the aforementioned secret (i.e., `user-gcp-sa`) and service account (i.e., `jupyter-notebook`) without necessarily having them to point to an actual account/role as follows: 
* Write a secret manifest in a file named `gcpSecret.yaml`:
``` 
apiVersion: v1
kind: Secret
metadata:
  name: user-gcp-sa
type: Opaque
```
* Write a serviceaccount manifest without binding it to a role and store it in a file named `jupyterNotebook.yaml`: 
```
 apiVersion: v1
 kind: ServiceAccount
 metadata: 
  name: jupyter-notebook
```
* Apply the above manifests in your namespace
```
kubectl apply -n $NAMESPACE -f gcpSecret.yaml
```
```
kubectl apply -n $NAMESPACE -f jupytetNotebook.yaml
```

