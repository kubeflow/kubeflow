package aws

import (
	kfdefs "github.com/kubeflow/kubeflow/bootstrap/v2/pkg/apis/apps/kfdef/v1alpha1"
)

// AwsPlugin defines the extra data provided by the GCP Plugin in KfDef
type AwsPluginSpec struct {
	Auth *Auth `json:"auth,omitempty"`

	Region string `json:"region,omitempty"`

	Roles []string `json:"roles,omitempty"`
}

type Auth struct {
	BasicAuth *BasicAuth `json:"basicAuth,omitempty"`
	Oidc      *OIDC      `json:"iap,omitempty"`
}

type BasicAuth struct {
	Username string            `json:"username,omitempty"`
	Password *kfdefs.SecretRef `json:"password,omitempty"`
}

type OIDC struct {
	OAuthClientId     string            `json:"oAuthClientId,omitempty"`
	OAuthClientSecret *kfdefs.SecretRef `json:"oAuthClientSecret,omitempty"`
}

type Coginito struct {
	OAuthClientId     string            `json:"oAuthClientId,omitempty"`
	OAuthClientSecret *kfdefs.SecretRef `json:"oAuthClientSecret,omitempty"`
}

// IsValid returns true if the spec is a valid and complete spec.
// If false it will also return a string providing a message about why its invalid.
func (plugin *AwsPluginSpec) IsValid() (bool, string) {

	basicAuthSet := plugin.Auth.BasicAuth != nil
	oidcAuthSet := plugin.Auth.Oidc != nil

	if basicAuthSet == oidcAuthSet {
		return false, "Exactly one of BasicAuth and IAP must be set; the other should be nil"
	}

	if basicAuthSet {
		msg := ""

		isValid := true

		if plugin.Auth.BasicAuth.Username == "" {
			isValid = false
			msg += "BasicAuth requires username. "
		}

		if plugin.Auth.BasicAuth.Password == nil {
			isValid = false
			msg += "BasicAuth requires password. "
		}

		return isValid, msg
	}

	if oidcAuthSet {
		msg := ""
		isValid := true

		if plugin.Auth.Oidc.OAuthClientId == "" {
			isValid = false
			msg += "IAP requires OAuthClientId. "
		}

		if plugin.Auth.Oidc.OAuthClientSecret == nil {
			isValid = false
			msg += "IAP requires OAuthClientSecret. "
		}

		return isValid, msg
	}

	// aws eks check

	return false, "Either BasicAuth or IAP must be set"
}
