local params = {
  cloud: 'gke',
  disks: 'null',
  gcpSecretName: 'user-gcp-sa',
  image: 'gcr.io/kubeflow/jupyterhub-k8s:v20180531-3bb991b1',
  jupyterHubAuthenticator: 'iap',
  name: 'jupyterhub',
  namespace: 'kubeflow',
  notebookPVCMount: '/home/jovyan',
  registry: 'gcr.io',
  repoName: 'kubeflow-images-public',
  serviceType: 'ClusterIP',
};

local map(obj) =
    local aux(arr, i, running) =
        if i >= std.length(arr) then
            running
        else
            aux(arr, i + 1, running + {[arr[i].kind+'/'+arr[i].metadata.name]: arr[i],}) tailstrict;
    obj + aux(obj.parts(params), 0, {parts::super.parts});

local jupyterhub = map(import 'kubeflow/core/jupyterhub.libsonnet');

jupyterhub['Service/tf-hub-lb']
