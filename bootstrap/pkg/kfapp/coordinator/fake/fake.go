// package fake provides a fake implementation of the coordinator for use in tests
package fake

import (
	kftypes "github.com/kubeflow/kubeflow/bootstrap/pkg/apis/apps"
	gcpFake "github.com/kubeflow/kubeflow/bootstrap/pkg/kfapp/gcp/fake"
	kfdefsv2 "github.com/kubeflow/kubeflow/bootstrap/v2/pkg/apis/apps/kfdef/v1alpha1"
	"path"
)

type FakeCoordinator struct {
	KfDef   *kfdefsv2.KfDef
	Plugins map[string]kftypes.KfApp
}

func (f *FakeCoordinator) Apply(resources kftypes.ResourceEnum) error {
	return nil
}

func (f *FakeCoordinator) Delete(resources kftypes.ResourceEnum) error {
	return nil
}

func (f *FakeCoordinator) Generate(resources kftypes.ResourceEnum) error {
	return nil
}

func (f *FakeCoordinator) Init(resources kftypes.ResourceEnum) error {
	return nil
}

func (f *FakeCoordinator) GetKfDef() *kfdefsv2.KfDef {
	return f.KfDef
}

func (f *FakeCoordinator) GetPlugin(name string) (kftypes.KfApp, bool) {
	a, ok := f.Plugins[name]
	return a, ok
}

type FakeBuilder struct {
}

func (b *FakeBuilder) CreateKfAppCfgFile(def *kfdefsv2.KfDef) (string, error) {
	return path.Join(def.Spec.AppDir, kfdefsv2.KfConfigFile), nil
}

func (b *FakeBuilder) LoadKfAppCfgFile(cfgFile string) (kftypes.KfApp, error) {
	d, err := kfdefsv2.LoadKFDefFromURI(cfgFile)

	if err != nil {
		return nil, err
	}
	f := &FakeCoordinator{
		KfDef:   d,
		Plugins: make(map[string]kftypes.KfApp),
	}

	for _, p := range d.Spec.Plugins {
		if p.Name == kftypes.GCP {
			f.Plugins[kftypes.GCP] = &gcpFake.FakeGcp{}
			break
		}
	}
	return f, nil
}
