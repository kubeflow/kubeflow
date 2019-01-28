package main

import (
	"fmt"
	kftypes "github.com/kubeflow/kubeflow/bootstrap/pkg/apis/apps"
	"github.com/kubeflow/kubeflow/bootstrap/pkg/client/ksapp"
	"reflect"
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
	for k, v := range options {
		x := reflect.ValueOf(_fooapp.ksApp).Elem().FieldByName(k)
		x.Set(reflect.ValueOf(v))
	}
	return _fooapp
}

func (fooApp *FooApp) writeConfigFile() error {
	//TODO write files under foo_config, k8s_specs
	return nil
}

func (fooApp *FooApp) Apply() error {
	ksApplyErr := fooApp.ksApp.Apply()
	if ksApplyErr != nil {
		return fmt.Errorf("foo apply failed for ksapp: %v", ksApplyErr)
	}
	return nil
}

func (fooApp *FooApp) Delete() error {
	return nil
}

func (fooApp *FooApp) Generate(resources kftypes.ResourceEnum) error {
	ksGenerateErr := fooApp.ksApp.Generate(resources)
	if ksGenerateErr != nil {
		return fmt.Errorf("foo generate failed for ksapp: %v", ksGenerateErr)
	}
	return nil
}

func (fooApp *FooApp) Init() error {
	ksInitErr := fooApp.ksApp.Init()
	if ksInitErr != nil {
		return fmt.Errorf("foo init failed for ksapp: %v", ksInitErr)
	}
	return nil
}
