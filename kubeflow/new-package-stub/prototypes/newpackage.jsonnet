// @apiVersion 0.1
// @name io.ksonnet.pkg.some-prototype-name
// @description Description for this prototype
// @shortDescription Short description for your prototype
// @param name string Name to give to each of the components

// TODO: You need to change the path kubeflow/{PACKAGE}/{LIB}
// so that PACKAGE is the directory containing your package and LIB is the
// .libsonnet file defining your resources

local params = {
  TensorflowOnly: true,
  PyTorchOnly: true,
};
local env = {
  namespace: "foo",
};

local newpackage = (import "kubeflow/new-package-stub/newpackage.libsonnet").new(env, params);
newpackage.list
