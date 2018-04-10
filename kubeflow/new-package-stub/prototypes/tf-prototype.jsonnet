// @apiVersion 0.1
// @name io.ksonnet.pkg.some-prototype-name
// @description Description for this prototype
// @shortDescription Short description for your prototype
// @param name string Name to give to each of the components

local k = import "k.libsonnet";

// TODO: You need to change the path kubeflow/{PACKAGE}/{PARTS}
// so that PACKAGE is the directory containing your package and PARTS is the
// .libsonnet file defining your prototypes and parts.
local all = import "kubeflow/new-package-stub/all.libsonnet";

std.prune(k.core.v1.list.new(all.tfPrototype(params, env)))
