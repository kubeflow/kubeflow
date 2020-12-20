module github.com/kubeflow/kubeflow/components/tensorboard-controller

go 1.15

require (
	github.com/go-logr/logr v0.3.0
	github.com/gogo/protobuf v1.3.1
	github.com/kubeflow/kubeflow/components/common v0.0.0
	k8s.io/api v0.19.6
	k8s.io/apimachinery v0.19.6
	k8s.io/client-go v0.19.6
	sigs.k8s.io/controller-runtime v0.7.0
)

replace github.com/kubeflow/kubeflow/components/common => ../common
