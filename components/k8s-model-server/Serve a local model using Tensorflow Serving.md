# Serve a local model using Tensorflow Serving

- Build NFS Server and allow your k8s machine to access. (more detail in [Setup an NFS Server](https://www.digitalocean.com/community/tutorials/how-to-set-up-an-nfs-mount-on-ubuntu-16-04)). Assume `/var/nfs/general` folder has exported now.

- Put your model into NFS. In this tutorial, we also use inception model. So first download the whole model from [here](https://console.cloud.google.com/storage/browser/kubeflow-models/inception). Assume your model is located on `/var/nfs/general/inception`.

- Install NFS Client Components on your k8s machine

```
$ sudo apt-get update
$ sudo apt-get install nfs-common
```

- Check if model is available *(Optional)*

```
$ sudo mkdir -p /nfs/general
$ sudo mount NFS_SERVER_IP:/var/nfs/general /nfs/general
$ ls /nfs/general
inception
```

- Create Persistent Volume(PV) and Persistent Volume Claim(PVC) *[learn more](https://github.com/kubernetes/examples/tree/master/staging/volumes/nfs)*

	- Create PV. You need to modify `NFS_SERVER_IP` to yours

	
	```
	$ cat nfs-pv.yaml
	apiVersion: v1
	kind: PersistentVolume
	metadata:
	  name: nfs
	spec:
	  capacity:
	    storage: 1Mi
	  accessModes:
	    - ReadWriteMany
	  nfs:
	    server: NFS_SERVER_IP
	    path: "/"
	    
	$ kubectl create -f nfs-pv.yaml
	```
	
	- Create PVC

	```
	$ cat nfs-pvc.yaml
	apiVersion: v1
	kind: PersistentVolumeClaim
	metadata:
	  name: nfs
	spec:
	  accessModes:
	    - ReadWriteMany
	  storageClassName: ""
	  resources:
	    requests:
	      storage: 1Mi
	
	$ kubectl create -f nfs-pvc.yaml
	```
	
	- Check PV and PVC *(Optional)*

	```
	$ kubectl get pv
	NAME      CAPACITY   ACCESS MODES   RECLAIM POLICY   STATUS    CLAIM         STORAGECLASS   REASON    AGE
	nfs       1Mi        RWX            Retain           Bound     default/nfs                            20h
	
	$kubectl get pvc
	NAME      STATUS    VOLUME    CAPACITY   ACCESS MODES   STORAGECLASS   AGE
	nfs       Bound     nfs       1Mi        RWX                           20h
	```
	
- Create a Component for your model. You need to add `/mnt` before model path

```
$ MODEL_COMPONENT=serveInceptionNFS
$ MODEL_NAME=inception-nfs
$ MODEL_PATH=/mnt/var/nfs/general/inception
$ MODEL_STORAGE_TYPE=nfs
$ NFS_PVC_NAME=nfs
$ ks generate tf-serving ${MODEL_COMPONENT} --name=${MODEL_NAME}
$ ks param set ${MODEL_COMPONENT} modelPath ${MODEL_PATH}
$ ks param set ${MODEL_COMPONENT} modelStorageType ${MODEL_STORAGE_TYPE}
$ ks param set ${MODEL_COMPONENT} nfsPVC ${NFS_PVC_NAME}
```

- Deploy the model component. Ksonnet will pick up existing parameters for your environment (e.g. cloud, nocloud) and customize the resulting deployment appropriately

```
$ ks apply ${KF_ENV} -c ${MODEL_COMPONENT}
```

- Use the served model see [here](https://github.com/kubeflow/kubeflow/tree/master/components/k8s-model-server#use-the-served-model)