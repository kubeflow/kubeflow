package app

import (
	"regexp"
	"testing"
)

func TestK8sName(t *testing.T) {

	type Item struct {
		Project string
		Zone    string
		Name    string
	}

	// Generate different items which differ in a single field.
	// We will verify the hashes are unique.
	items := []Item{
		{
			Project: "alpha",
			Name:    "app1",
		},
		{
			Project: "beta",
			Name:    "app1",
		},
		{
			Project: "beta",
			Name:    "app2",
		},
	}

	hashes := make(map[string]int)

	pattern := "kf-[0-9a-z]{45}"

	for _, i := range items {
		h, err := k8sName(i.Name, i.Project)
		if err != nil {
			t.Errorf("Error getting hash for %+v; %v", i, err)
		}

		p, _ := Pformat(i)

		if m, _ := regexp.Match(pattern, []byte(h)); !m {
			t.Errorf("Item: %+v, expected hash to match %+v, got %+v", p, pattern, h)
		}
		if _, ok := hashes[h]; ok {
			t.Errorf("Unexpected collision for %+v", p)
		}
	}

	// Ensure that leaving any field blank returns an error.
	emptyItems := []Item{
		{
			Project: "alpha",
			Name:    "",
		},
		{
			Project: "",
			Name:    "app1",
		},
	}

	for _, i := range emptyItems {
		h, err := k8sName(i.Name, i.Project)

		p, _ := Pformat(i)

		if err == nil {
			t.Errorf("Item %+v; want error; got %v", p, h)
		}
	}
}
