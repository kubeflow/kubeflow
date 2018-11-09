## Goals

- provide a k8 native mechanism to spawning jupyter notebooks for users

- spawn a notebook within a RBAC protected namespace for a user

- set a serviceAccountName within the spawning pod similar to jupyter-notebook

- use k8 native authentication for the user within the protected namespace

- allow similar params as kubeflow/core/prototypes/jupyterhub.jsonnet, including PVCs


## Design

The Notebooks component is an alternative to jupyterhub that uses a Notebook CRD and notebook-controller. The Notebook CRD is similar to a kubernetes Deployment. An example Notebook CR is shown below:

```yaml
apiVersion: kubeflow.org/v1alpha1
kind: Notebook
metadata:
  annotations:
    accessLocalFs: 'false'
    disks: 'null'
    notebookGid: "-1"
    notebookUid: "-1"
    notebookPVCMount: "/home/jovyan"
  name: training
  namespace: resnet50
spec:
  template:
    spec:
      containers:
      - name: notebook
        image: gcr.io/kubeflow-images-public/tensorflow-1.10.1-notebook-cpu:v0.3.0
        resources:
          requests:
            cpu: 500m
            memory: 1Gi
        workingDir: "/home/jovyan"
      ttlSecondsAfterFinished: 300
      securityContext: 
      - fsGroup: 100
        runAsUser: 1000
```

The user submits a Notebook CR either through a UI or CLI (eg `kubectl apply -f notebook.yaml`) and the Notebook CR is handled by a notebook-controller. The controller will create a Service and Pod within the user's namespace. The Service uses ambassador to create a reverse proxy that will route subsequent browser requests to the Pod. An example Service is shown below:

```yaml
apiVersion: v1
kind: Service
metadata:
  annotations:
    getambassador.io/config: |-
      ---
      apiVersion: ambassador/v0
      kind:  Mapping
      name: resnet50_training_mapping
      prefix: /resnet50/training
      rewrite: /resnet50/training
      timeout_ms: 300000
      service: training.resnet50
  labels:
    controller-uid: 038a2a66-e3e1-11e8-b1ac-42010a8a01b5
  name: training
  namespace: resnet50
  ownerReferences:
  - apiVersion: kubeflow.org/v1alpha1
    blockOwnerDeletion: true
    controller: true
    kind: Notebook
    name: training
    uid: 038a2a66-e3e1-11e8-b1ac-42010a8a01b5
spec:
  clusterIP: 10.103.254.68
  ports:
  - port: 80
    protocol: TCP
    targetPort: 8888
  selector:
    app: training
  type: ClusterIP
```

Subsequent browser requests to https://<api-server>/<namespace>/<notebook> are routed to the Service and Pod as shown below:

![Jupyter Notebook](./docs/jupyter_notebook.png "Jupyter Notebook")

The notebook component uses the profiles component to lazily create a protected namespace for the user's first notebook. Subsequent notebooks are launched within this namespace. 

