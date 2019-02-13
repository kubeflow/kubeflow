package foo

import (
	"fmt"
	kftypes "github.com/kubeflow/kubeflow/bootstrap/pkg/apis/apps"
	"github.com/kubeflow/kubeflow/bootstrap/pkg/client/ksonnet"
	log "github.com/sirupsen/logrus"
)

// Foo implements KfApp Interface
// It includes ksonnet along with additional Foo types
type Foo struct {
	kftypes.FullKfApp
	//TODO add additional types required for foo platform
}

func GetKfApp(options map[string]interface{}) kftypes.KfApp {
	options[string(kftypes.PLATFORM)] = string(kftypes.KSONNET)
	log.Infof("getting ksonnet platform in foo")
	_ksonnet := ksonnet.GetKfApp(options)
	options[string(kftypes.PLATFORM)] = "foo"
	_foo := &Foo{
		FullKfApp: kftypes.FullKfApp{
			Children: make(map[kftypes.Platform]kftypes.KfApp),
		},
	}
	_foo.Children[kftypes.KSONNET] = _ksonnet
	return _foo
}

func (foo *Foo) Apply(resources kftypes.ResourceEnum, options map[string]interface{}) error {
	ks := foo.Children[kftypes.KSONNET]
	if ks != nil {
		ksonnetlyErr := ks.Apply(resources, options)
		if ksonnetlyErr != nil {
			return fmt.Errorf("foo apply failed for ksonnet: %v", ksonnetlyErr)
		}
	} else {
		return fmt.Errorf("%v not in Children", string(kftypes.KSONNET))
	}
	return nil
}

func (foo *Foo) Delete(resources kftypes.ResourceEnum, options map[string]interface{}) error {
	ks := foo.Children[kftypes.KSONNET]
	if ks != nil {
		ksDeleteErr := ks.Delete(resources, options)
		if ksDeleteErr != nil {
			return fmt.Errorf("foo delete failed for %v: %v", string(kftypes.KSONNET), ksDeleteErr)
		}
	} else {
		return fmt.Errorf("%v not in Children", string(kftypes.KSONNET))
	}
	return nil
}

func (foo *Foo) Generate(resources kftypes.ResourceEnum, options map[string]interface{}) error {
	ks := foo.Children[kftypes.KSONNET]
	if ks != nil {
		ksGenerateErr := ks.Generate(resources, options)
		if ksGenerateErr != nil {
			return fmt.Errorf("foo generate failed for %v: %v", string(kftypes.KSONNET), ksGenerateErr)
		}
	} else {
		return fmt.Errorf("%v not in Children", string(kftypes.KSONNET))
	}
	return nil
}

func (foo *Foo) Init(options map[string]interface{}) error {
	ks := foo.Children[kftypes.KSONNET]
	if ks != nil {
		ksInitErr := ks.Init(options)
		if ksInitErr != nil {
			return fmt.Errorf("foo init failed for %v: %v", string(kftypes.KSONNET), ksInitErr)
		}
	} else {
		return fmt.Errorf("%v not in Children", string(kftypes.KSONNET))
	}
	return nil
}
