package kfapp

import (
	kfdefs "github.com/kubeflow/kubeflow/bootstrap/v2/pkg/apis/apps/kfdef/v1alpha1"
)

// Constants defining common plugin parameters

const (
	UsernameParamName   = "username"
	PasswordParamName   = "password"
)

// GetUsername returns the username to use for basic auth.
func GetBasicAuthUsername(s kfdefs.KfDefSpec) (string, error) {
	d := &kfdefs.KfDef{
		Spec: s,
	}

	pluginName := d.Spec.Platform
	return d.GetPluginParameter(pluginName, UsernameParamName)
}

// GetPassword returns the password to use for basic auth.
func GetBasicAuthPassword(s kfdefs.KfDefSpec) (string, error) {
	d := &kfdefs.KfDef{
		Spec: s,
	}
	pluginName := d.Spec.Platform
	return d.GetPluginParameter(pluginName, PasswordParamName)
}
