package kubeversion

import "testing"

func TestBeta(t *testing.T) {
	cases := []struct {
		expected bool
		in       string
	}{
		{expected: true, in: "1.8.0"},
		{expected: true, in: "v1.8.0"},
		{expected: true, in: "1.8"},
		{expected: true, in: "1.8.4"},
		{expected: true, in: "1.8.5"},
		{expected: false, in: "1.7"},
		{expected: false, in: "1.9.0"},
		{expected: false, in: "1.6.0"},
	}

	for _, tc := range cases {
		t.Run(tc.in, func(t *testing.T) {
			b := Beta(tc.in)
			if b != tc.expected {
				t.Errorf("Beta() got %v; expected %v", b, tc.expected)
			}
		})
	}

}
