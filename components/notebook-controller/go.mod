module github.com/kubeflow/kubeflow/components/notebook-controller

go 1.12

require (
	github.com/go-logr/logr v0.1.0
	github.com/golang/groupcache v0.0.0-20190129154638-5b532d6fd5ef // indirect
	github.com/kubeflow/kubeflow/components/common v0.0.0-00010101000000-000000000000
	github.com/pkg/errors v0.9.1 // indirect
	github.com/prometheus/client_golang v1.0.0
	go.uber.org/atomic v1.4.0 // indirect
	golang.org/x/crypto v0.0.0-20191011191535-87dc89f01550 // indirect
	golang.org/x/sys v0.0.0-20191002063906-3421d5a6bb1c // indirect
	golang.org/x/xerrors v0.0.0-20191011141410-1b5146add898 // indirect
	gopkg.in/check.v1 v1.0.0-20190902080502-41f04d3bba15 // indirect
	gopkg.in/yaml.v2 v2.3.0 // indirect
	k8s.io/api v0.17.3
	k8s.io/apimachinery v0.17.3
	k8s.io/client-go v0.17.3
	sigs.k8s.io/controller-runtime v0.5.0
	sigs.k8s.io/yaml v1.2.0 // indirect
)

replace github.com/kubeflow/kubeflow/components/common => ../common
