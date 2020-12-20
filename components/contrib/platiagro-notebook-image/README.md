# PlatIAgro notebook images

This Dockerfile builds an image that is derived from the latest [ubuntu](https://hub.docker.com/_/ubuntu/) but which is compatible for launching from the Kubeflow notebook controller.

Important notes:
* this dockerfile is not curated by the Kubeflow project and is not regularly tested

## Notebook image for CPU

To build the image run:
```
docker build --pull -t platiagro-notebook-image:latest -f Dockerfile.cpu .
```

## Notebook image for GPU

To build the image run:
```
docker build --pull -t platiagro-notebook-image-gpu:latest -f Dockerfile.gpu .
```

## Image for PlatIAgro experiment tasks

To build the image run:
```
docker build --pull -t platiagro-experiment-image:latest -f Dockerfile.experiment .
```

## Image for PlatIAgro deployment tasks

To build the image run:
```
docker build --pull -t platiagro-deployment-image:latest -f Dockerfile.deployment .
```

**Of course specify whatever repo and image tag you need for your purposes.**
