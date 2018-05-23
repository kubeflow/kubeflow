// Copyright 2017 The kubecfg authors
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

package kubecfg

import (
	"fmt"
	"io"
	"os"
	"sort"

	isatty "github.com/mattn/go-isatty"
	log "github.com/sirupsen/logrus"
	"github.com/yudai/gojsondiff"
	"github.com/yudai/gojsondiff/formatter"
	"k8s.io/apimachinery/pkg/api/errors"
	metav1 "k8s.io/apimachinery/pkg/apis/meta/v1"
	"k8s.io/apimachinery/pkg/apis/meta/v1/unstructured"
	"k8s.io/client-go/discovery"
	"k8s.io/client-go/dynamic"

	"github.com/ksonnet/ksonnet/utils"
)

var ErrDiffFound = fmt.Errorf("Differences found.")

// DiffCmd is an interface containing a set of functions that allow diffing
// between two sets of data containing Kubernetes resouces.
type DiffCmd interface {
	Run(out io.Writer) error
}

// Diff is a base representation of the `diff` functionality.
type Diff struct {
	DiffStrategy string
}

// Client holds the necessary information to connect with a remote Kubernetes
// cluster.
type Client struct {
	ClientPool dynamic.ClientPool
	Discovery  discovery.DiscoveryInterface
	Namespace  string
	// Name of the remote client to identify changes against. This field is Optional.
	Name string
	// APIObjects are the Kubernetes objects being diffed against
	APIObjects []*unstructured.Unstructured
}

// LocalEnv holds the local Kubernetes objects for an environment and relevant
// environment details, such as, environment name
type LocalEnv struct {
	Name       string
	APIObjects []*unstructured.Unstructured
}

// ---------------------------------------------------------------------------

// DiffRemoteCmd extends DiffCmd and is meant to represent diffing between some
// set of Kubernetes objects and the Kubernetes objects located on a remote
// client.
type DiffRemoteCmd struct {
	Diff
	Client *Client
}

func (c *DiffRemoteCmd) Run(out io.Writer) error {
	const (
		local  = "config"
		remote = "live"
	)

	_, liveObjs, err := getLiveObjs(c.Client)
	if err != nil {
		return err
	}

	return diffAll(c.Client.APIObjects, liveObjs, local, remote, c.DiffStrategy, &c.Client.Discovery, true, out)
}

// ---------------------------------------------------------------------------

// DiffLocalCmd extends DiffCmd and is meant to represent diffing between two
// sets of Kubernetes objects.
type DiffLocalCmd struct {
	Diff
	Env1 *LocalEnv
	Env2 *LocalEnv
}

func (c *DiffLocalCmd) Run(out io.Writer) error {
	m := map[string]*unstructured.Unstructured{}
	for _, b := range c.Env2.APIObjects {
		m[hash(nil, b, true)] = b
	}

	return diffAll(c.Env1.APIObjects, m, c.Env1.Name, c.Env2.Name, c.DiffStrategy, nil, true, out)
}

// ---------------------------------------------------------------------------

// DiffRemotesCmd extends DiffCmd and is meant to represent diffing between the
// Kubernetes objects on two remote clients.
type DiffRemotesCmd struct {
	Diff
	ClientA *Client
	ClientB *Client
}

func (c *DiffRemotesCmd) Run(out io.Writer) error {
	liveObjsA, _, err := getLiveObjs(c.ClientA)
	if err != nil {
		return err
	}

	_, liveObjsB, err := getLiveObjs(c.ClientB)
	if err != nil {
		return err
	}

	return diffAll(liveObjsA, liveObjsB, c.ClientA.Name, c.ClientB.Name, c.DiffStrategy, &c.ClientA.Discovery, false, out)
}

// ---------------------------------------------------------------------------

