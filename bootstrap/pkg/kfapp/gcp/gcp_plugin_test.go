package gcp

import (
	kfdefs "github.com/kubeflow/kubeflow/bootstrap/v3/pkg/apis/apps/kfdef/v1alpha1"
	"testing"
)

func TestGcpPluginSpec_IsValid(t *testing.T) {

	type testCase struct {
		input    *GcpPluginSpec
		expected bool
	}

	cases := []testCase{
		{
			// Neither IAP or BasicAuth is set
			input: &GcpPluginSpec{
				Auth: &Auth{},
			},
			expected: false,
		},
		{
			// Both IAP and BasicAuth set
			input: &GcpPluginSpec{
				Auth: &Auth{
					BasicAuth: &BasicAuth{
						Username: "jlewi",
						Password: &kfdefs.SecretRef{
							Name: "somesecret",
						},
					},
					IAP: &IAP{
						OAuthClientId: "jlewi",
						OAuthClientSecret: &kfdefs.SecretRef{
							Name: "somesecret",
						},
					},
				},
			},
			expected: false,
		},

		// Validate basic auth.
		{
			input: &GcpPluginSpec{
				Auth: &Auth{
					BasicAuth: &BasicAuth{
						Username: "jlewi",
						Password: &kfdefs.SecretRef{
							Name: "somesecret",
						},
					},
				},
			},
			expected: true,
		},
		{
			input: &GcpPluginSpec{
				Auth: &Auth{
					BasicAuth: &BasicAuth{
						Username: "jlewi",
					},
				},
			},
			expected: false,
		},

		{
			input: &GcpPluginSpec{
				Auth: &Auth{
					BasicAuth: &BasicAuth{
						Password: &kfdefs.SecretRef{
							Name: "somesecret",
						},
					},
				},
			},
			expected: false,
		},
		// End Validate basic auth.
		// End Validate IAP.
		{
			input: &GcpPluginSpec{
				Auth: &Auth{
					IAP: &IAP{
						OAuthClientId: "jlewi",
						OAuthClientSecret: &kfdefs.SecretRef{
							Name: "somesecret",
						},
					},
				},
			},
			expected: true,
		},
		{
			input: &GcpPluginSpec{
				Auth: &Auth{
					IAP: &IAP{
						OAuthClientId: "jlewi",
					},
				},
			},
			expected: false,
		},
		{
			input: &GcpPluginSpec{
				Auth: &Auth{
					IAP: &IAP{
						OAuthClientSecret: &kfdefs.SecretRef{
							Name: "somesecret",
						},
					},
				},
			},
			expected: false,
		},
	}

	for _, c := range cases {
		isValid, _ := c.input.IsValid()

		// Test they are equal
		if isValid != c.expected {
			pSpec, _ := Pformat(c.input)
			t.Errorf("Spec %v;\n IsValid Got:%v %v", pSpec, isValid, c.expected)
		}
	}
}
