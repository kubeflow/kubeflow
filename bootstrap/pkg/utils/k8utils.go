/*
Copyright (c) 2016-2017 Bitnami
Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at
    http://www.apache.org/licenses/LICENSE-2.0
Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

package utils

import (
	"context"
	"fmt"
	"github.com/ghodss/yaml"
	configtypes "github.com/kubeflow/kubeflow/bootstrap/v3/config"
	kfapis "github.com/kubeflow/kubeflow/bootstrap/v3/pkg/apis"
	kftypes "github.com/kubeflow/kubeflow/bootstrap/v3/pkg/apis/apps"
	"github.com/pkg/errors"
	log "github.com/sirupsen/logrus"
	"io/ioutil"
	"k8s.io/api/core/v1"
	k8serrors "k8s.io/apimachinery/pkg/api/errors"
	metav1 "k8s.io/apimachinery/pkg/apis/meta/v1"
	"k8s.io/apimachinery/pkg/apis/meta/v1/unstructured"
	k8stypes "k8s.io/apimachinery/pkg/types"
	"k8s.io/cli-runtime/pkg/genericclioptions"
	"k8s.io/cli-runtime/pkg/genericclioptions/printers"
	"k8s.io/client-go/kubernetes"
	"k8s.io/client-go/rest"
	kubectlapply "k8s.io/kubernetes/pkg/kubectl/cmd/apply"
	kubectldelete "k8s.io/kubernetes/pkg/kubectl/cmd/delete"
	cmdutil "k8s.io/kubernetes/pkg/kubectl/cmd/util"
	"math/rand"
	"os"
	"path"
	"regexp"
	"sigs.k8s.io/controller-runtime/pkg/client"
	"strings"
	"time"
	// Auth plugins
	_ "k8s.io/client-go/plugin/pkg/client/auth/gcp"
	_ "k8s.io/client-go/plugin/pkg/client/auth/oidc"
)

const (
	YamlSeparator = "(?m)^---[ \t]*$"
	CertDir       = "/opt/ca"
)

func generateRandStr(length int) string {
	chars := "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"
	b := make([]byte, length)
	for i := range b {
		b[i] = chars[rand.Intn(len(chars))]
	}
	return string(b)
}

func CreateResourceFromFile(config *rest.Config, filename string, elems ...configtypes.NameValue) error {
	elemsMap := make(map[string]configtypes.NameValue)
	for _, nv := range elems {
		elemsMap[nv.Name] = nv
	}
	c, err := client.New(config, client.Options{})
	if err != nil {
		return errors.WithStack(err)
	}

	data, err := ioutil.ReadFile(filename)
	if err != nil {
		return errors.WithStack(err)
	}
	splitter := regexp.MustCompile(YamlSeparator)
	objectStrings := splitter.Split(string(data), -1)
	for _, str := range objectStrings {
		if strings.TrimSpace(str) == "" {
			continue
		}
		u := &unstructured.Unstructured{}
		if err := yaml.Unmarshal([]byte(str), u); err != nil {
			return errors.WithStack(err)
		}

		name := u.GetName()
		namespace := u.GetNamespace()
		if namespace == "" {
			if val, exists := elemsMap["namespace"]; exists {
				u.SetNamespace(val.Value)
			} else {
				u.SetNamespace("default")
			}
		}

		log.Infof("Creating %s", name)

		err := c.Get(context.TODO(), k8stypes.NamespacedName{Name: name, Namespace: namespace}, u.DeepCopy())
		if err == nil {
			log.Info("object already exists...")
			continue
		}
		if !k8serrors.IsNotFound(err) {
			return errors.WithStack(err)
		}

		err = c.Create(context.TODO(), u)
		if err != nil {
			return errors.WithStack(err)
		}
	}
	return nil
}

func DeleteResourceFromFile(config *rest.Config, filename string) error {
	c, err := client.New(config, client.Options{})
	if err != nil {
		return errors.WithStack(err)
	}

	data, err := ioutil.ReadFile(filename)
	if err != nil {
		return errors.WithStack(err)
	}
	splitter := regexp.MustCompile(YamlSeparator)
	objectStrings := splitter.Split(string(data), -1)
	for _, str := range objectStrings {
		if strings.TrimSpace(str) == "" {
			continue
		}
		u := &unstructured.Unstructured{}
		if err := yaml.Unmarshal([]byte(str), u); err != nil {
			return errors.WithStack(err)
		}

		name := u.GetName()
		namespace := u.GetNamespace()

		log.Infof("Deleting %s", name)

		err := c.Get(context.TODO(), k8stypes.NamespacedName{Name: name, Namespace: namespace}, u.DeepCopy())
		if k8serrors.IsNotFound(err) {
			log.Info("object already deleted...")
			continue
		}
		if err != nil {
			return errors.WithStack(err)
		}

		err = c.Delete(context.TODO(), u)
		if err != nil {
			return errors.WithStack(err)
		}
	}
	return nil
}

type Apply struct {
	matchVersionKubeConfigFlags *cmdutil.MatchVersionFlags
	factory                     cmdutil.Factory
	clientset                   *kubernetes.Clientset
	options                     *kubectlapply.ApplyOptions
	tmpfile                     *os.File
	stdin                       *os.File
}

func NewApply(namespace string, restConfig *rest.Config) (*Apply, error) {
	configFlags := genericclioptions.NewConfigFlags()
	if restConfig != nil {
		certFile := path.Join(CertDir, generateRandStr(10))
		if err := ioutil.WriteFile(certFile, restConfig.TLSClientConfig.CAData, 0644); err != nil {
			return nil, err
		}
		configFlags.CAFile = &certFile
		configFlags.BearerToken = &(restConfig.BearerToken)
		configFlags.APIServer = &(restConfig.Host)
	}
	apply := &Apply{
		matchVersionKubeConfigFlags: cmdutil.NewMatchVersionFlags(configFlags),
	}
	apply.factory = cmdutil.NewFactory(apply.matchVersionKubeConfigFlags)
	clientset, err := apply.factory.KubernetesClientSet()
	if err != nil {
		return nil, &kfapis.KfError{
			Code:    int(kfapis.INTERNAL_ERROR),
			Message: fmt.Sprintf("could not get clientset Error %v", err),
		}
	}
	apply.clientset = clientset
	err = apply.namespace(namespace)
	if err != nil {
		return nil, err
	}
	return apply, nil
}

func (a *Apply) DefaultProfileNamespace(name string) bool {
	_, nsMissingErr := a.clientset.CoreV1().Namespaces().Get(name, metav1.GetOptions{})
	if nsMissingErr != nil {
		return false
	}
	return true
}

func (a *Apply) Apply(data []byte) error {
	a.tmpfile = a.tempFile(data)
	a.stdin = os.Stdin
	os.Stdin = a.tmpfile
	defer a.cleanup()
	ioStreams := genericclioptions.IOStreams{In: os.Stdin, Out: os.Stdout, ErrOut: os.Stderr}
	a.options = kubectlapply.NewApplyOptions(ioStreams)
	a.options.DeleteFlags = a.deleteFlags("that contains the configuration to apply")
	initializeErr := a.init()
	if initializeErr != nil {
		return &kfapis.KfError{
			Code:    int(kfapis.INTERNAL_ERROR),
			Message: fmt.Sprintf("could not initialize  Error %v", initializeErr),
		}
	}
	err := a.run()
	if err != nil {
		return err
	}
	return nil
}

func (a *Apply) run() error {
	resourcesErr := a.options.Run()
	if resourcesErr != nil {
		cmdutil.CheckErr(resourcesErr)
		return &kfapis.KfError{
			Code:    int(kfapis.INTERNAL_ERROR),
			Message: fmt.Sprintf("Apply.Run  Error %v", resourcesErr),
		}
	}
	return nil
}

func (a *Apply) cleanup() error {
	os.Stdin = a.stdin
	if a.tmpfile != nil {
		if err := a.tmpfile.Close(); err != nil {
			return err
		}
		return os.Remove(a.tmpfile.Name())
	}
	return nil
}

func (a *Apply) init() error {
	var err error
	var o = a.options
	var f = a.factory
	// allow for a success message operation to be specified at print time
	o.ToPrinter = func(operation string) (printers.ResourcePrinter, error) {
		o.PrintFlags.NamePrintFlags.Operation = operation
		if o.DryRun {
			err = o.PrintFlags.Complete("%s (dry run)")
			if err != nil {
				return nil, err
			}
		}
		if o.ServerDryRun {
			err = o.PrintFlags.Complete("%s (server dry run)")
			if err != nil {
				return nil, err
			}
		}
		return o.PrintFlags.ToPrinter()
	}
	o.DiscoveryClient, err = f.ToDiscoveryClient()
	if err != nil {
		return err
	}
	dynamicClient, err := f.DynamicClient()
	if err != nil {
		return err
	}
	o.DeleteOptions = o.DeleteFlags.ToOptions(dynamicClient, o.IOStreams)
	o.ShouldIncludeUninitialized = false
	o.OpenApiPatch = true
	o.OpenAPISchema, _ = f.OpenAPISchema()
	o.Validator, err = f.Validator(false)
	o.Builder = f.NewBuilder()
	o.Mapper, err = f.ToRESTMapper()
	if err != nil {
		return err
	}
	o.DynamicClient, err = f.DynamicClient()
	if err != nil {
		return err
	}
	o.Namespace, o.EnforceNamespace, err = f.ToRawKubeConfigLoader().Namespace()
	if err != nil {
		return err
	}
	return nil
}

func (a *Apply) namespace(namespace string) error {
	log.Infof(string(kftypes.NAMESPACE)+": %v", namespace)
	_, nsMissingErr := a.clientset.CoreV1().Namespaces().Get(namespace, metav1.GetOptions{})
	if nsMissingErr != nil {
		log.Infof("Creating namespace: %v", namespace)
		nsSpec := &v1.Namespace{ObjectMeta: metav1.ObjectMeta{Name: namespace}}
		_, nsErr := a.clientset.CoreV1().Namespaces().Create(nsSpec)
		if nsErr != nil {
			return &kfapis.KfError{
				Code: int(kfapis.INVALID_ARGUMENT),
				Message: fmt.Sprintf("couldn't create %v %v Error: %v",
					string(kftypes.NAMESPACE), namespace, nsErr),
			}
		}
	}
	return nil
}

func (a *Apply) tempFile(data []byte) *os.File {
	tmpfile, err := ioutil.TempFile("/tmp", "kout")
	if err != nil {
		log.Fatal(err)
	}
	if _, err := tmpfile.Write(data); err != nil {
		log.Fatal(err)
	}
	if _, err := tmpfile.Seek(0, 0); err != nil {
		log.Fatal(err)
	}
	return tmpfile
}

func (a *Apply) deleteFlags(usage string) *kubectldelete.DeleteFlags {
	cascade := true
	gracePeriod := -1
	// setup command defaults
	all := false
	force := false
	ignoreNotFound := false
	now := false
	output := ""
	labelSelector := ""
	fieldSelector := ""
	timeout := time.Duration(0)
	wait := true
	filenames := []string{a.tmpfile.Name()}
	recursive := false
	return &kubectldelete.DeleteFlags{
		FileNameFlags:  &genericclioptions.FileNameFlags{Usage: usage, Filenames: &filenames, Recursive: &recursive},
		LabelSelector:  &labelSelector,
		FieldSelector:  &fieldSelector,
		Cascade:        &cascade,
		GracePeriod:    &gracePeriod,
		All:            &all,
		Force:          &force,
		IgnoreNotFound: &ignoreNotFound,
		Now:            &now,
		Timeout:        &timeout,
		Wait:           &wait,
		Output:         &output,
	}
}
