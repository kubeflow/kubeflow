
This is not an officially supported Google product.

# How to run

```commandline
export IMAGE_NAME=example_image
export IMAGE_LABEL=v1

docker build -t ${IMAGE_NAME}:${IMAGE_LABEL} .
docker run --rm -p 8080:8080 --name "prediction_server" -ti -v local_model_path:/tmp/my_model -e model_path=/tmp/my_model -e prediction_engine=MODEL_SERVER -e framework=tensorflow -e delete_model=True  ${IMAGE_NAME}:${IMAGE_LABEL}
```

