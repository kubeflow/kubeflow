package gcp

import (
	"fmt"
	kfdefs "github.com/kubeflow/kubeflow/bootstrap/v3/pkg/apis/apps/kfdef/v1alpha1"
)

// IsValid checks whether a KfDef is properly configured for GCP.
//
// This function only performs GCP specific checks. Generic checks should be performed by KfDef.IsSpec
//
// TODO(jlewi): Add a unittest.
func IsValid(kfDef kfdefs.KfDef) (bool, string) {
	if kfDef.Spec.Project == "" {
		return false, "KfDef.Spec.Project is required"
	}

	if kfDef.Spec.Zone == "" {
		return false, "KfDef.Spec.Zone is required"
	}

	// Set the GCPPluginSpec.
	pluginSpec := &GcpPluginSpec{}
	if err := (&kfDef).GetPluginSpec(GcpPluginName, pluginSpec); err != nil {
		if kfdefs.IsPluginNotFound(err) {
			return false, fmt.Sprintf("KfDef.Spec.Plugins must contain a plugin named %v of type GcpPluginSpec", GcpPluginName)
		}
		return false, fmt.Sprintf("The plugin named %v could not be desirealized as type GcpPluginSpec; error %v", GcpPluginName, err)
	}

	return pluginSpec.IsValid()
}
