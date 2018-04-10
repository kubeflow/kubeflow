package ksonnet

import (
	"fmt"
	"sort"
	"strings"

	nm "github.com/ksonnet/ksonnet-lib/ksonnet-gen/nodemaker"
	"github.com/pkg/errors"
)

const (
	localK8s = "k8s"
)

// Extension represents a ksonnet lib extension document.
type Extension struct {
	catalog *Catalog
}

// NewExtension creates an an instance of Extension.
func NewExtension(catalog *Catalog) *Extension {
	return &Extension{
		catalog: catalog,
	}
}

// Node converts an extension to a node.
func (e *Extension) Node() (nm.Noder, error) {
	ext, err := e.genK8sExtension()
	if err != nil {
		return nil, err
	}

	extBinary := nm.NewBinary(nm.NewVar(localK8s), ext, nm.BopPlus)

	fns := genMapContainers(extBinary)

	k8sImportFile := nm.NewImport("k8s.libsonnet")
	k8sImport := nm.NewLocal(localK8s, k8sImportFile, fns)

	return k8sImport, nil
}

func (e *Extension) genK8sExtension() (*nm.Object, error) {
	gi := makeGroupItems()

	e.listExtension(gi)

	if err := e.mapContainersExtension(gi); err != nil {
		return nil, errors.Wrap(err, "map container extensions")
	}

	return gi.Node(), nil
}

func (e *Extension) mapContainersExtension(gi *groupItems) error {
	types, err := e.catalog.TypesWithDescendant("io.k8s.api.core.v1.PodSpec")
	if err != nil {
		return errors.Wrap(err, "find types with PodSec")
	}

	mapping := nm.NewObject()
	mapping.Set(
		nm.FunctionKey("mapContainers", []string{"f"}),
		nm.ApplyCall("fn.mapContainers", nm.NewVar("f")),
	)

	mapping.Set(
		nm.FunctionKey("mapContainersWithName", []string{"names", "f"}),
		nm.ApplyCall("fn.mapContainersWithName", nm.NewVar("names"), nm.NewVar("f")),
	)

	for _, ty := range types {
		parts := strings.Split(ty.component.String(), ".")
		gi.add(parts[0], parts[1], FormatKind(parts[2]), mapping, true)
	}

	return nil
}

func (e *Extension) listExtension(gi *groupItems) {
	apiVersion := nm.NewObject()
	apiVersion.Set(nm.InheritedKey("apiVersion"), nm.NewStringDouble("v1"))

	kind := nm.NewObject()
	kind.Set(nm.InheritedKey("kind"), nm.NewStringDouble("List"))

	items := nm.ApplyCall("self.items", nm.NewVar("items"))

	o := nm.NewObject()
	o.Set(
		nm.FunctionKey("new", []string{"items"}),
		nm.Combine(apiVersion, kind, items),
	)
	o.Set(
		nm.FunctionKey("items", []string{"items"}),
		convertToArray("items", "", true),
	)

	gi.add("core", "v1", "list", o, false)
}

type nodeMixin struct {
	node    nm.Noder
	isMixin bool
}

type groupItems struct {
	groups map[string]map[string]map[string]nodeMixin
}

func makeGroupItems() *groupItems {
	return &groupItems{
		groups: make(map[string]map[string]map[string]nodeMixin),
	}
}

func (gi *groupItems) add(group, version, key string, node nm.Noder, isMixin bool) {
	g, ok := gi.groups[group]
	if !ok {
		g = make(map[string]map[string]nodeMixin)
		gi.groups[group] = g
	}

	v, ok := g[version]
	if !ok {
		v = make(map[string]nodeMixin)
		g[version] = v
	}

	v[key] = nodeMixin{node: node, isMixin: isMixin}
}

