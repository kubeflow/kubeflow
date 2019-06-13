package app

import (
	"regexp"
	"testing"
)

func TestK8sName(t *testing.T) {

	type Item struct {
		Project string
		Zone string
		Name string
	}

	// Generate different items which differ in a single field.
	// We will verify the hashes are unique.
	items := []Item {
		{
			Project: "alpha",
			Zone: "us-east1",
			Name: "app1",
		},
		{
			Project: "beta",
			Zone: "us-east1",
			Name: "app1",
		},
		{
			Project: "alpha",
			Zone: "us-west",
			Name: "app1",
		},
		{
			Project: "alpha",
			Zone: "us-east1",
			Name: "beta",
		},
	}

	hashes := make(map[string] int)

	pattern := "kf-[0-9a-z]{45}"
	for _, i := range(items) {
		h, err := k8sName(i.Name, i.Project, i.Zone)

		if err != nil {
			t.Errorf("Error getting hash for %+v; %v", i, err)
		}

		p, _ := Pformat(i)

		if m,_ := regexp.Match(pattern, []byte(h)); !m {
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
			Zone:    "us-east1",
			Name:    "",
		},
		{
			Project: "alpha",
			Zone:    "",
			Name:    "app1",
		},
		{
			Project: "alpha",
			Zone:    "us-east1",
			Name:    "",
		},
	}

	for _, i := range(emptyItems) {
		h, err := k8sName(i.Name, i.Project, i.Zone)


		p, _ := Pformat(i)

		if err == nil {
			t.Errorf("Item %+v; want error; got %v", p, h)
		}
	}
}