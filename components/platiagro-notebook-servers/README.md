# PlatIAgro Notebook Servers

All Dockerfiles derive from the [base JupyterLab image provided by Kubeflow](https://github.com/kubeflow/kubeflow/tree/master/components/example-notebook-servers), and are compatible for launching from the Kubeflow notebook controller.

## Base Image ready for CPU

To build the image run:
```
docker build --pull -t platiagro-notebook-image:latest -f ./base/Dockerfile.cpu ./base/
```

## Base Image ready for GPU (CUDA)

To build the image run:
```
docker build --pull -t platiagro-notebook-image-gpu:latest -f ./base/Dockerfile.gpu ./base/
```

## Image for PlatIAgro experiment tasks

To build the image run:
```
docker build --pull -t platiagro-experiment-image:latest -f ./experiment/Dockerfile ./experiment/
```

## Image for PlatIAgro deployment tasks

To build the image run:
```
docker build --pull -t platiagro-deployment-image:latest -f ./deployment/Dockerfile ./deployment/
```

## Image for PlatIAgro monitoring tasks

To build the image run:
```
docker build --pull -t platiagro-monitoring-image:latest -f ./monitoring/Dockerfile ./monitoring/
```

**Of course specify whatever repo and image tag you need for your purposes.**
