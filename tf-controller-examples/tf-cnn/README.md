# Training TF CNN models

This directory contains code to train convolutional
neural networks using [tf_cnn_benchmarks](https://github.com/tensorflow/benchmarks/tree/master/scripts/tf_cnn_benchmarks)
which is optimized for performance.


The jobs can be run on a cluster just by running kubectl

e.g.

```
kubectl create -f tf_job_gpu.yaml
```

By default the examples run using synthetic data and save the trained model
inside the container.