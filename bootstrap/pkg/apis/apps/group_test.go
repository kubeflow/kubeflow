package apps

import (
	"testing"
)

func TestEmailToDefaultName(t *testing.T) {
	testCases := [][]string{
		// Strips after @
		[]string{
			"foo@bar.com", "kubeflow-foo",
		},
		// Keep everything if not having @
		[]string{
			"foo", "kubeflow-foo",
		},
		// Doesn't check if it's a valid email address.
		[]string{
			"bar@baz", "kubeflow-bar",
		},
	}

	for _, c := range testCases {
		o := EmailToDefaultName(c[0])
		if o != c[1] {
			t.Errorf("EmailToDefaultName test case error; input: %v; expect %v; get %v", c[0], c[1], o)
		}
	}
}
