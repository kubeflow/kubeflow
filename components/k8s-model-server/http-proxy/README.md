# REST API http proxy to tensorflow/serving
----

This project provides web server that proxy http rest api to Tensorflow/Serving grpc.

The REST Api Spec is similar to Google Machine Learning Engine Model Serving.

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
