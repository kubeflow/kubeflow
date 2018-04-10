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

package cluster

import (
	"encoding/json"
	"fmt"
	"sort"

	"github.com/ksonnet/ksonnet/client"
	"github.com/ksonnet/ksonnet/metadata/app"
	"github.com/ksonnet/ksonnet/utils"
	"github.com/pkg/errors"
	log "github.com/sirupsen/logrus"
	kerrors "k8s.io/apimachinery/pkg/api/errors"
	"k8s.io/apimachinery/pkg/api/meta"
	metav1 "k8s.io/apimachinery/pkg/apis/meta/v1"
	"k8s.io/apimachinery/pkg/apis/meta/v1/unstructured"
	"k8s.io/apimachinery/pkg/runtime"
	"k8s.io/apimachinery/pkg/types"
	kdiff "k8s.io/apimachinery/pkg/util/diff"
	"k8s.io/apimachinery/pkg/util/sets"
)

// ApplyConfig is configuration for Apply.
type ApplyConfig struct {
	App            app.App
	ClientConfig   *client.Config
	ComponentNames []string
	Create         bool
	DryRun         bool
	EnvName        string
	GcTag          string
	SkipGc         bool
}

// ApplyOpts are options for configuring Apply.
type ApplyOpts func(a *Apply)

// Apply applies objects to the cluster
type Apply struct {
	ApplyConfig

	// these make it easier to test Apply.
	findObjectsFn         findObjectsFn
	resourceClientFactory resourceClientFactoryFn
	genClientOptsFn       genClientOptsFn
	objectInfo            ObjectInfo
}

// RunApply runs apply against a cluster given a configuration.
func RunApply(config ApplyConfig, opts ...ApplyOpts) error {
	a := &Apply{
		ApplyConfig:           config,
		findObjectsFn:         findObjects,
		resourceClientFactory: resourceClientFactory,
		genClientOptsFn:       genClientOpts,
		objectInfo:            &objectInfo{},
	}

	for _, opt := range opts {
		opt(a)
	}

	return a.Apply()
}

// Apply applies against a cluster.
func (a *Apply) Apply() error {
	apiObjects, err := a.findObjectsFn(a.App, a.EnvName, a.ComponentNames)
	if err != nil {
		return errors.Wrap(err, "find objects")
	}

	sort.Sort(utils.DependencyOrder(apiObjects))

	seenUids := sets.NewString()

	co, err := a.genClientOptsFn(a.App, a.ClientConfig, a.EnvName)
	if err != nil {
		return err
	}

	for _, obj := range apiObjects {
		var uid string
		uid, err = a.handleObject(co, obj)
		if err != nil {
			return errors.Wrap(err, "handle object")
		}

		// Some objects appear under multiple kinds
		// (eg: Deployment is both extensions/v1beta1
		// and apps/v1beta1).  UID is the only stable
		// identifier that links these two views of
		// the same object.
		seenUids.Insert(uid)
	}

	if a.GcTag != "" && !a.SkipGc {
		if err = a.runGc(co, seenUids); err != nil {
			return errors.Wrap(err, "run gc")
		}
	}

	return nil
}

func (a *Apply) handleObject(co clientOpts, obj *unstructured.Unstructured) (string, error) {
	if a.GcTag != "" {
		utils.SetMetaDataAnnotation(obj, AnnotationGcTag, a.GcTag)
	}

	desc := fmt.Sprintf("%s %s", a.objectInfo.ResourceName(co.discovery, obj), utils.FqName(obj))
	log.Info("Updating ", desc, a.dryRunText())

	rc, err := a.resourceClientFactory(co, obj)
	if err != nil {
		return "", err
	}

	asPatch, err := json.Marshal(obj)
	if err != nil {
		return "", err
	}

	var newobj metav1.Object
	if !a.DryRun {
		newobj, err = rc.Patch(types.MergePatchType, asPatch)
		log.Debugf("Patch(%s) returned (%v, %v)", obj.GetName(), newobj, err)
	} else {
		newobj, err = rc.Get(metav1.GetOptions{})
	}

	if a.Create && kerrors.IsNotFound(err) {
		log.Info(" Creating non-existent ", desc, a.dryRunText())
		if !a.DryRun {
			newobj, err = rc.Create()
			log.Debugf("Create(%s) returned (%v, %v)", obj.GetName(), newobj, err)
		} else {
			newobj = obj
			err = nil
		}
	}
	if err != nil {
		// TODO: retry
		return "", errors.Wrapf(err, "can't update %s", desc)
	}

	log.Debug("Updated object: ", kdiff.ObjectDiff(obj, newobj))

	return string(newobj.GetUID()), nil
}

func (a *Apply) runGc(co clientOpts, seenUids sets.String) error {
	version, err := utils.FetchVersion(co.discovery)
	if err != nil {
		return err
	}

	err = walkObjects(co, metav1.ListOptions{}, func(o runtime.Object) error {
		var metav1Object metav1.Object
		metav1Object, err = meta.Accessor(o)
		if err != nil {
			return err
		}
		gvk := o.GetObjectKind().GroupVersionKind()
		desc := fmt.Sprintf("%s %s (%s)",
			utils.ResourceNameFor(co.discovery, o), utils.FqName(metav1Object), gvk.GroupVersion())
		log.Debugf("Considering %v for gc", desc)
		if eligibleForGc(metav1Object, a.GcTag) && !seenUids.Has(string(metav1Object.GetUID())) {
			log.Info("Garbage collecting ", desc, a.dryRunText())
			if !a.DryRun {
				err = gcDelete(co, a.resourceClientFactory, &version, o)
				if err != nil {
					return err
				}
			}
		}
		return nil
	})
	if err != nil {
		return err
	}

	return nil
}

func (a *Apply) dryRunText() string {
	text := ""
	if a.DryRun {
		text = " (dry-run)"
	}

	return text
}

func genClientOpts(a app.App, clientConfig *client.Config, envName string) (clientOpts, error) {
	clientPool, discovery, namespace, err := clientConfig.RestClient(a, &envName)
	if err != nil {
		return clientOpts{}, err
	}

	return clientOpts{
		clientPool: clientPool,
		discovery:  discovery,
		namespace:  namespace,
	}, nil
}
