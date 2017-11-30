# WeaveFlux

> Weaveworks Flux is an integration allowing Kubeflow users to leverage [Weaveworks&#174; Flux]("https://github.com/weaveworks/flux) for GitOps. This utilizes the [stand-alone]("https://github.com/weaveworks/flux/tree/master/site/standalone") implementation. Being stand-alone, most of the maintenance is manual. If you are looking for a more managed solution, we recommend you look at [Weave Cloud&#174;]("https://www.weave.works/product/cloud/").

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [Installation](#installation)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Installation

We have packaged Weaveworks&#174; Flux as a ksonnet package as to fit with the overall architecture of Kubeflow. We will pick up from the installation guide found [here]("https://github.com/kubeflow/kubeflow#setup").


```
ks pkg install kubeflow/weaveflux@${VERSION}
```

Next we need to set a few environment variables. Make sure that you set "GITURL" to your Github repository ( For example git@github.com:weaveworks/flux-example ).

```
ks param set weaveflux gitUrl ${GITURL}
ks param set weaveflux namespace ${NAMESPACE}

```
Finally, we will deploy the application

```
ks apply default -c weaveflux
```

You will need to expose the service in order to use this. You are free to use different methods to expose.

```
kubectl port-forward deployment/flux 3030:3030
```

We will then setup our FLUX_URL and test fluxctl

```
FLUX_URL=http://`kubectl -n ${NAMESPACE} get svc flux-lb | head -2 | tail -1 | awk '{ print $4 }'`:3030/api/flux

fluxctl list-controllers

```


Once you are good to go, please refer to the [documentation on Weavework&#174; Flux]("https://github.com/weaveworks/flux/blob/master/site/using.md").
