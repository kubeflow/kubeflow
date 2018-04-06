// Copyright 2018 The ksonnet authors
//
//
//    Licensed under the Apache License, Version 2.0 (the "License");
//    you may not use this file except in compliance with the License.
//    You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
//    Unless required by applicable law or agreed to in writing, software
//    distributed under the License is distributed on an "AS IS" BASIS,
//    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
//    See the License for the specific language governing permissions and
//    limitations under the License.

package pipeline

import (
	"io/ioutil"
	"testing"

	"github.com/stretchr/testify/mock"

	"github.com/ksonnet/ksonnet/component"
	cmocks "github.com/ksonnet/ksonnet/component/mocks"
	appmocks "github.com/ksonnet/ksonnet/metadata/app/mocks"
	"github.com/stretchr/testify/require"
	"k8s.io/apimachinery/pkg/apis/meta/v1/unstructured"
)

func TestPipeline_Namespaces(t *testing.T) {
	withPipeline(t, func(p *Pipeline, m *cmocks.Manager, a *appmocks.App) {
		namespaces := []component.Module{}
		m.On("Modules", p.app, "default").Return(namespaces, nil)

		got, err := p.Modules()
		require.NoError(t, err)

		require.Equal(t, namespaces, got)
	})
}

func TestPipeline_EnvParameters(t *testing.T) {
	withPipeline(t, func(p *Pipeline, m *cmocks.Manager, a *appmocks.App) {
		ns := component.NewModule(p.app, "/")
		namespaces := []component.Module{ns}
		m.On("Modules", p.app, "default").Return(namespaces, nil)
		m.On("Module", p.app, "/").Return(ns, nil)
		m.On("NSResolveParams", ns).Return("", nil)
		a.On("EnvironmentParams", "default").Return("{}", nil)

		got, err := p.EnvParameters("/")
		require.NoError(t, err)

		require.Equal(t, "{ }\n", got)
	})
}

func TestPipeline_Components(t *testing.T) {
	withPipeline(t, func(p *Pipeline, m *cmocks.Manager, a *appmocks.App) {
		cpnt := &cmocks.Component{}
		components := []component.Component{cpnt}

		ns := component.NewModule(p.app, "/")
		namespaces := []component.Module{ns}
		m.On("Modules", p.app, "default").Return(namespaces, nil)
		m.On("Module", p.app, "/").Return(ns, nil)
		m.On("NSResolveParams", ns).Return("", nil)
		a.On("EnvironmentParams", "default").Return("{}", nil)
		m.On("Components", ns).Return(components, nil)

		got, err := p.Components(nil)
		require.NoError(t, err)

		require.Equal(t, components, got)
	})
}

func mockComponent(name string) *cmocks.Component {
	c := &cmocks.Component{}
	c.On("Name", true).Return(name)
	return c
}

func TestPipeline_Components_filtered(t *testing.T) {
	withPipeline(t, func(p *Pipeline, m *cmocks.Manager, a *appmocks.App) {

		cpnt1 := mockComponent("cpnt1")
		cpnt2 := mockComponent("cpnt2")
		components := []component.Component{cpnt1, cpnt2}

		ns := component.NewModule(p.app, "/")
		namespaces := []component.Module{ns}
		m.On("Modules", p.app, "default").Return(namespaces, nil)
		m.On("Module", p.app, "/").Return(ns, nil)
		m.On("NSResolveParams", ns).Return("", nil)
		a.On("EnvironmentParams", "default").Return("{}", nil)
		m.On("Components", ns).Return(components, nil)

		got, err := p.Components([]string{"cpnt1"})
		require.NoError(t, err)

		expected := []component.Component{cpnt1}

		require.Equal(t, expected, got)
	})
}

func TestPipeline_Objects(t *testing.T) {
	withPipeline(t, func(p *Pipeline, m *cmocks.Manager, a *appmocks.App) {
		u := []*unstructured.Unstructured{
			{},
		}

		cpnt := &cmocks.Component{}
		cpnt.On("Objects", mock.Anything, "default").Return(u, nil)
		cpnt.On("Name", true).Return("name")
		components := []component.Component{cpnt}

		ns := component.NewModule(p.app, "/")
		namespaces := []component.Module{ns}
		m.On("Modules", p.app, "default").Return(namespaces, nil)
		m.On("Module", p.app, "/").Return(ns, nil)
		m.On("NSResolveParams", ns).Return("", nil)
		a.On("EnvironmentParams", "default").Return("{}", nil)
		m.On("Components", ns).Return(components, nil)

		got, err := p.Objects(nil)
		require.NoError(t, err)

		require.Equal(t, u, got)
	})
}

func TestPipeline_YAML(t *testing.T) {
	withPipeline(t, func(p *Pipeline, m *cmocks.Manager, a *appmocks.App) {
		u := []*unstructured.Unstructured{
			{},
		}

		cpnt := &cmocks.Component{}
		cpnt.On("Objects", mock.Anything, "default").Return(u, nil)
		cpnt.On("Name", true).Return("name")
		components := []component.Component{cpnt}

		ns := component.NewModule(p.app, "/")
		namespaces := []component.Module{ns}
		m.On("Modules", p.app, "default").Return(namespaces, nil)
		m.On("Module", p.app, "/").Return(ns, nil)
		m.On("NSResolveParams", ns).Return("", nil)
		a.On("EnvironmentParams", "default").Return("{}", nil)
		m.On("Components", ns).Return(components, nil)

		r, err := p.YAML(nil)
		require.NoError(t, err)

		got, err := ioutil.ReadAll(r)
		require.NoError(t, err)

		expected := "---\n{}\n"

		require.Equal(t, expected, string(got))
	})
}

func Test_upgradeParams(t *testing.T) {
	in := `local params = import "../../components/params.libsonnet";`
	expected := `local params = std.extVar("__ksonnet/params");`

	got := upgradeParams("default", in)
	require.Equal(t, expected, got)
}

func withPipeline(t *testing.T, fn func(p *Pipeline, m *cmocks.Manager, a *appmocks.App)) {
	a := &appmocks.App{}
	envName := "default"

	manager := &cmocks.Manager{}

	p := New(a, envName, OverrideManager(manager))

	fn(p, manager, a)
}
