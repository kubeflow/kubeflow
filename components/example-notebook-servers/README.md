# Example Notebook Servers

> 🛑️️ Images are provided as __examples__ and are supported on a best-effort basis.
> Contributions are greatly appreciated.

## Images

### Images // Base

These images provide a common starting point for Kubeflow Notebook containers.
See the [custom images guide](#custom-images) to learn how to extend them with your own packages.

Dockerfile | Registry | Notes
--- | --- | ---
[./base](./base) | [`kubeflownotebookswg/base:{TAG}`](https://gallery.ecr.aws/j1r0q0g6/notebooks/notebook-servers/base) | common base image
[./codeserver](./codeserver) | [`kubeflownotebookswg/codeserver:{TAG}`](https://gallery.ecr.aws/j1r0q0g6/notebooks/notebook-servers/codeserver) | base [code-server](https://github.com/cdr/code-server) (Visual Studio Code) image
[./jupyter](./jupyter) | [`kubeflownotebookswg/jupyter:{TAG}`](https://gallery.ecr.aws/j1r0q0g6/notebooks/notebook-servers/jupyter) | base [JupyterLab](https://github.com/jupyterlab/jupyterlab) image
[./rstudio](./rstudio) | [`kubeflownotebookswg/rstudio:{TAG}`](https://gallery.ecr.aws/j1r0q0g6/notebooks/notebook-servers/rstudio) | base [RStudio](https://github.com/rstudio/rstudio) image

### Images // Full

These images extend the [base images](#images--base) with common packages used in the real world.

Dockerfile | Registry | Notes
--- | --- | ---
[./codeserver-python](./codeserver-python) | [`kubeflownotebookswg/codeserver-python:{TAG}`](https://gallery.ecr.aws/j1r0q0g6/notebooks/notebook-servers/codeserver-python) | code-server (Visual Studio Code) + Conda Python
[./jupyter-pytorch (CPU)](./jupyter-pytorch) | [`kubeflownotebookswg/jupyter-pytorch:{TAG}`](https://gallery.ecr.aws/j1r0q0g6/notebooks/notebook-servers/jupyter-pytorch) | JupyterLab + PyTorch (CPU)
[./jupyter-pytorch (CUDA)](./jupyter-pytorch) | [`kubeflownotebookswg/jupyter-pytorch-cuda:{TAG}`](https://gallery.ecr.aws/j1r0q0g6/notebooks/notebook-servers/jupyter-pytorch-cuda) | JupyterLab + PyTorch (CUDA)
[./jupyter-pytorch-full (CPU)](./jupyter-pytorch-full) | [`kubeflownotebookswg/jupyter-pytorch-full:{TAG}`](https://gallery.ecr.aws/j1r0q0g6/notebooks/notebook-servers/jupyter-pytorch-full) | JupyterLab + PyTorch (CPU) + [common](./jupyter-pytorch-full/requirements.txt) packages
[./jupyter-pytorch-full (CUDA)](./jupyter-pytorch-full) | [`kubeflownotebookswg/jupyter-pytorch-cuda-full:{TAG}`](https://gallery.ecr.aws/j1r0q0g6/notebooks/notebook-servers/jupyter-pytorch-cuda-full) | JupyterLab + PyTorch (CUDA) + [common](./jupyter-pytorch-full/requirements.txt) packages
[./jupyter-scipy](./jupyter-scipy) | [`kubeflownotebookswg/jupyter-scipy:{TAG}`](https://gallery.ecr.aws/j1r0q0g6/notebooks/notebook-servers/jupyter-scipy) | JupyterLab + [SciPy](https://www.scipy.org/) packages
[./jupyter-tensorflow (CPU)](./jupyter-tensorflow) | [`kubeflownotebookswg/jupyter-tensorflow:{TAG}`](https://gallery.ecr.aws/j1r0q0g6/notebooks/notebook-servers/jupyter-tensorflow) | JupyterLab + TensorFlow (CPU)
[./jupyter-tensorflow (CUDA)](./jupyter-tensorflow) | [`kubeflownotebookswg/jupyter-tensorflow-cuda:{TAG}`](https://gallery.ecr.aws/j1r0q0g6/notebooks/notebook-servers/jupyter-tensorflow-cuda) | JupyterLab + TensorFlow (CUDA)
[./jupyter-tensorflow-full (CPU)](./jupyter-tensorflow-full) | [`kubeflownotebookswg/jupyter-tensorflow-full:{TAG}`](https://gallery.ecr.aws/j1r0q0g6/notebooks/notebook-servers/jupyter-tensorflow-full) | JupyterLab + TensorFlow (CPU) + [common](./jupyter-tensorflow-full/requirements.txt) packages
[./jupyter-tensorflow-full (CUDA)](./jupyter-tensorflow-full) | [`kubeflownotebookswg/jupyter-tensorflow-cuda-full:{TAG}`](https://gallery.ecr.aws/j1r0q0g6/notebooks/notebook-servers/jupyter-tensorflow-cuda-full) | JupyterLab + TensorFlow (CUDA) + [common](./jupyter-tensorflow-full/requirements.txt) packages
[./rstudio-tidyverse](./rstudio-tidyverse) | [`kubeflownotebookswg/rstudio-tidyverse:{TAG}`](https://gallery.ecr.aws/j1r0q0g6/notebooks/notebook-servers/rstudio-tidyverse) | RStudio + [Tidyverse](https://www.tidyverse.org/) packages

### Images // Relationship Chart

This chart shows how the images are related to each other.

![flow-chart of kubeflow notebook server images](image-flow-chart.png)

### Images // Important Information

- make your [custom images](#custom-images) by extending one of the [base images](#images--base)
- images run as the `jovyan` user
- images use the [s6-overlay](https://github.com/just-containers/s6-overlay) init system to manage processes

---

## Custom Images

Packages installed by users __after spawning__ a Kubeflow Notebook will only last the lifetime of the pod (unless installed into a PVC-backed directory).
To ensure packages are preserved throughout Pod restarts users will need to either:
1. Build custom images that include them, or
2. Ensure they are installed in a PVC-backed directory

### Custom Images // Python Packages

> ⚠️ a common cause of errors is users running `pip install --user ...`, causing the home-directory (which is backed by a PVC) to contain a different or incompatible version of a package contained in  `/opt/conda/...`

Extend one of the base images and install any `pip` or `conda` packages your Kubeflow Notebook users are likely to need.

As a guide, look at [jupyter-pytorch-full.cpu](./jupyter-pytorch-full/cpu.Dockerfile) for a `pip install ...` example, and the [rstudio-tidyverse](./rstudio-tidyverse/Dockerfile) for `conda install ...`.


### Custom Images // Linux Packages

> ⚠️ ensure you swap to `root` in the Dockerfile before running `apt-get`, and swap back to `jovyan` after.

Extend one of the base images and install any `apt-get` packages your Kubeflow Notebook users are likely to need.

### Custom Images // S6

Some use-cases might require custom scripts to run during the startup of the Notebook Server container, or advanced users might want to add additional services that run inside the container (for example, an Apache or NGINX web server).
To make this easy, we use the [s6-overlay](https://github.com/just-containers/s6-overlay).

The [s6-overlay](https://github.com/just-containers/s6-overlay) differs from other init systems like [tini](https://github.com/krallin/tini).
While `tini` was created to handle a single process running in a container as PID 1, the `s6-overlay` is built to manage multiple processes and allows the creator of the image to determine which process failures should silently restart, and which should cause the container to exit.

#### Custom Images // S6 // Scripts

Scripts that need to run during the startup of the container can be placed in `/etc/cont-init.d/`, and are executed in ascending alphanumeric order.

An example of a startup script can be found in [./rstudio/s6/cont-init.d/02-rstudio-env-fix](./rstudio/s6/cont-init.d/02-rstudio-env-fix).
This script uses the [with-contenv](https://github.com/just-containers/s6-overlay#container-environment) helper so that environment variables (passed to container) are available in the script.
The purpose of this script is to snapshot any `KUBERNETES_*` environment variables into the `Renviron.site` at pod startup, as without these variables `kubectl` does not work.

#### Custom Images // S6 // Services

Extra services to be monitored by `s6-overlay` should be placed in their own folder under `/etc/services.d/` containing a script called `run` and optionally a finishing script `finish`.

For more information about the `run` and `finish` scripts, please see the [s6-overlay documentation](https://github.com/just-containers/s6-overlay#writing-a-service-script).

An example of a service can be found in the `run` script of [jupyter/s6/services.d/jupyterlab](jupyter/s6/services.d/jupyterlab) which is used to start JupyterLab itself.

#### Custom Images // S6 // Run As Root

> ⚠️ our example images run `s6-overlay` as `$NB_USER` (not `root`), meaning any files or scripts related to `s6-overlay` must be owned by the `$NB_USER` user to successfully run

There may be cases when you need to run a service as root, to do this, you can change the Dockerfile to have `USER root` at the end, and then use `s6-setuidgid` to run the user-facing services as `$NB_USER`.

---

## Troubleshooting

### Troubleshooting // Jupyter

__Kernel stuck in `connecting` state:__

This is a problem that occurs from time to time and is not a Kubeflow problem, but rather a browser.
It can be identified by looking in the browser error console, which will show errors regarding the websocket not connecting.
To solve the problem, please restart your browser or try using a different browser.
