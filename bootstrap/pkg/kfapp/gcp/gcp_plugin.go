package gcp

import (
	kfdefs "github.com/kubeflow/kubeflow/bootstrap/v2/pkg/apis/apps/kfdef/v1alpha1"
)

// GcpPlugin defines the extra data provided by the GCP Plugin in KfDef
type GcpPluginSpec struct {
	Auth *Auth `json:"auth,omitempty"`
}

type Auth struct {
	BasicAuth *BasicAuth `json:"basicAuth,omitempty"`
	IAP       *IAP       `json:"iap,omitempty"`
}

type BasicAuth struct {
	Username string            `json:"username,omitempty"`
	Password *kfdefs.SecretRef `json:"password,omitempty"`
}

type IAP struct {
	OAuthClientId     string            `json:"oAuthClientId,omitempty"`
	OAuthClientSecret *kfdefs.SecretRef `json:"oAuthClientSecret,omitempty"`
}

// IsValid returns true if the spec is a valid and complete spec.
// If false it will also return a string providing a message about why its invalid.
func (s *GcpPluginSpec) IsValid() (bool, string) {

	basicAuthSet := s.Auth.BasicAuth == nil
	iapAuthSet := s.Auth.IAP == nil

	if basicAuthSet == iapAuthSet {
		return false, "Exactly one of BasicAuth and IAP must be set; the other should be nil"
	}

	if basicAuthSet {
		msg := ""

		isValid := true

		if s.Auth.BasicAuth.Username == "" {
			isValid = false
			msg += "BasicAuth requires username. "
		}

		if s.Auth.BasicAuth.Password == nil {
			isValid = false
			msg += "BasicAuth requires password. "
		}

		return isValid, msg
	}

	msg := ""
	isValid := true

	if s.Auth.IAP.OAuthClientId == "" {
		isValid = false
		msg += "IAP requires OAuthClientId. "
	}

	if s.Auth.IAP.OAuthClientSecret == nil {
		isValid = false
		msg += "IAP requires OAuthClientSecret. "
	}

	return isValid, msg
}
