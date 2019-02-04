package main

import (
	"fmt"
	kftypes "github.com/kubeflow/kubeflow/bootstrap/pkg/apis/apps"
	"github.com/kubeflow/kubeflow/bootstrap/pkg/client/ksapp"
)

// FooApp implements KfApp Interface
// It includes the KsApp along with additional Foo types
type FooApp struct {
	ksApp kftypes.KfApp
	//TODO add additional types required for foo platform
}

func GetKfApp(options map[string]interface{}) kftypes.KfApp {
	_fooapp := &FooApp{
		ksApp: ksapp.GetKfApp(options),
	}
	return _fooapp
}

func (fooApp *FooApp) Schema() interface{} {
	return fooApp.ksApp
}

func (fooApp *FooApp) writeConfigFile() error {
	//TODO write files under foo_config, k8s_specs
	return nil
}

func (fooApp *FooApp) Apply(resources kftypes.ResourceEnum, options map[string]interface{}) error {
	ksApplyErr := fooApp.ksApp.Apply(resources, options)
	if ksApplyErr != nil {
		return fmt.Errorf("foo apply failed for ksapp: %v", ksApplyErr)
	}
	return nil
}

func (fooApp *FooApp) Delete(resources kftypes.ResourceEnum, options map[string]interface{}) error {
	ksDeleteErr := fooApp.ksApp.Delete(resources, options)
	if ksDeleteErr != nil {
		return fmt.Errorf("foo delete failed for ksapp: %v", ksDeleteErr)
	}
	return nil
}

func (fooApp *FooApp) Generate(resources kftypes.ResourceEnum, options map[string]interface{}) error {
	ksGenerateErr := fooApp.ksApp.Generate(resources, options)
	if ksGenerateErr != nil {
		return fmt.Errorf("foo generate failed for ksapp: %v", ksGenerateErr)
	}
	return nil
}

func (fooApp *FooApp) Init(options map[string]interface{}) error {
	ksInitErr := fooApp.ksApp.Init(options)
	if ksInitErr != nil {
		return fmt.Errorf("foo init failed for ksapp: %v", ksInitErr)
	}
	return nil
}
