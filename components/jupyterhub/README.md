<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [Jupyter and JupyterHub](#jupyter-and-jupyterhub)
  - [Background](#background)
    - [Jupyter](#jupyter)
    - [JupyterHub](#jupyterhub)
  - [Quick Start](#quick-start)
  - [Configuration](#configuration)
  - [Usage](#usage)
  - [Customization](#customization)
    - [Using your own hub image](#using-your-own-hub-image)
    - [Notebook image](#notebook-image)
    - [GitHub OAuth Setup](#github-oauth-setup)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# Jupyter and JupyterHub

## Background

Jupyter Notebook and JupyterLab as well as JupyterHub are developed by [Project
Jupyter](http://jupyter.org/about), a non-profit, open source project.

### Jupyter

[Jupyter Notebook](https://jupyter-notebook.readthedocs.io/en/stable/)
(previously named IPython Notebook) and [JupyterLab](https://jupyterlab.readthedocs.io/en/latest/) are user
interfaces for computational science and data science commonly used with
Spark, Tensorflow and other big data processing frameworks. They are used
by data scientists and ML engineers across a variety of organizations
for interactive tasks. They support multiple languages through runners called
"language kernels", and allow users to run code, save code/results, and share
“notebooks” with code, documentation, visualization, and media easily.

### JupyterHub

[JupyterHub](https://jupyterhub.readthedocs.io/en/latest/) lets users manage
authenticated access to multiple single-user
Jupyter notebooks. JupyterHub delegates the launching of
single-user notebooks to pluggable components called “spawners”. JupyterHub
has a sub-project named kubespawner, maintained by the
community, that enables users to provision single-user Jupyter notebooks backed by Kubernetes pods - the notebooks themselves are
Kubernetes pods. kubeform_spawner extends kubespawner to enable users to have
a form to specify cpu, memory, gpu, and desired image.

## Quick Start

Refer to the [guide](https://www.kubeflow.org/docs/guides/components/jupyter/) for instructions on deploying JupyterHub via ksonnet.

Once that's completed, you will have a StatefulSet for JupyterHub, a configmap for configuration, and a LoadBalancer type of service, in addition to the requisite RBAC roles.
If you are on Google Kubernetes Engine, the LoadBalancer type of service automatically creates an external IP address that can be
used to access the Jupyter notebook. Note that this is for illustration purposes only. In
a production environment, JupyterHub should be coupled with [SSL](https://jupyterhub.readthedocs.io/en/latest/getting-started/security-basics.html#enabling-ssl-encryption) and configured to use an
[authentication plugin](https://jupyterhub.readthedocs.io/en/latest/reference/authenticators.html).

If you're testing and want to avoid exposing JupyterHub on an external IP address, you can use kubectl instead to gain access to the hub on your local machine.

```commandline
kubectl port-forward <jupyterhub-pod-name> 8000:8000
```

The above will expose JupyterHub on http://localhost:8000. The pod name can be obtained by running `kubectl get pods`, and will be `jupyterhub-0` by default.

## Configuration

Configuration for JupyterHub is shipped separately and contained within the configmap defined by the [core componenent](https://github.com/kubeflow/kubeflow/tree/master/kubeflow). It is a Python file that is consumed by JupyterHub on starting up. The supplied configuration has reasonable defaults for the requisite fields and **no authenticator** configured by default. Furthermore, we provide a number of parameters that can be used to configure
the core component. To see a list of ksonnet parameters run

```
ks prototype describe jupyterhub
```

If the provided parameters don't provide the flexibility you need, you can take advantage of ksonnet to customize the core component and use a config file fully specified by you.

Configuration includes sections for KubeSpawner and Authenticators. Spawner parameters include the form used when provisioning new
Jupyter notebooks, and configuration defining how JupyterHub creates and interacts with Kubernetes pods for individual notebooks.
Authenticator parameters correspond to the authentication mechanism used by JupyterHub.

Additional information about configuration can be found in the
[Zero to JupyterHub with Kubernetes guide](https://zero-to-jupyterhub.readthedocs.io/en/latest/)
and the [JupyterHub documentation](https://jupyterhub.readthedocs.io/en/latest/).


## Usage

If you're using the quick-start, the external IP address of the JupyterHub
instance can be obtained from `kubectl get svc`.

```commandline
 kubectl get svc

NAME         TYPE           CLUSTER-IP      EXTERNAL-IP     PORT(S)        AGE
jupyterhub-0       ClusterIP      None            <none>          <none>         1h
jupyterhub-lb    LoadBalancer   10.43.246.148   xx.yy.zz.ww   80:32689/TCP   36m
```

Now, you can access the external IP, http://xx.yy.zz.ww, with your browser.
When trying to spawn a new image, a configuration page should pop up, allowing
configuration of the Jupyter notebook image, CPU, Memory, and additional
resources. Using the default [`DummyAuthenticator`](https://github.com/yuvipanda/jupyterhub-dummy-authenticator),
the hub should allow any username/password to access the hub and create new
notebooks. You can use an alternate [authenticator](https://jupyterhub.readthedocs.io/en/latest/reference/authenticators.html) plugin if you want to secure your notebook server and use its administration functionality.

## Customization

### Using your own hub image

An image with JupyterHub 0.8.1, kubespawner 0.7.1 and two simple authenticator plugins can be built from within the `docker/` directory using the Makefile provided. For example, if you're using Google Cloud Platform and have a project with ID `foo` configured to use gcr.io, you can do the following:

```commandline
make build PROJECT_ID=foo
make push PROJECT_ID=foo
```

### Notebook image

Images published under in the [Jupyter docker-stacks repo](https://github.com/jupyter/docker-stacks)
should work directly with the Hub. The only requirements for the Jupyter
notebook images that may be used with this instance of Hub is
that notebook images must have the same version of JupyterHub installed
(0.8.1 by default), and there must be a standard `start-singleuser.sh` accessible
via the default `PATH`.

### GitHub OAuth Setup

After creating the initial Hub and exposing it on a public IP address, you can add GitHub based authentication. First, you'll need to create a [GitHub oauth application](https://github.com/settings/applications/new). The callback URL would be of the form `http://xx.yy.zz.ww/hub/oauth_callback`.

Once the GitHub application is created in the GitHub UI, update the
`manifest/config.yaml` with the `callback_url`, `client_id` and `client_secret`
provided by GitHub UI. You should comment out the `DummyAuthenticator` and
set the JupyterHub `authenticator_class` to `GitHubOAuthenticator`. You will
also set the `oauth_callback_url`, `client_id`, and `client_secret` for the
authenticator. An example configuration section might look like:

```commandline
c.JupyterHub.authenticator_class = GitHubOAuthenticator
c.GitHubOAuthenticator.oauth_callback_url = 'http://xx.yy.zz.ww/hub/oauth_callback'
c.GitHubOAuthenticator.client_id = 'client_id_here'
c.GitHubOAuthenticator.client_secret = 'client_secret_here'
```

Finally, you can update the configuration and apply the new configuration by
doing the following:

```commandline
ks apply ${ENVIRONMENT} -c ${COMPONENT_NAME}
kubectl delete pod jupyterhub-0
```

By deleting the old pod, a new pod will come up with the new configuration
and be configured to use the GitHub authenticator you specified in the
previous step. You can additionally modify the JupyterHub configuration to add
whitelists and admin users. For example, to limit the hub to only GitHub users,
user1 and user2, one might use the following configuration:

```commandline
c.Authenticator.whitelist = {'user1', 'user2'}
```

After changing the configuration and `kubectl apply -f config.yaml`, please
note that the JupyterHub pod needs to be restarted before the new configuration
is reflected.
