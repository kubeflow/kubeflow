# Setup kubeflow in Alibaba Container Service for Kubernetes

```
curl -O http://kubeflow.oss-cn-beijing.aliyuncs.com/ks_0.11.0_linux_amd64.tar.gz
tar -xvf ks_0.11.0_linux_amd64.tar.gz
mv ks_0.11.0_linux_amd64/ks /usr/local/bin/

curl https://raw.githubusercontent.com/cheyang/kubeflow/support_customized_image/scripts/download.sh | bash
export PATH=${PWD}/scripts:$PATH

kubectl create ns kubeflow
kfctl.sh init myapp --platform ack
cd myapp
kfctl.sh generate all
kfctl.sh apply all
```
