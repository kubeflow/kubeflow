package main

import (
	kftypes "github.com/kubeflow/kubeflow/bootstrap/pkg/apis/apps"
	"github.com/kubeflow/kubeflow/bootstrap/pkg/client/ksonnet"
	"github.com/kubeflow/kubeflow/bootstrap/pkg/client/minikube"
)

func GetKfApp(options map[string]interface{}) kftypes.KfApp {
	_minikubeapp := &minikube.MinikubeApp{
		Ksonnet: ksonnet.GetKfApp(options),
	}
	return _minikubeapp
}
