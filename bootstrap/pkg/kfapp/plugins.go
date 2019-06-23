package kfapp

import (
	kfdefs "github.com/kubeflow/kubeflow/bootstrap/v2/pkg/apis/apps/kfdef/v1alpha1"
)

// Constants defining common plugin parameters

const (
	// Constants related to basic auth
	BasicAuthPluginName = "basicAuth"
	UsernameParamName   = "username"
	PasswordParamName   = "password"
)

// GetUsername returns the username to use for basic auth.
func GetBasicAuthUsername(s kfdefs.KfDefSpec) (string, error) {
	// TODO(jlewi): This is a bit of a hack. The problem is that types like Gcp are not KfDef but instead
	// contains an embedded KfDef inside it.
	d := &kfdefs.KfDef{
		Spec: s,
	}
	return d.GetPluginParameter(BasicAuthPluginName, UsernameParamName)
}

// GetPassword returns the password to use for basic auth.
func GetBasicAuthPassword(s kfdefs.KfDefSpec) (string, error) {
	// TODO(jlewi): This is a bit of a hack. The problem is that types like Gcp are not KfDef but instead
	// contains an embedded KfDef inside it.
	d := &kfdefs.KfDef{
		Spec: s,
	}
	return d.GetPluginParameter(BasicAuthPluginName, PasswordParamName)
}
