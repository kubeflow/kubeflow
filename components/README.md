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
- CPU: 1.4.1, 1.5.1, 1.6.0, 1.7.0
- GPU: 1.4.1, 1.5.1, 1.6.0, 1.7.0
