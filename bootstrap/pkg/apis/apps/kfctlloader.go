package apps

import (
	kfapis "github.com/kubeflow/kubeflow/bootstrap/v3/pkg/apis"
	kfconfig "github.com/kubeflow/kubeflow/bootstrap/v3/pkg/apis/apps/kfctlconfig"
)

func LoadConfigFromURI(configFile string) (*kfconfig.KfctlConfig, error) {
	return nil, &kfapis.KfError{
		Code:    int(kfapis.INTERNAL_ERROR),
		Message: "Not implemented.",
	}
}

func WriteConfigToFile(config kfconfig.KfctlConfig, path string) error {
	return &kfapis.KfError{
		Code:    int(kfapis.INTERNAL_ERROR),
		Message: "Not implemented.",
	}
}
