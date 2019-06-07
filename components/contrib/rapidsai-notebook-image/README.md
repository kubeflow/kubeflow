# Rapids AI notebook

This Dockerfile builds an image that is derived from the current [RAPIDS image](https://ngc.nvidia.com/catalog/containers) but which is compatible for launching from the Kubeflow notebook controller. [RAPIDS](https://devblogs.nvidia.com/gpu-accelerated-analytics-rapids/) uses NVIDIA CUDA for high-performance GPU execution, exposing that GPU parallelism and high memory bandwidth through user-friendly Python interfaces. RAPIDS provides several Python API including cuDF, a GPU DataFrame library with a pandas-like API, and cuML, a GPU-accelerated library of machine learning algorithms.

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
