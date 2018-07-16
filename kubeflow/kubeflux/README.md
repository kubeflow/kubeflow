# KubeFlux
<<<<<<< HEAD

KubeFlux is an integration allowing Kubeflow users to leverage [WeaveWorks &#174; Flux]("https://www.weave.works/oss/flux/") for GitOps. KubeFlux utilizes the [stand-alone]("https://github.com/weaveworks/flux/tree/master/site/standalone") implementation. Being stand-alone, most of the maintenance is manual. If you are looking for a more managed solution, we recommend you look at [Weave Cloud &#174;]("https://www.weave.works/product/cloud/").

## Installation

We have packaged WeaveWorks&#174; Flux as a ksonnet package as to fit with the overall architecture of Kubeflow. We will pick up from the installation guide found [here]("https://github.com/kubeflow/kubeflow#setup").




```
ks pkg install kubeflow/kubeflux@${VERSION}

ks generate kubeflux kubeflux

ks apply default -c kubeflux -n ${NAMESPACE}
```

These steps will get KubeFlux installed within your cluster.

```
FLUX_URL=http://`kubectl -n ${NAMESPACE} get svc flux-lb | head -2 | tail -1 | awk '{ print $4 }'`:3030/api/flux

fluxctl list-controllers

```

This method
=======
>>>>>>> 44e40d9... README.md
