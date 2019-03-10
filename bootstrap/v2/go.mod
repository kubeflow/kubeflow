module github.com/kubeflow/kubeflow/bootstrap/v2

go 1.12

require (
	github.com/kubeflow/kubeflow/bootstrap v0.0.0 // indirect
	k8s.io/api/v2 v2.0.0
	k8s.io/apiextensions-apiserver/v2 v2.0.0
	k8s.io/apimachinery/v2 v2.0.0
	k8s.io/client-go/v2 v2.0.0
	sigs.k8s.io/controller-runtime/v2 v2.0.0
)

replace (
	github.com/kubeflow/kubeflow/bootstrap => ../../bootstrap
	k8s.io/api/v2 => /tmp/v2/k8s.io/api/v2
	k8s.io/apiextensions-apiserver/v2 => /tmp/v2/k8s.io/apiextensions-apiserver/v2
	k8s.io/apimachinery/v2 => /tmp/v2/k8s.io/apimachinery/v2
	k8s.io/client-go/v2 => /tmp/v2/k8s.io/client-go/v2
	sigs.k8s.io/controller-runtime/v2 => /tmp/v2/sigs.k8s.io/controller-runtime/v2
)
