# Setup kubeflow in Alibaba Container Service for Kubernetes

```
curl -O http://kubeflow.oss-cn-beijing.aliyuncs.com/ks_0.11.0_linux_amd64.tar.gz
tar -xvf ks_0.11.0_linux_amd64.tar.gz
mv ks_0.11.0_linux_amd64/ks /usr/local/bin/
export KUBEFLOW_VERSION=master
export KUBEFLOW_CLOUD=ack
export KUBEFLOW_DOCKER_REGISTRY=registry.aliyuncs.com
curl https://raw.githubusercontent.com/cheyang/kubeflow/features/customized_image_repo/scripts/deploy.sh | bash
```