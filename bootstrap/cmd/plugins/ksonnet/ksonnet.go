package main

import (
	kftypes "github.com/kubeflow/kubeflow/bootstrap/pkg/apis/apps"
	"github.com/kubeflow/kubeflow/bootstrap/pkg/client/ksonnet"
)

func GetKfApp(options map[string]interface{}) kftypes.KfApp {
	return ksonnet.GetKfApp(options)
}
