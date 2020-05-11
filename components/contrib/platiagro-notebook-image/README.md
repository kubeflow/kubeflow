# PlatIAgro notebook

This Dockerfile builds an image that is derived from the latest [ubuntu](https://hub.docker.com/_/ubuntu/) but which is compatible for launching from the Kubeflow notebook controller.

Important notes:
* this notebook is not curated by the Kubeflow project and is not regularly tested

To build the image run:
```
docker build --pull -t kubeflow-platiagro-notebook:latest .
```
Of course specify whatever repo and image tag you need for your purposes.
