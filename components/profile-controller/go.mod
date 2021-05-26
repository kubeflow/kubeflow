module github.com/kubeflow/kubeflow/components/profile-controller

go 1.13

require (
	github.com/aws/aws-sdk-go v1.28.13
	github.com/cenkalti/backoff v2.2.1+incompatible
	github.com/fsnotify/fsnotify v1.4.9
	github.com/ghodss/yaml v1.0.0
	github.com/go-logr/logr v0.2.1
	github.com/go-logr/zapr v0.3.0 // indirect
	github.com/gogo/protobuf v1.3.1
	github.com/onsi/ginkgo v1.13.0
	github.com/onsi/gomega v1.10.2
	github.com/pkg/errors v0.8.1
	github.com/prometheus/client_golang v1.0.0
	github.com/sirupsen/logrus v1.4.2
	github.com/stretchr/testify v1.4.0
	github.com/tidwall/gjson v1.4.0
	golang.org/x/oauth2 v0.0.0-20190604053449-0f29369cfe45
	google.golang.org/api v0.10.0
	istio.io/api v0.0.0-20200812202721-24be265d41c3
	istio.io/client-go v0.0.0-20200908160912-f99162621a1a
	k8s.io/api v0.18.8
	k8s.io/apimachinery v0.18.8
	k8s.io/client-go v0.18.8
	sigs.k8s.io/controller-runtime v0.6.2
)
