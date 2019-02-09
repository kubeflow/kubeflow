package foo

import (
	"fmt"
	kftypes "github.com/kubeflow/kubeflow/bootstrap/pkg/apis/apps"
	/* DEBUG
	"github.com/kubeflow/kubeflow/bootstrap/pkg/client/ksonnet"
	-DEBUG */
	// NO_DEBUG
	log "github.com/sirupsen/logrus"
	// NO_DEBUG //
)

// Foo implements KfApp Interface
// It includes ksonnet along with additional Foo types
type Foo struct {
	kftypes.FullKfApp
	//TODO add additional types required for foo platform
}

func GetKfApp(options map[string]interface{}) kftypes.KfApp {
	/* DEBUG
	_ksonnet := ksonnet.GetKfApp(options)
	-DEBUG */
	// NO_DEBUG
	options[string(kftypes.PLATFORM)] = "ksonnet"
	_ksonnet, ksonnetErr := kftypes.LoadPlatform(options)
	if ksonnetErr != nil {
		log.Errorf("loadplatform failed for ksonnet: %v", ksonnetErr)
		return nil
	}
	options[string(kftypes.PLATFORM)] = "foo"
	// NO_DEBUG //
	_foo := &Foo{
		FullKfApp: kftypes.FullKfApp{
			Children: make(map[string]kftypes.KfApp),
		},
	}
	_foo.Children["ksonnet"] = _ksonnet
	return _foo
}

func (foo *Foo) Apply(resources kftypes.ResourceEnum, options map[string]interface{}) error {
	ks := foo.Children["ksonnet"]
	if ks != nil {
		ksonnetlyErr := ks.Apply(resources, options)
		if ksonnetlyErr != nil {
			return fmt.Errorf("foo apply failed for ksonnet: %v", ksonnetlyErr)
		}
	} else {
		return fmt.Errorf("ksonnet not in Children")
	}
	return nil
}

func (foo *Foo) Delete(resources kftypes.ResourceEnum, options map[string]interface{}) error {
	ks := foo.Children["ksonnet"]
	if ks != nil {
		ksDeleteErr := ks.Delete(resources, options)
		if ksDeleteErr != nil {
			return fmt.Errorf("foo delete failed for ksonnet: %v", ksDeleteErr)
		}
	} else {
		return fmt.Errorf("ksonnet not in Children")
	}
	return nil
}

func (foo *Foo) Generate(resources kftypes.ResourceEnum, options map[string]interface{}) error {
	ks := foo.Children["ksonnet"]
	if ks != nil {
		ksGenerateErr := ks.Generate(resources, options)
		if ksGenerateErr != nil {
			return fmt.Errorf("foo generate failed for ksonnet: %v", ksGenerateErr)
		}
	} else {
		return fmt.Errorf("ksonnet not in Children")
	}
	return nil
}

func (foo *Foo) Init(options map[string]interface{}) error {
	ks := foo.Children["ksonnet"]
	if ks != nil {
		ksInitErr := ks.Init(options)
		if ksInitErr != nil {
			return fmt.Errorf("foo init failed for ksonnet: %v", ksInitErr)
		}
	} else {
		return fmt.Errorf("ksonnet not in Children")
	}
	return nil
}