func (gi *groupItems) Node() *nm.Object {
	var groupNames []string
	for name := range gi.groups {
		groupNames = append(groupNames, name)
	}
	sort.Strings(groupNames)

	o := nm.NewObject()

	for _, groupName := range groupNames {
		group := gi.groups[groupName]
		groupObject := nm.NewObject()

		var versionNames []string
		for name := range group {
			versionNames = append(versionNames, name)
		}
		sort.Strings(versionNames)

		for _, versionName := range versionNames {
			version := group[versionName]
			versionObject := nm.NewObject()

			var keyNames []string
			for name := range version {
				keyNames = append(keyNames, name)
			}
			sort.Strings(keyNames)

			for _, keyName := range keyNames {
				node := version[keyName].node
				isMixin := version[keyName].isMixin

				if isMixin {
					parent := nm.NewCall(fmt.Sprintf("k8s.%s.%s.%s", groupName, versionName, keyName))
					node = nm.NewBinary(parent, node, nm.BopPlus)
				}
				versionObject.Set(nm.NewKey(keyName), node)
			}

			parent := nm.NewCall(fmt.Sprintf("k8s.%s.%s", groupName, versionName))
			groupObject.Set(nm.NewKey(versionName), nm.NewBinary(parent, versionObject, nm.BopPlus))
		}

		parent := nm.NewCall(fmt.Sprintf("k8s.%s", groupName))
		o.Set(nm.NewKey(groupName), nm.NewBinary(parent, groupObject, nm.BopPlus))
	}

	return o
}

func genMapContainers(body nm.Noder) *nm.Local {
	o := nm.NewObject()

	o.Set(
		nm.FunctionKey("mapContainers", []string{"f"}),
		createMapContainersFn(),
	)

	o.Set(
		nm.FunctionKey("mapContainersWithName", []string{"names", "f"}),
		createMapContainersWithName(),
	)

	return nm.NewLocal("fn", o, body)
}

func createMapContainersFn() *nm.Object {
	o := nm.NewObject()
	o.Set(
		nm.LocalKey("podContainers"),
		nm.NewCall("super.spec.template.spec.containers"),
	)

	templateSpecObject := nm.NewObject()
	templateSpecObject.Set(
		nm.InheritedKey("containers"),
		nm.ApplyCall("std.map", nm.NewVar("f"), nm.NewVar("podContainers")),
	)

	templateObject := nm.NewObject()
	templateObject.Set(
		nm.InheritedKey("spec", nm.KeyOptMixin(true)),
		templateSpecObject,
	)

	specObject := nm.NewObject()
	specObject.Set(
		nm.InheritedKey("template", nm.KeyOptMixin(true)),
		templateObject,
	)

	o.Set(
		nm.InheritedKey("spec", nm.KeyOptMixin(true)),
		specObject,
	)

	return o
}

func createMapContainersWithName() *nm.Local {
	c1Binary := nm.NewBinary(
		nm.ApplyCall("std.objectHas", nm.NewVar("c"), nm.NewStringDouble("name")),
		nm.ApplyCall("inNameSet", nm.NewCall("c.name")),
		nm.BopAnd,
	)

	c1True := nm.ApplyCall("f", nm.NewVar("c"))
	c1False := nm.NewVar("c")

	c1 := nm.NewConditional(c1Binary, c1True, c1False)

	apply := nm.NewApply(c1, []nm.Noder{nm.NewVar("c")}, nil)

	runMap := nm.ApplyCall("self.mapContainers", apply)

	a := nm.NewVar("nameSet")
	b := nm.ApplyCall("std.set", nm.NewArray([]nm.Noder{nm.NewVar("name")}))

	inNameSet := nm.NewLocal(
		"inNameSet",
		nm.NewFunction([]string{"name"}, genIsIntersection(a, b)),
		runMap,
	)
	nameSet := nm.NewLocal("nameSet", setArray("names"), inNameSet)

	return nameSet
}

func setArray(varName string) *nm.Conditional {
	bin := nm.NewBinary(
		nm.ApplyCall("std.type", nm.NewVar(varName)),
		nm.NewStringDouble("array"),
		nm.BopEqual,
	)

	tBranch := nm.ApplyCall("std.set", nm.NewVar(varName))
	fBranch := nm.ApplyCall("std.set", nm.NewArray([]nm.Noder{nm.NewVar(varName)}))

	return nm.NewConditional(bin, tBranch, fBranch)
}

func genIsIntersection(a, b nm.Noder) *nm.Binary {
	intersection := nm.ApplyCall("std.setInter", a, b)
	checkLen := nm.ApplyCall("std.length", intersection)

	return nm.NewBinary(
		checkLen,
		nm.NewInt(0),
		nm.BopGreater,
	)
}
