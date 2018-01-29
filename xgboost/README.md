## Zillow home value prediction using XGBoost

[Zillow](https://www.zillow.com/) has hosted a [Kaggle
competition](https://www.kaggle.com/c/zillow-prize-1) to improve their
[Zestimate](https://www.zillow.com/zestimate/). "Zestimates" are estimated home
values based on 7.5 million statistical and machine learning models that
analyze hundreds of data points on each property. We will do a detailed
walk-through of how to implement a model and make predictions using [Google Kubernetes Engine](https://cloud.google.com/kubernetes-engine/).

### Pre-requisites
Before proceeding ahead you need to have the following pre-requisites:

* Install [Docker](https://docs.docker.com/install/)
* Install [gcloud](https://cloud.google.com/sdk/downloads)

### Dockerfile
We have attached a Dockerfile with this repo which you can use to create a
docker image. We will also be uploading the public image to gcr.io, which you can use to
directly download the image.

```
docker build -t gcr.io/kubeflow-images/zillow_xgb:v1 .
```

Once the above command is successful you should be able to see the docker image

```
docker images
``` 