func diffAll(a []*unstructured.Unstructured, b map[string]*unstructured.Unstructured, aName, bName, strategy string,
	discovery *discovery.DiscoveryInterface, fqName bool, out io.Writer) error {

	sort.Sort(utils.AlphabeticalOrder(a))

	diffFound := false
	for _, o := range a {
		desc := hash(discovery, o, fqName)
		var bObj map[string]interface{}
		if b[desc] != nil {
			bObj = b[desc].Object
		}

		var err error
		log.Debugf("Diffing %s\nA: %s\nB: %s\n", desc, o.Object, bObj)
		diffFound, err = diff(desc, aName, bName, strategy, o.Object, bObj, out)
		if err != nil {
			return err
		}
	}

	if diffFound {
		return ErrDiffFound
	}
	return nil
}

func diff(desc, aName, bName, strategy string, aObj, bObj map[string]interface{}, out io.Writer) (diffFound bool, err error) {
	fmt.Fprintln(out, "---")
	fmt.Fprintf(out, "- %s %s\n+ %s %s\n", bName, desc, aName, desc)
	if bObj == nil {
		fmt.Fprintf(out, "%s doesn't exist on %s\n", desc, bName)
		return true, nil
	}

	if strategy == "subset" {
		bObj = removeMapFields(aObj, bObj)
	}
	diff := gojsondiff.New().CompareObjects(bObj, aObj)

	if diff.Modified() {
		fcfg := formatter.AsciiFormatterConfig{
			Coloring: istty(out),
		}
		formatter := formatter.NewAsciiFormatter(bObj, fcfg)
		text, err := formatter.Format(diff)
		if err != nil {
			return true, err
		}
		fmt.Fprintf(out, "%s", text)
		return true, nil
	}

	fmt.Fprintf(out, "%s unchanged\n", desc)
	return false, nil
}

// hash serves as an identifier for the Kubernetes resource.
func hash(discovery *discovery.DiscoveryInterface, obj *unstructured.Unstructured, fqName bool) string {
	name := obj.GetName()
	if fqName {
		name = utils.FqName(obj)
	}
	if discovery == nil {
		return fmt.Sprintf("%s %s", utils.GroupVersionKindFor(obj), name)
	}
	return fmt.Sprintf("%s %s", utils.ResourceNameFor(*discovery, obj), name)
}

func getLiveObjs(client *Client) ([]*unstructured.Unstructured, map[string]*unstructured.Unstructured, error) {
	var liveObjs []*unstructured.Unstructured
	liveObjsMap := map[string]*unstructured.Unstructured{}

	for _, obj := range client.APIObjects {
		desc := hash(&client.Discovery, obj, true)
		log.Debugf("Fetching %s", desc)

		client, err := utils.ClientForResource(client.ClientPool, client.Discovery, obj, client.Namespace)
		if err != nil {
			return nil, nil, err
		}

		liveObj, err := client.Get(obj.GetName(), metav1.GetOptions{})
		if err != nil && errors.IsNotFound(err) {
			log.Debugf("%s doesn't exist on the server", desc)
			continue
		} else if err != nil {
			return nil, nil, fmt.Errorf("Error fetching %s: %v", desc, err)
		}

		liveObjs = append(liveObjs, liveObj)
		liveObjsMap[desc] = liveObj
	}

	return liveObjs, liveObjsMap, nil
}

func removeFields(config, live interface{}) interface{} {
	switch c := config.(type) {
	case map[string]interface{}:
		return removeMapFields(c, live.(map[string]interface{}))
	case []interface{}:
		return removeListFields(c, live.([]interface{}))
	default:
		return live
	}
}

func removeMapFields(config, live map[string]interface{}) map[string]interface{} {
	result := map[string]interface{}{}
	for k, v1 := range config {
		v2, ok := live[k]
		if !ok {
			continue
		}
		result[k] = removeFields(v1, v2)
	}
	return result
}

func removeListFields(config, live []interface{}) []interface{} {
	// If live is longer than config, then the extra elements at the end of the
	// list will be returned as is so they appear in the diff.
	result := make([]interface{}, 0, len(live))
	for i, v2 := range live {
		if len(config) > i {
			result = append(result, removeFields(config[i], v2))
		} else {
			result = append(result, v2)
		}
	}
	return result
}

func istty(w io.Writer) bool {
	if f, ok := w.(*os.File); ok {
		return isatty.IsTerminal(f.Fd())
	}
	return false
}
