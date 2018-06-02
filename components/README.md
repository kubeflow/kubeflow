# Building images

The Dockerfiles in each component should be parameterized, with parameters stored in a `versions` folder.
This allows us to use `build_image.py` to build all images.

For example
```
python build_image.py --tf_version=1.6 --platform=gpu tf_serving
python build_image.py --tf_version=1.4.1 tf_notebook
```

See `build_image.py` for details.

## Supported versions

### TF Serving
- CPU: 1.4, 1.5, 1.6, 1.7
- GPU: 1.6, 1.7

### TF notebook
- CPU: 1.4.1, 1.5.1, 1.6.0, 1.7.0, 1.8.0
- GPU: 1.4.1, 1.5.1, 1.6.0, 1.7.0, 1.8.0

## Releasing images

`image-releaser` is the ksonnet app of releasing workflows.

For example, to release TF serving images:

```
ks param set --env=releasing tf-serving-workflow name WORKFLOW_NAME
ks param set --env=releasing tf-serving-workflow registry REGISTRY  # default to
gcr.io/kubeflow-images-public

ks apply releasing -c tf-serving-workflow
```

To release TF notebook images, replace tf-serving-workflow with
tf-notebook-workflow.
