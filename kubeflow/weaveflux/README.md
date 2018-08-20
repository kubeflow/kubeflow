# WeaveFlux

Weaveworks Flux is an integration allowing Kubeflow users to leverage [Weaveworks&#174; Flux]("https://github.com/weaveworks/flux) for GitOps. This utilizes the [stand-alone]("https://github.com/weaveworks/flux/tree/master/site/standalone") implementation. Being stand-alone, most of the maintenance is manual. If you are looking for a more managed solution, we recommend you look at [Weave Cloud&#174;]("https://www.weave.works/product/cloud/").

## Installation

We have packaged Weaveworks&#174; Flux as a ksonnet package as to fit with the overall architecture of Kubeflow. We will pick up from the installation guide found [here](https://www.kubeflow.org/docs/started/getting-started/).

First you will want to go to your ksonnet application directory. If you used our deploy.sh tool, it will be a subdirectory called kubelow_ks_app. If you did this manually, go to the directory that you used to "ks init" your application. Then we will set some varibales

```
VERSION=0.2.2
NAMESPACE=kubeflow
GITURL=<your github url, ssh format>
```

Now we will add the weaveflux ksonnet package.

```
ks pkg install kubeflow/weaveflux@${VERSION}
```


Next we need to set a few environment variables. Make sure that you set "GITURL" to your Github repository ( For example "git@github.com:weaveworks/flux-example" ).


```
ks param set weaveflux giturl ${GITURL}

```

You can set a namespace if you want. It is best that you leave this variable as "kubeflow" but you are free to change.

```
ks param set weaveflux namespace ${NAMESPACE}

```
Finally, we will deploy the application

```
ks apply default -c weaveflux
```


We will then setup our FLUX_URL and test fluxctl

```
FLUX_URL=http://`kubectl -n ${NAMESPACE} get svc fluxip | head -2 | tail -1 | awk '{ print $4 }'`:3030/api/flux

fluxctl list-controllers

```

Once you are good to go, please refer to the [documentation on Weavework&#174; Flux](https://github.com/weaveworks/flux/blob/master/site/using.md) .
