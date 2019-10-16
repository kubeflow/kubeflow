package aws

import (
	kfdefs "github.com/kubeflow/kubeflow/bootstrap/v3/pkg/apis/apps/kfdef/v1alpha1"
)

// AwsPlugin defines the extra data provided by the GCP Plugin in KfDef
type AwsPluginSpec struct {
	Auth *Auth `json:"auth,omitempty"`

	Region string `json:"region,omitempty"`

	Roles []string `json:"roles,omitempty"`
}

type Auth struct {
	BasicAuth *BasicAuth `json:"basicAuth,omitempty"`
	Oidc      *OIDC      `json:"oidc,omitempty"`
	Cognito   *Coginito  `json:"cognito,omitempty"`
}

type BasicAuth struct {
	Username string            `json:"username,omitempty"`
	Password *kfdefs.SecretRef `json:"password,omitempty"`
}

type OIDC struct {
	OidcAuthorizationEndpoint string `json:"oidcAuthorizationEndpoint,omitempty"`
	OidcIssuer                string `json:"oidcIssuer,omitempty"`
	OidcTokenEndpoint         string `json:"oidcTokenEndpoint,omitempty"`
	OidcUserInfoEndpoint      string `json:"oidcUserInfoEndpoint,omitempty"`
	CertArn                   string `json:"certArn,omitempty"`
	OAuthClientId             string `json:"oAuthClientId,omitempty"`
	OAuthClientSecret         string `json:"oAuthClientSecret,omitempty"`
}

type Coginito struct {
	CognitoAppClientId    string `json:"cognitoAppClientId,omitempty"`
	CognitoUserPoolArn    string `json:"cognitoUserPoolArn,omitempty"`
	CognitoUserPoolDomain string `json:"cognitoUserPoolDomain,omitempty"`
	CertArn               string `json:"certArn,omitempty"`
}

// IsValid returns true if the spec is a valid and complete spec.
// If false it will also return a string providing a message about why its invalid.
func (plugin *AwsPluginSpec) IsValid() (bool, string) {
	basicAuthSet := plugin.Auth.BasicAuth != nil
	oidcAuthSet := plugin.Auth.Oidc != nil
	cognitoAuthSet := plugin.Auth.Cognito != nil

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

		if plugin.Auth.Oidc.OidcAuthorizationEndpoint == "" {
			isValid = false
			msg += "OidcAuthorizationEndpoint is required"
		}

		if plugin.Auth.Oidc.OidcIssuer == "" {
			isValid = false
			msg += "OidcIssuer is required"
		}

		if plugin.Auth.Oidc.OidcTokenEndpoint == "" {
			isValid = false
			msg += "OidcTokenEndpoint is required"
		}

		if plugin.Auth.Oidc.OidcUserInfoEndpoint == "" {
			isValid = false
			msg += "OidcUserInfoEndpoint is required"
		}

		if plugin.Auth.Oidc.CertArn == "" {
			isValid = false
			msg += "CertArn is required"
		}

		if plugin.Auth.Oidc.OAuthClientId == "" {
			isValid = false
			msg += "OAuthClientId is required"
		}

		if plugin.Auth.Oidc.OAuthClientSecret == "" {
			isValid = false
			msg += "OAuthClientSecret is required"
		}

		return isValid, msg
	}

	if cognitoAuthSet {
		msg := ""
		isValid := true

		if plugin.Auth.Cognito.CognitoAppClientId == "" {
			isValid = false
			msg += "CognitoAppClientId is required"
		}

		if plugin.Auth.Cognito.CognitoUserPoolArn == "" {
			isValid = false
			msg += "CognitoUserPoolArn is required"
		}

		if plugin.Auth.Cognito.CognitoUserPoolDomain == "" {
			isValid = false
			msg += "CognitoUserPoolDomain is required"
		}

		if plugin.Auth.Cognito.CertArn == "" {
			isValid = false
			msg += "CertArn is required"
		}

		return isValid, msg
	}

	// return false, "Either BasicAuth, ODC or Cognito must be set"
	// TODO: BasicAuth is configured to be working in AWS env. Let's add validation back once it's supported.
	return true, ""

}
