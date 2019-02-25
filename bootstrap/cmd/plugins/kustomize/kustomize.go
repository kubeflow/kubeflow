package main

import (
	kftypes "github.com/kubeflow/kubeflow/bootstrap/pkg/apis/apps"
	"github.com/kubeflow/kubeflow/bootstrap/pkg/client/kustomize"
)

func GetKfApp(options map[string]interface{}) kftypes.KfApp {
	return kustomize.GetKfApp(options)
}
