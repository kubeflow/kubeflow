package kfam

import (
	"testing"

	rbacv1 "k8s.io/api/rbac/v1"
)

// Building Binding Object from k8s.io/api/rbac/v1
func getBindingObject(binding string) *Binding {

	return &Binding{
		User: &rbacv1.Subject{
			Kind: rbacv1.UserKind,
			Name: binding,
		},
		RoleRef: &rbacv1.RoleRef{
			Kind: "clusterrole",
			Name: "edit",
		},
	}

}

func TestGetBindingName(t *testing.T) {
	//Table driven tests
	var tests = []struct {
		name     string
		in       *Binding
		out      string
		hasError bool
	}{
		{"letters", getBindingObject("lalith.vaka@zq.msds.kp.org"), "user-lalith-vaka-zq-msds-kp-org-clusterrole-edit", false},
		{"numbers", getBindingObject("397401@zq.msds.kp.org"), "user-397401-zq-msds-kp-org-clusterrole-edit", false},
		{"letters-numbers", getBindingObject("lalith.397401@zq.msds.kp.org"), "user-lalith-397401-zq-msds-kp-org-clusterrole-edit", false},
		{"numbers-letters", getBindingObject("397401.vaka@zq.msds.kp.org"), "user-397401-vaka-zq-msds-kp-org-clusterrole-edit", false},
		{"lettersnumbers", getBindingObject("i397401@zq.msds.kp.org"), "user-i397401-zq-msds-kp-org-clusterrole-edit", false},
	}

	//format := "--- %s: %s (%s)\n"
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			s, errorReturned := getBindingName(tt.in)
			if tt.hasError {
				// expected an error
				if errorReturned == nil {
					t.Fatalf("Expected error but got none:  input: %q", tt.in)
				}
			} else {
				//expected a value
				if errorReturned != nil {
					t.Fatalf("unExpected occured:  input: %q, errorReturned: %q", tt.in, errorReturned)
				}
				if s != tt.out {
					t.Fatalf("Value different than expected: input: %q, output: %q", s, tt.out)
				}
			}
		})
	}

}
