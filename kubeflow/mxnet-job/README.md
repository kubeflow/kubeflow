# MXNet Training

## Installing MXNet Operator

If you haven't already done so please follow the [Getting Started Guide](https://www.kubeflow.org/docs/started/getting-started/) to deploy Kubeflow.

An **alpha** version of MXNet support was introduced with Kubeflow 0.2.0. You must be using a version of Kubeflow newer than 0.2.0.

## Verify that MXNet support is included in your Kubeflow deployment

Check that the MXNet custom resource is installed

```
kubectl get crd
```

The output should include `mxjobs.kubeflow.org`

```
NAME                                           AGE
...
mxjobs.kubeflow.org                            4d
...
```

If it is not included you can add it as follows

```
cd ${KSONNET_APP}
ks pkg install kubeflow/mxnet-job
ks generate mxnet-operator mxnet-operator
ks apply ${ENVIRONMENT} -c mxnet-operator
```

## Creating a MXNet Job


You create a job by defining a MXJob and then creating it with.


```
kubectl create -f examples/mx_job_dist.yaml 
```


## Monitoring a MXNet Job


To get the status of your job

```bash
kubectl get -o yaml mxjobs $JOB
```   

Here is sample output for an example job

```yaml
apiVersion: kubeflow.org/v1alpha1
kind: MXJob
metadata:
  clusterName: ""
  creationTimestamp: 2018-08-10T07:13:39Z
  generation: 1
  name: example-dist-job
  namespace: default
  resourceVersion: "491499"
  selfLink: /apis/kubeflow.org/v1alpha1/namespaces/default/mxjobs/example-dist-job
  uid: e800b1ed-9c6c-11e8-962f-704d7b2c0a63
spec:
  RuntimeId: aycw
  jobMode: dist
  mxImage: mxjob/mxnet:gpu
  replicaSpecs:
  - PsRootPort: 9000
    mxReplicaType: SCHEDULER
    replicas: 1
    template:
      metadata:
        creationTimestamp: null
      spec:
        containers:
        - args:
          - train_mnist.py
          command:
          - python
          image: mxjob/mxnet:gpu
          name: mxnet
          resources: {}
          workingDir: /incubator-mxnet/example/image-classification
        restartPolicy: OnFailure
  - PsRootPort: 9091
    mxReplicaType: SERVER
    replicas: 1
    template:
      metadata:
        creationTimestamp: null
      spec:
        containers:
        - args:
          - train_mnist.py
          command:
          - python
          image: mxjob/mxnet:gpu
          name: mxnet
          resources: {}
          workingDir: /incubator-mxnet/example/image-classification
        restartPolicy: OnFailure
  - PsRootPort: 9091
    mxReplicaType: WORKER
    replicas: 1
    template:
      metadata:
        creationTimestamp: null
      spec:
        containers:
        - args:
          - train_mnist.py
          - --num-epochs=10
          - --num-layers=2
          - --kv-store=dist_device_sync
          command:
          - python
          image: mxjob/mxnet:gpu
          name: mxnet
          resources: {}
          workingDir: /incubator-mxnet/example/image-classification
        restartPolicy: OnFailure
  terminationPolicy:
    chief:
      replicaIndex: 0
      replicaName: SCHEDULER
status:
  phase: Running
  reason: ""
  replicaStatuses:
  - ReplicasStates:
      Running: 1
    mx_replica_type: SCHEDULER
    state: Running
  - ReplicasStates:
      Running: 1
    mx_replica_type: SERVER
    state: Running
  - ReplicasStates:
      Running: 1
    mx_replica_type: WORKER
    state: Running
  state: Running


```

