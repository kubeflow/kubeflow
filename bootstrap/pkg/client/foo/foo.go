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
	Ksonnet kftypes.KfApp
	//TODO add additional types required for foo platform
}

func GetKfApp(options map[string]interface{}) kftypes.KfApp {
	/* DEBUG
	ksonnet := ksonnet.GetKfApp(options)
	-DEBUG */
	// NO_DEBUG
	options[string(kftypes.PLATFORM)] = "ksonnet"
	ksonnet, ksonnetErr := kftypes.LoadPlatform(options)
	if ksonnetErr != nil {
		log.Errorf("loadplatform failed for ksonnet: %v", ksonnetErr)
		return nil
	}
	options[string(kftypes.PLATFORM)] = "foo"
	// NO_DEBUG //
	_foo := &Foo{
		Ksonnet: ksonnet,
	}
	return _foo
}

func (foo *Foo) Apply(resources kftypes.ResourceEnum, options map[string]interface{}) error {
	ksonnetlyErr := foo.Ksonnet.Apply(resources, options)
	if ksonnetlyErr != nil {
		return fmt.Errorf("foo apply failed for ksonnet: %v", ksonnetlyErr)
	}
	return nil
}

func (foo *Foo) Delete(resources kftypes.ResourceEnum, options map[string]interface{}) error {
	ksDeleteErr := foo.Ksonnet.Delete(resources, options)
	if ksDeleteErr != nil {
		return fmt.Errorf("foo delete failed for ksonnet: %v", ksDeleteErr)
	}
	return nil
}

func (foo *Foo) Generate(resources kftypes.ResourceEnum, options map[string]interface{}) error {
	ksGenerateErr := foo.Ksonnet.Generate(resources, options)
	if ksGenerateErr != nil {
		return fmt.Errorf("foo generate failed for ksonnet: %v", ksGenerateErr)
	}
	return nil
}

func (foo *Foo) Init(options map[string]interface{}) error {
	ksInitErr := foo.Ksonnet.Init(options)
	if ksInitErr != nil {
		return fmt.Errorf("foo init failed for ksonnet: %v", ksInitErr)
	}
	return nil
}
