package ksonnet

import (
	"io/ioutil"
	"sort"
	"testing"

	"github.com/go-openapi/spec"
	"github.com/ksonnet/ksonnet-lib/ksonnet-gen/kubespec"
	"github.com/pkg/errors"
	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/require"
)

var (
	apiSpecCache = map[string]*spec.Swagger{}
)

func initCatalog(t *testing.T, file string, opts ...CatalogOpt) *Catalog {
	apiSpec := apiSpecCache[file]
	if apiSpec == nil {
		var err error
		apiSpec, _, err = kubespec.Import(testdata(file))
		require.NoError(t, err)

		apiSpecCache[file] = apiSpec
	}

	c, err := NewCatalog(apiSpec, opts...)
	require.NoError(t, err)

	return c
}

func TestCatalog_nil_apiSpec(t *testing.T) {
	_, err := NewCatalog(nil)
	require.Error(t, err)
}

func TestCatalog_Types(t *testing.T) {
	c := initCatalog(t, "swagger-1.8.json")

	resources, err := c.Types()
	require.NoError(t, err)

	var found bool
	for _, resource := range resources {
		if resource.Identifier() == "io.k8s.api.apps.v1beta1.Deployment" {
			found = true
		}
	}

	require.True(t, found)
}

func TestCatalog_Resources_invalid_description(t *testing.T) {
	source, err := ioutil.ReadFile("testdata/invalid_definition.json")
	require.NoError(t, err)

	apiSpec, err := kubespec.CreateAPISpec(source)
	require.NoError(t, err)

	c, err := NewCatalog(apiSpec)
	require.NoError(t, err)

	_, err = c.Types()
	assert.Error(t, err)

	_, err = c.Resource("group", "version", "kind")
	assert.Error(t, err)
}

func TestCatalog_Resources_invalid_field_properties(t *testing.T) {
	fn := func(*Catalog, map[string]spec.Schema, []string) (map[string]Property, error) {
		return nil, errors.New("failed")
	}

	opt := CatalogOptExtractProperties(fn)

	c := initCatalog(t, "swagger-1.8.json", opt)

	_, err := c.Types()
	require.Error(t, err)
}

func TestCatalog_Resource(t *testing.T) {
	cases := []struct {
		name    string
		group   string
		version string
		kind    string
		isErr   bool
	}{
		{name: "valid id", group: "apps", version: "v1beta2", kind: "Deployment"},
		{name: "unknown kind", group: "apps", version: "v1beta2", kind: "Foo", isErr: true},
		{name: "unknown version", group: "apps", version: "Foo", kind: "Foo", isErr: true},
		{name: "unknown group", group: "Foo", version: "Foo", kind: "Foo", isErr: true},
	}

	c := initCatalog(t, "swagger-1.8.json")

	for _, tc := range cases {
		t.Run(tc.name, func(t *testing.T) {
			r, err := c.Resource(tc.group, tc.version, tc.kind)
			if tc.isErr {
				require.Error(t, err)
			} else {
				require.NoError(t, err)

				t.Logf("id is %s", r.Identifier())

				require.Equal(t, tc.group, r.Group())
				require.Equal(t, tc.version, r.Version())
				require.Equal(t, tc.kind, r.Kind())
			}
		})
	}
}

func TestCatalog_Fields(t *testing.T) {
	c := initCatalog(t, "swagger-1.8.json")

	fields, err := c.Fields()
	require.NoError(t, err)

	var found bool
	for _, field := range fields {
		if field.Identifier() == "io.k8s.apimachinery.pkg.apis.meta.v1.ObjectMeta" {
			found = true
		}
	}

	require.True(t, found)
}

func TestCatalog_Fields_invalid_description(t *testing.T) {
	source, err := ioutil.ReadFile("testdata/invalid_definition.json")
	require.NoError(t, err)

	apiSpec, err := kubespec.CreateAPISpec(source)
	require.NoError(t, err)

	c, err := NewCatalog(apiSpec)
	require.NoError(t, err)

	_, err = c.Fields()
	assert.Error(t, err)

	_, err = c.Field("anything")
	assert.Error(t, err)
}

func TestCatalog_Fields_invalid_field_properties(t *testing.T) {
	fn := func(*Catalog, map[string]spec.Schema, []string) (map[string]Property, error) {
		return nil, errors.New("failed")
	}

	opt := CatalogOptExtractProperties(fn)

	c := initCatalog(t, "swagger-1.8.json", opt)

	_, err := c.Fields()
	require.Error(t, err)
}

func TestCatalog_Field(t *testing.T) {
	cases := []struct {
		name  string
		id    string
		isErr bool
	}{
		{name: "valid id", id: "io.k8s.apimachinery.pkg.apis.meta.v1.Initializers"},
		{name: "missing", id: "missing", isErr: true},
	}

	c := initCatalog(t, "swagger-1.8.json")

	for _, tc := range cases {
		t.Run(tc.name, func(t *testing.T) {
			ty, err := c.Field(tc.id)
			if tc.isErr {
				require.Error(t, err)
			} else {
				require.NoError(t, err)

				require.Equal(t, tc.id, ty.Identifier())
			}
		})
	}
}

func TestCatalog_TypesWithDescendant(t *testing.T) {
	c := initCatalog(t, "swagger-1.8.json")

	types, err := c.TypesWithDescendant("io.k8s.api.core.v1.PodSpec")
	require.NoError(t, err)

	var names []string
	for _, ty := range types {
		names = append(names, ty.component.String())
	}

	sort.Strings(names)

	expected := []string{
		"apps.v1beta1.Deployment",
		"apps.v1beta1.StatefulSet",
		"apps.v1beta2.DaemonSet",
		"apps.v1beta2.Deployment",
		"apps.v1beta2.ReplicaSet",
		"apps.v1beta2.StatefulSet",
		"batch.v1.Job",
		"batch.v1beta1.CronJob",
		"batch.v2alpha1.CronJob",
		"core.v1.Pod",
		"core.v1.PodTemplate",
		"core.v1.ReplicationController",
		"extensions.v1beta1.DaemonSet",
		"extensions.v1beta1.Deployment",
		"extensions.v1beta1.ReplicaSet",
	}
	require.Equal(t, expected, names)
}

func TestCatalog_isFormatRef(t *testing.T) {
	cases := []struct {
		name        string
		isFormatRef bool
		isErr       bool
	}{
		{
			name: "io.k8s.apimachinery.pkg.apis.meta.v1.ObjectMeta",
		},
		{
			name:  "missing",
			isErr: true,
		},
		{
			name:        "io.k8s.apimachinery.pkg.util.intstr.IntOrString",
			isFormatRef: true,
		},
	}

	c := initCatalog(t, "swagger-1.8.json")

	for _, tc := range cases {
		t.Run(tc.name, func(t *testing.T) {
			tf, err := c.isFormatRef(tc.name)
			if tc.isErr {
				require.Error(t, err)
			} else {
				require.NoError(t, err)

				require.Equal(t, tc.isFormatRef, tf)
			}
		})
	}
}
