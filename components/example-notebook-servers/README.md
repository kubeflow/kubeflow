# Example Notebook Servers

> These images are provided as __examples__, and are supported on a best-effort basis.
> <br>
> Contributions are greatly appreciated.

## Images

This chart shows how the images are related to each other (the nodes are clickable links to the Dockerfiles):

```mermaid
graph TD
  Base[<a href='https://github.com/kubeflow/kubeflow/tree/master/components/example-notebook-servers/base'>Base</a>] --> Jupyter[<a href='https://github.com/kubeflow/kubeflow/tree/master/components/example-notebook-servers/jupyter'>Jupyter</a>]
  Base --> Code-Server[<a href='https://github.com/kubeflow/kubeflow/tree/master/components/example-notebook-servers/codeserver'>code-server</a>]
  Base --> RStudio[<a href='https://github.com/kubeflow/kubeflow/tree/master/components/example-notebook-servers/rstudio'>RStudio</a>]
  
  Jupyter --> PyTorch[<a href='https://github.com/kubeflow/kubeflow/tree/master/components/example-notebook-servers/jupyter-pytorch'>PyTorch</a>]
  Jupyter --> SciPy[<a href='https://github.com/kubeflow/kubeflow/tree/master/components/example-notebook-servers/jupyter-scipy'>SciPy</a>]
  Jupyter --> TensorFlow[<a href='https://github.com/kubeflow/kubeflow/tree/master/components/example-notebook-servers/jupyter-tensorflow'>TensorFlow</a>]
  
  Code-Server --> Code-Server-Conda-Python[<a href='https://github.com/kubeflow/kubeflow/tree/master/components/example-notebook-servers/codeserver-python'>Conda Python</a>]
  RStudio --> Tidyverse[<a href='https://github.com/kubeflow/kubeflow/tree/master/components/example-notebook-servers/rstudio-tidyverse'>Tidyverse</a>]

  PyTorch --> PyTorchFull[<a href='https://github.com/kubeflow/kubeflow/tree/master/components/example-notebook-servers/jupyter-pytorch-full'>PyTorch Full</a>]
  TensorFlow --> TensorFlowFull[<a href='https://github.com/kubeflow/kubeflow/tree/master/components/example-notebook-servers/jupyter-tensorflow-full'>TensorFlow Full</a>]

  Jupyter --> PyTorchCuda[<a href='https://github.com/kubeflow/kubeflow/tree/master/components/example-notebook-servers/jupyter-pytorch-cuda'>PyTorch CUDA</a>]
  Jupyter --> TensorFlowCuda[<a href='https://github.com/kubeflow/kubeflow/tree/master/components/example-notebook-servers/jupyter-tensorflow-cuda'>TensorFlow CUDA</a>]

  PyTorchCuda --> PyTorchCudaFull[<a href='https://github.com/kubeflow/kubeflow/tree/master/components/example-notebook-servers/jupyter-pytorch-cuda-full'>PyTorch CUDA Full</a>]
  TensorFlowCuda --> TensorFlowCudaFull[<a href='https://github.com/kubeflow/kubeflow/tree/master/components/example-notebook-servers/jupyter-tensorflow-cuda-full'>TensorFlow CUDA Full</a>]
```

### Base Images

These images provide a common starting point for Kubeflow Notebook containers.

