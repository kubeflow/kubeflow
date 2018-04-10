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
	"fmt"
	"sort"

	"github.com/ksonnet/ksonnet/client"
	"github.com/ksonnet/ksonnet/metadata/app"
	"github.com/ksonnet/ksonnet/utils"
	"github.com/pkg/errors"
	log "github.com/sirupsen/logrus"
	kerrors "k8s.io/apimachinery/pkg/api/errors"
	metav1 "k8s.io/apimachinery/pkg/apis/meta/v1"
)

// DeleteConfig is configuration for Delete.
type DeleteConfig struct {
	App            app.App
	ClientConfig   *client.Config
	ComponentNames []string
	EnvName        string
	GracePeriod    int64
}

// DeleteOpts is an option for configuring Delete.
type DeleteOpts func(*Delete)

// Delete deletes objects from the cluster.
type Delete struct {
	DeleteConfig

	// these make it easier to test Delete.
	findObjectsFn         findObjectsFn
	genClientOptsFn       genClientOptsFn
	objectInfo            ObjectInfo
	resourceClientFactory resourceClientFactoryFn
}

// RunDelete runs delete against a cluster for a given configuration.
func RunDelete(config DeleteConfig, opts ...DeleteOpts) error {
	d := &Delete{
		DeleteConfig:          config,
		findObjectsFn:         findObjects,
		genClientOptsFn:       genClientOpts,
		resourceClientFactory: resourceClientFactory,
		objectInfo:            &objectInfo{},
	}

	for _, opt := range opts {
		opt(d)
	}

	return d.Delete()
}

// Delete deletes objects from a cluster.
func (d *Delete) Delete() error {
	apiObjects, err := d.findObjectsFn(d.App, d.EnvName, d.ComponentNames)
	if err != nil {
		return errors.Wrap(err, "find objects")
	}

	co, err := d.genClientOptsFn(d.App, d.ClientConfig, d.EnvName)
	if err != nil {
		return err
	}

	version, err := utils.FetchVersion(co.discovery)
	if err != nil {
		return err
	}
	sort.Sort(sort.Reverse(utils.DependencyOrder(apiObjects)))

	deleteOpts := metav1.DeleteOptions{}
	if version.Compare(1, 6) < 0 {
		// 1.5.x option
		boolFalse := false
		deleteOpts.OrphanDependents = &boolFalse
	} else {
		// 1.6.x option (NB: Background is broken)
		fg := metav1.DeletePropagationForeground
		deleteOpts.PropagationPolicy = &fg
	}
	if d.GracePeriod >= 0 {
		deleteOpts.GracePeriodSeconds = &d.GracePeriod
	}

	for _, obj := range apiObjects {
		desc := fmt.Sprintf("%s %s", d.objectInfo.ResourceName(co.discovery, obj), utils.FqName(obj))
		log.Info("Deleting ", desc)

		client, err := d.resourceClientFactory(co, obj)
		if err != nil {
			return err
		}

		err = client.Delete(&deleteOpts)
		if err != nil && !kerrors.IsNotFound(err) {
			return fmt.Errorf("Error deleting %s: %s", desc, err)
		}

		log.Debugf("Deleted object: ", obj)
	}

	return nil

}
