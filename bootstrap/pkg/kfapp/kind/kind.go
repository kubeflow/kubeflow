// Package kind :
// KinD is a lightweight Kubernetes distribution that is meant for
// testing environments and local development. We use this primarily for
// testing the `kfctl_k8s_istio` config and the related components in Kubeflow CI.
// Like KinD, this is NOT meant for production workloads.
// Please refer to MiniKF for a production-ready environment :)
package kind

import (
	"fmt"
	"os"
	"time"

	kfapis "github.com/kubeflow/kubeflow/bootstrap/v3/pkg/apis"
	kftypesv3 "github.com/kubeflow/kubeflow/bootstrap/v3/pkg/apis/apps"
	kfdefs "github.com/kubeflow/kubeflow/bootstrap/v3/pkg/apis/apps/kfdef/v1alpha1"
	"github.com/pkg/errors"
	log "github.com/sirupsen/logrus"
	"sigs.k8s.io/kind/pkg/cluster"
	"sigs.k8s.io/kind/pkg/cluster/create"
	"sigs.k8s.io/kind/pkg/util"
)

type Kind struct {
	KfDef       *kfdefs.KfDef
	Environment string
}

type KindClusterPhase string

const (
	KindPluginName = kftypesv3.Kind
)

func GetPlatform(kfdef *kfdefs.KfDef) (kftypesv3.Platform, error) {
	_kindPlatform := &Kind{
		KfDef:       kfdef,
		Environment: "test", // or development
	}
	return _kindPlatform, nil
}

func (pluginSpec *KindPluginSpec) IsValid() (bool, error) {

	defaultSC := pluginSpec.DefaultStorageClass == ""
	if defaultSC {
		return false, errors.New("default storage class not set")
	}
	return true, nil
}

// Init creates the KinD cluster and sets the KUBECONFIG
func (kind *Kind) Init(resources kftypesv3.ResourceEnum) error {
	fmt.Printf("Kind Plugin Init test...\n")
	// Check for system requirements - docker daemon etc...
	return nil
}

func (kind *Kind) Generate(resources kftypesv3.ResourceEnum) error {
	if err := kind.KfDef.SyncCache(); err != nil {
		log.Errorf("Unable to sync cache: %v", err)
		return errors.WithStack(err)
	}

	pluginSpec := &KindPluginSpec{}
	err := kind.KfDef.GetPluginSpec(KindPluginName, pluginSpec)
	if err != nil {
		return &kfapis.KfError{
			Code:    int(kfapis.INVALID_ARGUMENT),
			Message: fmt.Sprintf("Unable to get Kind plugin spec: %v", err),
		}
	}
	pluginSpec.DefaultStorageClass = "standard"
	fmt.Printf("Kind Plugin Generate test UseBasicAuth set to: %v\n", pluginSpec.UseBasicAuth)
	return nil
}

func (kind *Kind) Apply(resources kftypesv3.ResourceEnum) error {
	fmt.Printf("Kind Plugin Apply test...\n")
	err := CreateKindCluster(kind.KfDef.Name, kind)
	if err != nil {
		return &kfapis.KfError{
			Code:    int(kfapis.INTERNAL_ERROR),
			Message: fmt.Sprintf("Unable to create KinD cluster: %v", err),
		}
	}

	return nil
}

func (kind *Kind) Delete(resources kftypesv3.ResourceEnum) error {
	fmt.Printf("Kind Plugin Delete test...")
	err := DeleteKindCluster(kind.KfDef.Name)
	if err != nil {
		return &kfapis.KfError{
			Code:    int(kfapis.INTERNAL_ERROR),
			Message: fmt.Sprintf("Could not delete KinD cluster: %v", err),
		}
	}
	return nil
}

func CreateKindCluster(clusterName string, kind *Kind) error {
	// Check if the cluster name already exists
	known, err := cluster.IsKnown(clusterName)
	if err != nil {
		return err
	}
	if known {
		log.Infof("Skipping creating a cluster with the name %v, because it already exists", clusterName)
		return nil
	}

	// Create a context for the cluster and validate it
	ctx := cluster.NewContext(clusterName)
	KubeconfigPath := ctx.KubeConfigPath()
	log.Infof("Creating KinD cluster with the kubeconfig placed at: %v", KubeconfigPath)

	kindManifestsDir := kind.KfDef.Status.ReposCache["manifests"].LocalPath + "/kind"
	kindConfigFilePath := kindManifestsDir + "/kind-config.yaml"
	// KinD Node Image version
	//imageName := "kindest/node:v1.15.0@sha256:b4d092fd2b507843dd096fe6c85d06a27a0cbd740a0b32a880fe61aba24bb478"

	// Create KinD cluster
	if err = ctx.Create(
		create.WithConfigFile(kindConfigFilePath),
		//create.WithNodeImage(imageName),
		create.Retain(true),
		create.WaitForReady(time.Duration(60)*time.Second),
	); err != nil {
		if utilErrors, ok := err.(util.Errors); ok {
			for _, problem := range utilErrors.Errors() {
				log.Error(problem)
			}
			return errors.New("aborting due to invalid configuration")
		}
		return errors.Wrap(err, "failed to create cluster")
	}

	// Set Kubeconfig to the newly created cluster
	os.Setenv("KUBECONFIG", KubeconfigPath)
	time.Sleep(30 * time.Second)
	//kindConfigFileBytes, err := ioutil.ReadFile()
	return nil
}

// DeleteKindCluster deletes any KinD cluster with the cluster name
func DeleteKindCluster(clusterName string) error {
	// Check if the cluster exists
	known, err := cluster.IsKnown(clusterName)
	if err != nil {
		return err
	}
	if !known {
		log.Infof("Cluster %v not found!", clusterName)
		return errors.New("cluster could not be deleted")
	}
	clusterContext := cluster.NewContext(clusterName)
	err = clusterContext.Delete()
	if err != nil {
		return err
	}
	log.Infof("Cluster %v deleted successfully.", clusterName)
	return nil
}
