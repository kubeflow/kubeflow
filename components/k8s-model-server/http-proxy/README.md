# REST API http proxy to tensorflow/serving
----

This component provides web server that proxy http rest api to Tensorflow/Serving grpc.

The REST Api Spec is similar to Google Cloud Machine Learning Engine Prediction API.

# API

## Predict

- **URL**: `POST /model/${model_name}:predict`
or
- **URL**: `POST /model/${model_name}/version/${model_version}:predict`

- **Body**:

```javascript
{'instances': [
		{
		'tf_model_input': 'value1',
                'image': {'b64': 'base64 encoded image content'},
                },
               {
		'tf_model_input': 'value2',
                'image': {'b64': 'another base64 encoded image content'},
	       }
	      ]
}
```

- **Response**:

```javascript
{"predictions": 
	[
	 {"tf_model_output": "pred_value1"}, 
	 {"tf_model_output": "pred_value2"}, 
	]
}

```

- **Input and Output Schema**:

In the example above, that correspones to a [tensorflow savedModel](https://github.com/tensorflow/tensorflow/blob/master/tensorflow/python/saved_model/README.md) with input signature `"tf_model_input"` and `"image"` and output signature `"tf_model_output"`.
While the input json object key is fixed with `"instances"` and output json key is fixed with `"predictions"`.
