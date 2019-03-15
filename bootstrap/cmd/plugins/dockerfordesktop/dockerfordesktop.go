package main

import (
	kftypes "github.com/kubeflow/kubeflow/bootstrap/pkg/apis/apps"
	cltypes "github.com/kubeflow/kubeflow/bootstrap/pkg/apis/apps/client/v1alpha1"
	"github.com/kubeflow/kubeflow/bootstrap/pkg/client/dockerfordesktop"
)

func GetKfApp(client *cltypes.Client) kftypes.KfApp {
	return dockerfordesktop.GetKfApp(client)
}
