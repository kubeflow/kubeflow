module github.com/kubeflow/kubeflow/bootstrap/v2

require (
	cloud.google.com/go v0.36.0
	github.com/cenkalti/backoff v2.1.1+incompatible
	github.com/deckarep/golang-set v1.7.1
	github.com/ghodss/yaml v1.0.0
	github.com/go-kit/kit v0.8.0
	github.com/hashicorp/go-getter v1.3.0
	github.com/imdario/mergo v0.3.6
	github.com/ksonnet/ksonnet v0.13.1
	github.com/kubeflow/kubeflow/bootstrap v0.0.0-20190524184928-f077966c2a22
	github.com/mitchellh/go-homedir v1.0.0
	github.com/onrik/logrus v0.2.1
	github.com/prometheus/client_golang v0.9.2
	github.com/sirupsen/logrus v1.4.2
	github.com/spf13/afero v1.2.0
	github.com/spf13/cobra v0.0.3
	github.com/spf13/viper v1.3.1
	golang.org/x/crypto v0.0.0
	golang.org/x/net v0.0.0-20190311183353-d8887717615a
	golang.org/x/oauth2 v0.0.0-20190402181905-9f3314589c9a
	google.golang.org/api v0.1.0
	google.golang.org/genproto v0.0.0-20190201180003-4b09977fb922
	k8s.io/api v0.0.0-20190515023547-db5a9d1c40eb
	k8s.io/api/v2 v2.0.0
	k8s.io/apiextensions-apiserver/v2 v2.0.0
	k8s.io/apimachinery v0.0.0-20190515023456-b74e4c97951f
	k8s.io/apimachinery/v2 v2.0.0
	k8s.io/client-go v11.0.0+incompatible
	k8s.io/client-go/v2 v2.0.0
	sigs.k8s.io/application/v2 v2.0.0-00010101000000-000000000000
	sigs.k8s.io/kustomize/v2 v2.0.0-00010101000000-000000000000
)

replace (
	github.com/Azure/go-autorest => github.com/Azure/go-autorest v9.1.0+incompatible
	github.com/Sirupsen/logrus => github.com/sirupsen/logrus v1.4.2
	github.com/go-openapi/jsonpointer => github.com/go-openapi/jsonpointer v0.17.0
	github.com/go-openapi/jsonreference => github.com/go-openapi/jsonreference v0.17.0
	github.com/go-openapi/spec => github.com/go-openapi/spec v0.18.0
	github.com/go-openapi/swag => github.com/go-openapi/swag v0.17.0
	github.com/kubeflow/kubeflow/bootstrap => ./
	github.com/mitchellh/go-homedir => github.com/mitchellh/go-homedir v1.0.0
	github.com/russross/blackfriday => github.com/russross/blackfriday v1.5.2-0.20180428102519-11635eb403ff // indirect
	golang.org/x/crypto => golang.org/x/crypto v0.0.0-20181203042331-505ab145d0a9
	golang.org/x/net => golang.org/x/net v0.0.0-20180124060956-0ed95abb35c4
	k8s.io/api/v2 => /tmp/v2/k8s.io/api
	k8s.io/apiextensions-apiserver/v2 => /tmp/v2/k8s.io/apiextensions-apiserver
	k8s.io/apimachinery/v2 => /tmp/v2/k8s.io/apimachinery
	k8s.io/apiserver/v2 => /tmp/v2/k8s.io/apiserver
	k8s.io/cli-runtime => k8s.io/cli-runtime v0.0.0-20180907072557-b3b289918979
	k8s.io/client-go/v2 => /tmp/v2/k8s.io/client-go
	k8s.io/kubernetes => k8s.io/kubernetes v1.13.4
	sigs.k8s.io/application/v2 => /tmp/v2/sigs.k8s.io/application
	sigs.k8s.io/controller-runtime => sigs.k8s.io/controller-runtime v0.1.10
	sigs.k8s.io/controller-runtime/v2 => /tmp/v2/sigs.k8s.io/controller-runtime
	sigs.k8s.io/kustomize/v2 => /tmp/v2/sigs.k8s.io/kustomize
)
