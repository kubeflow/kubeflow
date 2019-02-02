# Kaggle notebook

This Dockerfile builds an image that is derived from the latest [Kaggle python image](https://github.com/Kaggle/docker-python) but which is compatible for launching from the Kubeflow JupyterHub. [Kaggle](https://www.kaggle.com/) is the home of data science collaboration and competition.

Important notes:
* this notebook is not curated by the Kubeflow project and is not regularly tested
* the versions of TensorFlow, PyTorch, and the other libraries included may change at any time
* this is a very large notebook, over 21 Gb in size. Since our notebook uses the latest Kaggle image, docker pulls (and notebook launches) can take a lengthy period of time.
* the base image size for docker devicemapper is 10 Gb, which won't be large enough to run this image. Your docker daemon must be configured for at least 30 Gb (`-storage-opt dm.basesize=30G`) or use a storage driver like overlay2.
* the Kaggle image includes TensorFlow 1.9 or greater built with AVX2 support, so the image may not run on older CPU
* the other Kubeflow curated notebooks have the feature that the jovyan user is able to install new packages from pip or conda. Unfortunately this is not the case with the Kaggle image due to the impact on the image size due to adding a new ownership layer.

To build the image run:
```
docker build --pull -t kubeflow-kaggle-notebook:latest .
```
Of course specify whatever repo and image tag you need for your purposes.
