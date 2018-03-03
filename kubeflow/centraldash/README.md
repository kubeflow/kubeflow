# Centraldash

> Prototypes for deploying Centraldash


* [Quickstart](#quickstart)
* [Using Prototypes](#using-prototypes)
  * [io.ksonnet.pkg.centraldash](#io.ksonnet.pkg.centraldash)

## Quickstart

*The following commands use the `io.ksonnet.pkg.centraldash` prototype to deploy the Centraldash on your Kubernetes cluster*

First, create a cluster and install the ksonnet CLI (see root-level [README.md](rootReadme)).

If you haven't yet created a [ksonnet application](linkToSomewhere), do so using `ks init <app-name>`.

Finally, in the ksonnet application directory, run the following:

```shell
$ KF_ENV=cloud|nocloud
$ ks env add ${KF_ENV}
$ ks registry add kubeflow github.com/kubeflow/kubeflow/tree/master/kubeflow
$ ks pkg install kubeflow/core
$ ks pkg install kubeflow/centraldash
$ NAMESPACE=kubeflow
$ kubectl create namespace ${NAMESPACE}
$ ks generate core kubeflow-core --name=kubeflow-core --namespace=${NAMESPACE}
$ ks generate centraldash kubeflow-centraldash --name=kubeflow-dash --namespace=${NAMESPACE}
# Apply to server.
$ ks apply ${KF_ENV} -c kubeflow-core
$ ks apply ${KF_ENV} -c kubeflow-centraldash
# Centraldash uses the Ambassador service to connect to other UI services.
# Port 4004 is hard-coded for Ambassador's endpoint on centraldash
$ PORT=4004
$ PODNAME=`kubectl get pods --namespace ${NAMESPACE} --selector="service=ambassador" -o \
jsonpath='{.items[0].metadata.name}'`
$ kubectl port-forward --namespace=${NAMESPACE} $PODNAME ${PORT}:80
# In another terminal, start the centraldash service
$ DASHPODNAME=`kubectl get pods -n ${NAMESPACE} --selector="app=centraldash" -o \
jsonpath='{.items[0].metadata.name}'`
$ kubectl port-forward —namespace ${NAMESPACE} ${DASHPODNAME} 8082
```
Then open [http://127.0.0.1:8082](http://127.0.0.1:8082) in your browser.

[rootReadme]: https://github.com/ksonnet/mixins