Dockerfile | Container Registry | Notes
--- | --- | ---
[`./base`](./base) | [`kubeflownotebookswg/base`](https://hub.docker.com/r/kubeflownotebookswg/base) | Common Base Image
[`./codeserver`](./codeserver) | [`kubeflownotebookswg/codeserver`](https://hub.docker.com/r/kubeflownotebookswg/codeserver) | [code-server](https://github.com/coder/code-server) (Visual Studio Code)
[`./jupyter`](./jupyter) | [`kubeflownotebookswg/jupyter`](https://hub.docker.com/r/kubeflownotebookswg/jupyter) | [JupyterLab](https://github.com/jupyterlab/jupyterlab)
[`./rstudio`](./rstudio) | [`kubeflownotebookswg/rstudio`](https://hub.docker.com/r/kubeflownotebookswg/rstudio) | [RStudio](https://github.com/rstudio/rstudio)

### Kubeflow Images

These images extend the [base images](#images--base) with common packages used in the real world.

Dockerfile | Container Registry | Notes
--- | --- | ---
[`./codeserver-python`](./codeserver-python) | [`kubeflownotebookswg/codeserver-python`](https://hub.docker.com/r/kubeflownotebookswg/codeserver-python) | code-server + Conda Python
[`./rstudio-tidyverse`](./rstudio-tidyverse) | [`kubeflownotebookswg/rstudio-tidyverse`](https://hub.docker.com/r/kubeflownotebookswg/rstudio-tidyverse) | RStudio + [Tidyverse](https://www.tidyverse.org/)
[`./jupyter-pytorch`](./jupyter-pytorch) | [`kubeflownotebookswg/jupyter-pytorch`](https://hub.docker.com/r/kubeflownotebookswg/jupyter-pytorch) | JupyterLab + PyTorch
[`./jupyter-pytorch-full`](./jupyter-pytorch-full) | [`kubeflownotebookswg/jupyter-pytorch-full`](https://hub.docker.com/r/kubeflownotebookswg/jupyter-pytorch-full) | JupyterLab + PyTorch + Common Packages
[`./jupyter-pytorch-cuda`](./jupyter-pytorch-cuda) | [`kubeflownotebookswg/jupyter-pytorch-cuda`](https://hub.docker.com/r/kubeflownotebookswg/jupyter-pytorch-cuda) | JupyterLab + PyTorch + CUDA
[`./jupyter-pytorch-cuda-full`](./jupyter-pytorch-cuda-full) | [`kubeflownotebookswg/jupyter-pytorch-cuda-full`](https://hub.docker.com/r/kubeflownotebookswg/jupyter-pytorch-cuda-full) | JupyterLab + PyTorch + CUDA + Common Packages
[`./jupyter-scipy`](./jupyter-scipy) | [`kubeflownotebookswg/jupyter-scipy`](https://hub.docker.com/r/kubeflownotebookswg/jupyter-scipy) | JupyterLab + Common Packages
[`./jupyter-tensorflow`](./jupyter-tensorflow) | [`kubeflownotebookswg/jupyter-tensorflow`](https://hub.docker.com/r/kubeflownotebookswg/jupyter-tensorflow) | JupyterLab + TensorFlow
[`./jupyter-tensorflow-full`](./jupyter-tensorflow-full) | [`kubeflownotebookswg/jupyter-tensorflow-full`](https://hub.docker.com/r/kubeflownotebookswg/jupyter-tensorflow-full) | JupyterLab + TensorFlow + Common Packages
[`./jupyter-tensorflow-cuda`](./jupyter-tensorflow-cuda) | [`kubeflownotebookswg/jupyter-tensorflow-cuda`](https://hub.docker.com/r/kubeflownotebookswg/jupyter-tensorflow-cuda) | JupyterLab + TensorFlow + CUDA
[`./jupyter-tensorflow-cuda-full`](./jupyter-tensorflow-cuda-full) | [`kubeflownotebookswg/jupyter-tensorflow-cuda-full`](https://hub.docker.com/r/kubeflownotebookswg/jupyter-tensorflow-cuda-full) | JupyterLab + TensorFlow + CUDA + Common Packages

## Package Installation

Packages installed by users __after spawning__ a Kubeflow Notebook will only last the lifetime of the pod (unless installed into a PVC-backed directory).

To ensure packages are preserved throughout Pod restarts users will need to either:

1. Build [custom images](#custom-images) that include them, or
2. Ensure they are installed in a PVC-backed directory

## Custom Images

You can build your own custom images to use with Kubeflow Notebooks.

The easiest way to ensure your custom image meets the [requirements](#image-requirements) is to extend one of our [base images](#base-images).

### Image Requirements

For a container image to work with Kubeflow Notebooks, it must:

- expose an HTTP interface on port `8888`:
  - kubeflow sets an environment variable `NB_PREFIX` at runtime with the URL path we expect the container be listening under
  - kubeflow uses IFrames, so ensure your application sets `Access-Control-Allow-Origin: *` in HTTP response headers
- run as a user called `jovyan`:
  - the home directory of `jovyan` should be `/home/jovyan`
  - the UID of `jovyan` should be `1000`
- start successfully with an empty PVC mounted at `/home/jovyan`:
  - kubeflow mounts a PVC at `/home/jovyan` to keep state across Pod restarts

### Install Python Packages

You may extend one of the images and install any `pip` or `conda` packages your Kubeflow Notebook users are likely to need.
As a guide, look at [`./jupyter-pytorch-full/Dockerfile`](./jupyter-pytorch-full/Dockerfile) for a `pip install ...` example, and the [`./rstudio-tidyverse/Dockerfile`](./rstudio-tidyverse/Dockerfile) for `conda install ...`.

A common cause of errors is users running `pip install --user ...`, causing the home-directory (which is backed by a PVC) to contain a different or incompatible version of a package contained in  `/opt/conda/...`

### Install Linux Packages

You may extend one of the images and install any `apt-get` packages your Kubeflow Notebook users are likely to need.
Ensure you swap to `root` in the Dockerfile before running `apt-get`, and swap back to `$NB_USER` after.

### Configure S6 Overlay

Some use-cases might require custom scripts to run during the startup of the Notebook Server container, or advanced users might want to add additional services that run inside the container (for example, an Apache or NGINX web server).
To make this easy, we use the [s6-overlay](https://github.com/just-containers/s6-overlay).

The [s6-overlay](https://github.com/just-containers/s6-overlay) differs from other init systems like [tini](https://github.com/krallin/tini).
While `tini` was created to handle a single process running in a container as PID 1, the `s6-overlay` is built to manage multiple processes and allows the creator of the image to determine which process failures should silently restart, and which should cause the container to exit.

#### Create Scripts

Scripts that need to run during the startup of the container can be placed in `/etc/cont-init.d/`, and are executed in ascending alphanumeric order.

An example of a startup script can be found in [`./rstudio/s6/cont-init.d/02-rstudio-env-fix`](./rstudio/s6/cont-init.d/02-rstudio-env-fix).
This script uses the [with-contenv](https://github.com/just-containers/s6-overlay#container-environment) helper so that environment variables (passed to container) are available in the script.
The purpose of this script is to snapshot any `KUBERNETES_*` environment variables into the `Renviron.site` at pod startup, as without these variables `kubectl` does not work.

#### Create Services

Extra services to be monitored by `s6-overlay` should be placed in their own folder under `/etc/services.d/` containing a script called `run` and optionally a finishing script `finish`.

An example of a service can be found in the `run` script of [`.jupyter/s6/services.d/jupyterlab`](./jupyter/s6/services.d/jupyterlab) which is used to start JupyterLab itself.
For more information about the `run` and `finish` scripts, please see the [s6-overlay documentation](https://github.com/just-containers/s6-overlay#writing-a-service-script).

#### Run Services As Root

There may be cases when you need to run a service as root, to do this, you can change the Dockerfile to have `USER root` at the end, and then use `s6-setuidgid` to run the user-facing services as `$NB_USER`.

Our example images run `s6-overlay` as `$NB_USER` (not `root`), meaning any files or scripts related to `s6-overlay` must be owned by the `$NB_USER` user to successfully run.

## Build Images

The server images depend on each other, so you MUST build them in the correct order.

### Build Single Image

You can build a single image (and its dependencies) by running `make` commands in its directory.

For example, to build the [`./jupyter-scipy`](./jupyter-scipy) image:

```bash
# from the root of the repository
cd components/example-notebook-servers/jupyter-scipy

# optionally define a version tag
#  default: sha-{GIT_COMMIT}{GIT_TREE_STATE}
#export TAG="X.Y.Z-patch.N"

# configure the image registry
#  full image name: {REGISTRY}/{IMAGE_NAME}:{TAG}
export REGISTRY="docker.io/MY_USERNAME"

# build and push (current CPU architecture)
make docker-build-dep
make docker-push-dep
```

To build the image for different CPU architectures, you can use the following commands:

```bash
# from the root of the repository
cd components/example-notebook-servers/jupyter-scipy

# optionally define a version tag
#export TAG="X.Y.Z-patch.N"

# configure the image registry
export REGISTRY="docker.io/MY_USERNAME"

# define the image build cache
#  - sets the following build args:
#     cache-from: type=registry,ref={CACHE_IMAGE}:{IMAGE_NAME}
#     cache-to:   type=registry,ref={CACHE_IMAGE}:{IMAGE_NAME},mode=max
#  - currently, this is a requirement for multi-arch builds.
#    you won't have access to push to the upstream cache,
#    so you will need to set your own cache image.
export CACHE_IMAGE="ghcr.io/kubeflow/kubeflow/notebook-servers/build-cache"

# define the architectures to build for
export ARCH="linux/amd64,linux/arm64"

# build and push (multiple CPU architectures)
# requires that `docker buildx` is configured
make docker-build-push-multi-arch-dep
```

### Build All Images

You can build all images (in the correct order) by running a `make` command in the root of this directory.

For example, to build all images:

```bash
# from the root of the repository
cd components/example-notebook-servers

# optionally define a version tag
#export TAG="X.Y.Z-patch.N"

# configure the image registry
export REGISTRY="docker.io/MY_USERNAME"

# build and push (current CPU architecture)
make docker-build
make docker-push
```

To build the images for different CPU architectures, you can use the following commands:

```bash
# from the root of the repository
cd components/example-notebook-servers

# optionally define a version tag
#export TAG="X.Y.Z-patch.N"

# configure the image registry
export REGISTRY="docker.io/MY_USERNAME"

# define the image build cache
export CACHE_IMAGE="ghcr.io/kubeflow/kubeflow/notebook-servers/build-cache"

# define the architectures to build for
export ARCH="linux/amd64,linux/arm64"

# build and push (multiple CPU architectures)
make docker-build-push-multi-arch
```
