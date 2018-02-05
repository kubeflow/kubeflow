# Example usage to run a tensorflow model

Prepare your trained tensorflow SavedModel at `MODEL_PATH`.

```commandline
export IMAGE_NAME=example_image
export IMAGE_LABEL=v1

docker build -t ${IMAGE_NAME}:${IMAGE_LABEL} .
docker run --rm -p 8080:8080 --name "prediction_server" -ti -v ${MODEL_PATH}:/tmp/my_model -e model_path=/tmp/my_model -e prediction_engine=MODEL_SERVER -e framework=tensorflow -e delete_model=True  ${IMAGE_NAME}:${IMAGE_LABEL}
```

## Send prediction
Have your prediction input in a file `input`.
```commandline
curl -d @input localhost:8080
```
