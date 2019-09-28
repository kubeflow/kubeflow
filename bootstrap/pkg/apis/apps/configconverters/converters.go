package configconverters

import (
	kfconfig "github.com/kubeflow/kubeflow/bootstrap/v3/pkg/apis/apps/kfctlconfig"
)

type Converter interface {
	ToKfConfig(appdir string, kfdefBytes []byte) (*kfconfig.KfctlConfig, error)
	ToKfDefSerialized(config kfconfig.KfctlConfig) ([]byte, error)
}
