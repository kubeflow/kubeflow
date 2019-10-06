package kind

import (
	kfdefs "github.com/kubeflow/kubeflow/bootstrap/v3/pkg/apis/apps/kfdef/v1alpha1"
	kindv1alpha3 "sigs.k8s.io/kind/pkg/apis/config/v1alpha3"
)

type KindPluginSpec struct {
	Auth                *Auth
	UseBasicAuth        bool
	DefaultStorageClass string
	Config              kindv1alpha3.Cluster
	Status              KindClusterStatus
}

type Auth struct {
	BasicAuth *BasicAuth
}

type BasicAuth struct {
	Username string
	Password kfdefs.SecretRef
}

type KindClusterStatus struct {
	Phase   KindClusterPhase
	Message string
	String  string
}

const (
	ClusterPending KindClusterPhase = "Pending"
	ClusterReady   KindClusterPhase = "Ready"
	ClusterDeleted KindClusterPhase = "Deleted"
	ClusterFailed  KindClusterPhase = "Failed"
)
