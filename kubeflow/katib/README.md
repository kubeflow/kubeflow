# Katib Quickstart

## Deploying Katib

[Katib](https://github.com/kubeflow/katib) is a hyperparameter tuning framework, inspired by
[Google Vizier](https://static.googleusercontent.com/media/research.google.com/ja//pubs/archive/bcb15507f4b52991a0783013df4222240e942381.pdf).

To deploy katib,
```shell
ks pkg install kubeflow/katib@master
ks generate katib katib
ks apply YOUR_ENV -c katib
```

## Using Katib

Create namespace `katib` as the service launches jobs in this namespace.
```
kubectl create namespace katib
```

Currently we are using port-forwarding to access the katib services.
```
kubectl get pod -n kubeflow  # Find your vizier-core and modedb-frontend pods
kubectl port-forward -n kubeflow [vizier-core pod] 6789:6789 &
kubectl port-forward -n kubeflow [modeldb-frontend pod] 3000:3000 &
```

Run the client [script](https://github.com/kubeflow/katib/blob/master/examples/client-example.go)
```
go run client-example.go
```

It should start a study and run two jobs with different parameters.

Go to http://localhost:3000/katib to see the result.
