module github.com/kubeflow/kubeflow/bootstrap

require (
	cloud.google.com/go v0.34.0
	github.com/BurntSushi/toml v0.3.1 // indirect
	github.com/GeertJohan/go.rice v0.0.0-20181229193832-0af3f3b09a0a // indirect
	github.com/MakeNowJust/heredoc v0.0.0-20171113091838-e9091a26100e // indirect
	github.com/Masterminds/goutils v1.1.0 // indirect
	github.com/Masterminds/semver v1.4.2 // indirect
	github.com/Masterminds/sprig v2.18.0+incompatible // indirect
	github.com/blang/semver v3.5.1+incompatible // indirect
	github.com/cenkalti/backoff v2.1.1+incompatible
	github.com/cyphar/filepath-securejoin v0.2.2 // indirect
	github.com/daaku/go.zipexe v1.0.0 // indirect
	github.com/deckarep/golang-set v1.7.1
	github.com/docker/distribution v2.7.1+incompatible // indirect
	github.com/docker/go-connections v0.4.0 // indirect
	github.com/exponent-io/jsonpath v0.0.0-20151013193312-d6023ce2651d // indirect
	github.com/fatih/camelcase v1.0.0 // indirect
	github.com/ghodss/yaml v1.0.0
	github.com/go-kit/kit v0.8.0
	github.com/go-openapi/jsonpointer v0.18.0
	github.com/go-openapi/jsonreference v0.18.0
	github.com/go-openapi/swag v0.17.2
	github.com/gobwas/glob v0.2.3 // indirect
	github.com/golang/glog v0.0.0-20160126235308-23def4e6c14b
	github.com/google/go-github v17.0.0+incompatible // indirect
	github.com/google/go-jsonnet v0.12.1 // indirect
	github.com/google/go-querystring v1.0.0 // indirect
	github.com/googleapis/gax-go v2.0.2+incompatible // indirect
	github.com/hashicorp/go-getter v1.0.2
	github.com/howeyc/gopass v0.0.0-20170109162249-bf9dde6d0d2c // indirect
	github.com/huandu/xstrings v1.2.0 // indirect
	github.com/imdario/mergo v0.3.6
	github.com/ksonnet/ksonnet v0.13.1
	github.com/ksonnet/ksonnet-lib v0.1.12 // indirect
	github.com/kubeflow/kubeflow/bootstrap/v2 v2.0.0
	github.com/mitchellh/go-homedir v1.0.0
	github.com/mitchellh/go-wordwrap v1.0.0 // indirect
	github.com/onrik/logrus v0.2.1
	github.com/onsi/gomega v1.4.3
	github.com/opencontainers/go-digest v1.0.0-rc1 // indirect
	github.com/opencontainers/image-spec v1.0.1 // indirect
	github.com/pkg/errors v0.8.1 // indirect
	github.com/prometheus/client_golang v0.9.2
	github.com/russross/blackfriday v0.0.0-00010101000000-000000000000 // indirect
	github.com/shazow/go-diff v0.0.0-20160112020656-b6b7b6733b8c // indirect
	github.com/sirupsen/logrus v1.3.0
	github.com/spf13/afero v1.2.0
	github.com/spf13/cobra v0.0.3
	github.com/spf13/pflag v1.0.3
	github.com/spf13/viper v1.3.1
	golang.org/x/crypto v0.0.0
	golang.org/x/net v0.0.0-20190108225652-1e06a53dbb7e
	golang.org/x/oauth2 v0.0.0-20190115181402-5dab4167f31c
	google.golang.org/api v0.1.0
	google.golang.org/genproto v0.0.0-20190111180523-db91494dd46c
	gopkg.in/resty.v1 v1.11.0
	gopkg.in/square/go-jose.v2 v2.3.0 // indirect
	gopkg.in/yaml.v2 v2.2.2
	k8s.io/api v0.0.0-20180308224125-73d903622b73
	k8s.io/api/v2 v2.0.0
	k8s.io/apiextensions-apiserver v0.0.0-20190116054503-cf30b7cf64c2
	k8s.io/apiextensions-apiserver/v2 v2.0.0
	k8s.io/apimachinery v0.0.0-20190111195121-fa6ddc151d63
	k8s.io/apimachinery/v2 v2.0.0
	k8s.io/client-go v7.0.0+incompatible
	k8s.io/client-go/v2 v2.0.0
	k8s.io/helm v2.13.0+incompatible // indirect
	k8s.io/kubernetes v0.0.0-00010101000000-000000000000 // indirect
	k8s.io/utils v0.0.0-20190308190857-21c4ce38f2a7 // indirect
	sigs.k8s.io/controller-runtime v0.1.1
	sigs.k8s.io/controller-runtime/v2 v2.0.0
	sigs.k8s.io/kustomize/v2 v2.0.0-00010101000000-000000000000 // indirect
	vbom.ml/util v0.0.0-20180919145318-efcd4e0f9787 // indirect
)

replace (
	github.com/Azure/go-autorest => github.com/Azure/go-autorest v9.1.0+incompatible
	github.com/go-openapi/jsonpointer => github.com/go-openapi/jsonpointer v0.17.0
	github.com/go-openapi/jsonreference => github.com/go-openapi/jsonreference v0.17.0
	github.com/go-openapi/spec => github.com/go-openapi/spec v0.18.0
	github.com/go-openapi/swag => github.com/go-openapi/swag v0.17.0
	github.com/kubeflow/kubeflow/bootstrap => ../bootstrap
	github.com/kubeflow/kubeflow/bootstrap/v2 => ../bootstrap/v2
	github.com/mitchellh/go-homedir => github.com/mitchellh/go-homedir v1.0.0
	github.com/russross/blackfriday => github.com/russross/blackfriday v1.5.2-0.20180428102519-11635eb403ff // indirect
	golang.org/x/crypto => golang.org/x/crypto v0.0.0-20181203042331-505ab145d0a9
	golang.org/x/net => golang.org/x/net v0.0.0-20180124060956-0ed95abb35c4
	k8s.io/api => k8s.io/api v0.0.0-20180601181742-8b7507fac302
	k8s.io/api/v2 => /tmp/v2/k8s.io/api/v2
	k8s.io/apiextensions-apiserver => k8s.io/apiextensions-apiserver v0.0.0-20180601203502-8e7f43002fec
	k8s.io/apiextensions-apiserver/v2 => /tmp/v2/k8s.io/apiextensions-apiserver/v2
	k8s.io/apimachinery => k8s.io/apimachinery v0.0.0-20180601181227-17529ec7eadb
	k8s.io/apimachinery/v2 => /tmp/v2/k8s.io/apimachinery/v2
	k8s.io/apiserver => k8s.io/apiserver v0.0.0-20180601190550-8378ef881d4f
	k8s.io/cli-runtime => k8s.io/cli-runtime v0.0.0-20180907072557-b3b289918979
	k8s.io/client-go => k8s.io/client-go v7.0.0+incompatible
	k8s.io/client-go/v2 => /tmp/v2/k8s.io/client-go/v2
	k8s.io/kubernetes => k8s.io/kubernetes v1.10.4
	sigs.k8s.io/controller-runtime => sigs.k8s.io/controller-runtime v0.1.1
	sigs.k8s.io/controller-runtime/v2 => /tmp/v2/sigs.k8s.io/controller-runtime/v2
	sigs.k8s.io/kustomize/v2 => /tmp/v2/sigs.k8s.io/kustomize/v2
)
