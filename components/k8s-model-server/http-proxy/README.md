<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [REST API http proxy to tensorflow/serving](#rest-api-http-proxy-to-tensorflowserving)
  - [Why?](#why)
  - [How?](#how)
  - [Requirements.](#requirements)
    - [Predict](#predict)
    - [Classify](#classify)
  - [To Do](#to-do)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# REST API http proxy to tensorflow/serving
----

## Why?

TF serving only supports gRPC, which means you need to have a client to be able to query it.

This component provides web server that proxy http rest api to Tensorflow/Serving grpc.

## How?

The REST Api Spec is similar to [Google Cloud Machine Learning Engine Prediction API](https://cloud.google.com/ml-engine/docs/online-predict).

During [deploying with tensorflow/serving](https://github.com/tensorflow/serving/blob/master/tensorflow_serving/g3doc/serving_advanced.md), user need to specify a `model_name` and `model_version` for any savedModel. Both `model_name` and `model_version` are required to query http-proxy.

## Requirements.

To enable query from http-proxy, we have some requirements for saved model exported. Only two method signature supported, predict and classify. Method signature with predict is used when the input is raw tensor. While classify signature is required if the input is a tf.example.

To pass any binary data through json, we support base64 encoding and decoding, you can simple change your data into a json object with key `'b64'` and value with base64 encode binary.


### Predict

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

In the [example above](#Predict), that corresponds to a [tensorflow savedModel](https://github.com/tensorflow/tensorflow/blob/master/tensorflow/python/saved_model/README.md) with method signature `tensorflow.saved_model.signature_constants.PREDICT_METHOD_NAME`, input params with signature/key `"tf_model_input"` and `"image"` and output params with signature/key `"tf_model_output"`.

While the input json object key is fixed with `"instances"` and output json key is fixed with `"predictions"`.


### Classify

- **URL**: `POST /model/${model_name}:classify`
or
- **URL**: `POST /model/${model_name}/version/${model_version}:classify`

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
{"result":
	{"classifications": [
				{"classes": [{"score": 0.0, "label": "0"}, {"score": 1.0, "label": "1"}]},
				{"classes": [{"score": 0.0, "label": "0"}, {"score": 1.0, "label": "1"}]},
				]}}
```

- **Input and Output Schema**:

In the [example above](#Classify), that corresponds to a [tensorflow savedModel](https://github.com/tensorflow/tensorflow/blob/master/tensorflow/python/saved_model/README.md) with method signature `tensorflow.saved_model.signature_constants.CLASSIFY_METHOD_NAME`, input params with signature/key `"tf_model_input"` and `"image"` and output params with signature/key `"tf_model_output"`.
While the input json object key is fixed with `"instances"` and output json key is fixed with `"result"`.


## To Do

According to [tensorflow/serving/API](https://github.com/tensorflow/serving/blob/master/tensorflow_serving/apis/prediction_service.proto), there are `Regress` and `MultiInference` not supported.
