module github.com/kubeflow/kubeflow/components/notebook-controller

go 1.17

require (
	github.com/go-logr/logr v0.1.0
	github.com/kubeflow/kubeflow/components/common v0.0.0-20200908101143-7f5e242f4671
	github.com/onsi/ginkgo v1.12.1
	github.com/onsi/gomega v1.10.1
	github.com/prometheus/client_golang v0.9.0
	k8s.io/api v0.0.0-20190409021203-6e4e0e4f393b
	k8s.io/apimachinery v0.0.0-20190404173353-6a84e37a896d
	k8s.io/client-go v11.0.1-0.20190409021438-1a26190bd76a+incompatible
	sigs.k8s.io/controller-runtime v0.2.0
)

require (
	cloud.google.com/go v0.26.0 // indirect
	github.com/beorn7/perks v0.0.0-20180321164747-3a771d992973 // indirect
	github.com/davecgh/go-spew v1.1.1 // indirect
	github.com/evanphx/json-patch v4.5.0+incompatible // indirect
	github.com/fsnotify/fsnotify v1.4.7 // indirect
	github.com/go-logr/zapr v0.1.0 // indirect
	github.com/gogo/protobuf v1.2.1 // indirect
	github.com/golang/groupcache v0.0.0-20180513044358-24b0969c4cb7 // indirect
	github.com/golang/protobuf v1.4.2 // indirect
	github.com/google/gofuzz v0.0.0-20170612174753-24818f796faf // indirect
	github.com/googleapis/gnostic v0.2.0 // indirect
	github.com/hashicorp/golang-lru v0.0.0-20180201235237-0fb14efe8c47 // indirect
	github.com/imdario/mergo v0.3.6 // indirect
	github.com/json-iterator/go v1.1.6 // indirect
	github.com/matttproud/golang_protobuf_extensions v1.0.1 // indirect
	github.com/modern-go/concurrent v0.0.0-20180306012644-bacd9c7ef1dd // indirect
	github.com/modern-go/reflect2 v1.0.1 // indirect
	github.com/nxadm/tail v1.4.4 // indirect
	github.com/pborman/uuid v0.0.0-20170612153648-e790cca94e6c // indirect
	github.com/pkg/errors v0.8.1 // indirect
	github.com/prometheus/client_model v0.0.0-20180712105110-5c3871d89910 // indirect
	github.com/prometheus/common v0.0.0-20180801064454-c7de2306084e // indirect
	github.com/prometheus/procfs v0.0.0-20180725123919-05ee40e3a273 // indirect
	github.com/spf13/pflag v1.0.3 // indirect
	go.uber.org/atomic v1.3.2 // indirect
	go.uber.org/multierr v1.1.0 // indirect
	go.uber.org/zap v1.9.1 // indirect
	golang.org/x/crypto v0.0.0-20190308221718-c2843e01d9a2 // indirect
	golang.org/x/net v0.0.0-20200520004742-59133d7f0dd7 // indirect
	golang.org/x/oauth2 v0.0.0-20180821212333-d2e6202438be // indirect
	golang.org/x/sys v0.0.0-20200323222414-85ca7c5b95cd // indirect
	golang.org/x/text v0.3.2 // indirect
	golang.org/x/time v0.0.0-20180412165947-fbb02b2291d2 // indirect
	golang.org/x/xerrors v0.0.0-20191204190536-9bdfabe68543 // indirect
	gomodules.xyz/jsonpatch/v2 v2.0.1 // indirect
	google.golang.org/appengine v1.1.0 // indirect
	google.golang.org/protobuf v1.23.0 // indirect
	gopkg.in/fsnotify.v1 v1.4.7 // indirect
	gopkg.in/inf.v0 v0.9.1 // indirect
	gopkg.in/tomb.v1 v1.0.0-20141024135613-dd632973f1e7 // indirect
	gopkg.in/yaml.v2 v2.3.0 // indirect
	k8s.io/apiextensions-apiserver v0.0.0-20190409022649-727a075fdec8 // indirect
	k8s.io/klog v0.3.0 // indirect
	k8s.io/kube-openapi v0.0.0-20180731170545-e3762e86a74c // indirect
	k8s.io/utils v0.0.0-20190506122338-8fab8cb257d5 // indirect
	sigs.k8s.io/testing_frameworks v0.1.1 // indirect
	sigs.k8s.io/yaml v1.1.0 // indirect
)

// Ensure we build the notebook-controller with the latest `common`
// module. However, because this module's `replace` will be ignored by
// other modules, we still specify a commit in the `require` directive.
replace github.com/kubeflow/kubeflow/components/common => ../common
