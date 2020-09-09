module github.com/kubeflow/kubeflow/components/notebook-controller

go 1.12

require (
	github.com/go-logr/logr v0.1.0
	github.com/golang/groupcache v0.0.0-20190129154638-5b532d6fd5ef // indirect
	github.com/kubeflow/kubeflow/components/common v0.0.0-00010101000000-000000000000
	github.com/prometheus/client_golang v1.0.0
	go.uber.org/atomic v1.4.0 // indirect
	golang.org/x/net v0.0.0-20200226121028-0de0cce0169b // indirect
	golang.org/x/xerrors v0.0.0-20191204190536-9bdfabe68543 // indirect
	k8s.io/api v0.17.2
	k8s.io/apimachinery v0.17.2
	k8s.io/client-go v0.17.2
	sigs.k8s.io/controller-runtime v0.5.0
)

replace github.com/kubeflow/kubeflow/components/common => ../common
