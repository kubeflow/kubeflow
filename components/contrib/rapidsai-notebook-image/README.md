# Rapids AI notebook

This Dockerfile builds an image that is derived from the current [RAPIDS image](https://ngc.nvidia.com/catalog/containers) but which is compatible for launching from the Kubeflow JupyterHub. [RAPIDS](https://devblogs.nvidia.com/gpu-accelerated-analytics-rapids/) uses NVIDIA CUDA for high-performance GPU execution, exposing that GPU parallelism and high memory bandwidth through user-friendly Python interfaces. RAPIDS provides several Python API including cuDF, a GPU DataFrame library with a pandas-like API, and cuML, a GPU-accelerated library of machine learning algorithms.

Requirements:

* Pascal or better GPU (e.g., Tesla-P100), ideally with 32 GB
* CUDA 9.2 or higher
* NVIDIA driver 396.44 or higher

The image includes sample notebooks for cuML and cuDF within the sub-directories under `/rapids`.

To build the image run:

```bash
docker build --pull -t kubeflow-rapidsai-notebook:latest .
```

Specify whatever repo and image tag you need for your purposes.

## cuDF E2E notebook

The demonstration of the cuDF API in `E2E.ipynb` performs intensive ETL of Fannie Mae mortgage data that can be downloaded into your notebook. The defaults in the notebook use 8 dask workers (for 8 GPU) and assumes mortgage data for 16 years partitioned across 16 files. This configuration may exceed the capabilities of what you actually have available for GPU count and GPU RAM. Simply change the defaults in notebook cells 2 and 4 to match workers to available GPU and use a reduced span of years and partitions from the mortgage dataset.

## GKE deployment notes

### Driver

It is possible to run this image with the latest NVIDIA drivers available, even if they are not installed yet in GKE. You need to login into your Kubeflow GKE cluster and apply this [daemonset](https://github.com/GoogleCloudPlatform/container-engine-accelerators/blob/master/daemonset.yaml) for the installation of the desired NVIDIA drivers. You must add the following environment variables to the init container in the daemonset YAML:

```yaml
          - name: NVIDIA_DRIVER_VERSION
            value: "410.79"
          - name: IGNORE_MISSING_MODULE_SYMVERS
            value: "1"
```

Once you have applied the new daemonset, you must recycle the GPU nodes in your cluster. Note this is just a temporary solution until such time that newer NVIDIA drivers are added to GKE, and in fact may no longer be applicable at some point in the future.

### Linker

When deploying this Kubeflow image to GKE, you will need to ensure that the `/etc/ld.so.cache` is updated after launch in order to use the cuDF Python API. Simply open a terminal in JupyterHub and execute `ldconfig`. Permissions have been modified in this image to allow the `ld.so.cache` update by the `jovyan` user. cuDF provides shared libs that are currently unable to dynamically resolve their CUDA dependencies from the `LD_LIBRARY_PATH` alone.
