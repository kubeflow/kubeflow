# Instructions


This is a temporary place holder for instructions. These instructions should migrate
to the website. However, our website docs are currently describing 0.2 and these instructions
apply to 0.3.

Download the scripts

```
export KUBEFLOW_TAG=master
export KUBEFLOW_REPO=<where to download to>
curl -o deploy.sh https://raw.githubusercontent.com/kubeflow/kubeflow/${KUBEFLOW_TAG}/scripts/download.sh
```

  * You can also just clone the repo with git.

```
${KUBEFLOW_REPO}/scripts/kfctl.sh init jlewi-0802-b --platform gcp --project cloud-ml-dev
${KUBEFLOW_REPO}/scripts/kfctl.sh generate all
${KUBEFLOW_REPO}/scripts/kfctl.sh apply all
````

To delete everthing
```
${KUBEFLOW_REPO}/scripts/kfctl.sh delete all
```

ksonnet will fail to initialize the app if there is no KUBECONFIG file.
This will happen if no cluster exists. To work around this we can 
delay creating the ksonnet app until after the cluster exists.

```
${KUBEFLOW_REPO}/scripts/kfctl.sh init jlewi-0802-b --platform gcp --project cloud-ml-dev
${KUBEFLOW_REPO}/scripts/kfctl.sh generate gcp
${KUBEFLOW_REPO}/scripts/kfctl.sh apply gcp
${KUBEFLOW_REPO}/scripts/kfctl.sh generate k8s
${KUBEFLOW_REPO}/scripts/kfctl.sh apply k8s
```

## To create GCFS

Copy the GCFS deployment manager configs to the gcp_config directory
in your kfctl directory

```
cp ${KUBEFLOW_REPO}/scripts/deployment_manager_configs/gcfs.yaml \
   ${KFAPP}/gcp_config/
```

  * **KFAPP** is the directory created by `kfctl.sh init`

Edit gcfs.yaml to match your desired configuration

  * Set zone
  * Set name
  * Set the value of parent to include your project e.g.

    ```
    projects/${PROJECT}/locations/${ZONE}
    ```

Using [yq](https://github.com/kislyuk/yq)

```
cd ${KFAPP}
. env.sh
yq -r ".resources[0].properties.instanceId=\"${DEPLOYMENT_NAME}\"" ${KFAPP}/gcp_config/gcfs.yaml > ${KFAPP}/gcp_config/gcfs.yaml.new
mv ${KFAPP}/gcp_config/gcfs.yaml.new ${KFAPP}/gcp_config/gcfs.yaml
```

Configure Kubeflow to mount GCFS as a volume

```
cd ${KFAPP}
. env.sh
cd ${KUBEFLOW_KS_DIR}
ks generate google-cloud-filestore-pv google-cloud-filestore-pv --name="kubeflow-gcfs" \
   --storageCapacity="${GCFS_STORAGE}" \
   --serverIP="${GCFS_INSTANCE_IP_ADDRESS}"
ks param set jupyterhub disks "kubeflow-gcfs"  
```

Apply the changes

```
cd ${KFAPP}
${KUBEFLOW_REPO}/scripts/kfctl.sh apply all
```
### Dealing with Legacy Networks

GCFS tries to use the network named `default` by default. For older projects,
this will be a legacy network which is incompatible with GCFS. This will
manifest as an error like the following when deploying GCFS.

```
ERROR: (gcloud.deployment-manager.deployments.update) Error in Operation [operation-1533189457517-5726d7cfd19c9-e1b0b0b5-58ca11b8]: errors:
- code: RESOURCE_ERROR
  location: /deployments/jl-0801-b-gcfs/resources/filestore
  message: '{"ResourceType":"gcp-types/file-v1beta1:projects.locations.instances","ResourceErrorCode":"400","ResourceErrorMessage":{"code":400,"message":"network
    default is invalid; legacy networks are not supported.","status":"INVALID_ARGUMENT","statusMessage":"Bad
    Request","requestPath":"https://file.googleapis.com/v1beta1/projects/cloud-ml-dev/locations/us-central1-a/instances","httpMethod":"POST"}}'
    
```

To fix this we can create a new network

```
cp ${KUBEFLOW_REPO}/scripts/deployment_manager_configs/network.* \
   ${KFAPP}/gcp_config/
```

Edit network.yaml to set the name for the network.

Edit gcfs.yaml to use the name of the newly created network.

Apply the changes.

```
cd ${KFAPP}
${KUBEFLOW_REPO}/scripts/kfctl.sh apply all
```

## Private Clusters

Add instructions similar to those for GCFS.
