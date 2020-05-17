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

	/* Read the test data from a file if needed

	// create a testdata folder under this package and add files as needed
	file, err := os.Open("./testdata/file.go")
	if err != nil {
		log.Fatal(err)
	}
	*/

	//Table driven tests
	var tests = []struct {
		in       *Binding
		out      string
		hasError bool
	}{
		{getBindingObject("lalith.vaka@zq.msds.kp.org"), "user-lalith-vaka-zq-msds-kp-org-clusterrole-edit", false},
		{getBindingObject("397401@zq.msds.kp.org"), "user-397401-zq-msds-kp-org-clusterrole-edit", false},
		{getBindingObject("lalith.397401@zq.msds.kp.org"), "user-lalith-397401-zq-msds-kp-org-clusterrole-edit", false},
		{getBindingObject("397401.vaka@zq.msds.kp.org"), "user-397401-vaka-zq-msds-kp-org-clusterrole-edit", false},
		{getBindingObject("i397401@zq.msds.kp.org"), "user-i397401-zq-msds-kp-org-clusterrole-edit", false},
	}

	//format := "--- %s: %s (%s)\n"
	for _, tt := range tests {
		s, errorReturned := getBindingName(tt.in)
		if tt.hasError {
			// expected an error
			if errorReturned == nil {
				t.Errorf("got %q, want %q", tt.in, s)
			}
		} else {
			//expected a value
			if s != tt.out {
				t.Errorf("got %q, want %q", s, tt.out)
			}
		}
	}

}
