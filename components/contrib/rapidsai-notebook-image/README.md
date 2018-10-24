# RapidsAI notebook

This Dockerfile builds an image that is derived from the latest [RAPIDS image](nvcr.io/nvidia/rapidsai/rapidsai:latest) but which is compatible for launching from the Kubeflow JupyterHub. [RAPIDS](https://devblogs.nvidia.com/gpu-accelerated-analytics-rapids/) uses NVIDIA CUDA for high-performance GPU execution, exposing that GPU parallelism and high memory bandwidth through user-friendly Python interfaces.

Requirements:
* Pascal or better GPU (e.g., Tesla-P100)
* CUDA 9.2 or 10.0

The image provides sample notebooks and data under the `/rapids` directory.

To build the image run:
```
docker build --pull -t kubeflow-rapidsai-notebook:latest .
```
Specify whatever repo and image tag you need for your purposes.
