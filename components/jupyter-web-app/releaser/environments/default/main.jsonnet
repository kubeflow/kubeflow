local base = import "base.libsonnet";
// uncomment if you reference ksonnet-lib
// local k = import "k.libsonnet";
// local deployment = k.apps.v1beta2.deployment;

base + {
  // Insert user-specified overrides here. For example if a component is named \"nginx-deployment\", you might have something like:\n")
  // "nginx-deployment"+: deployment.mixin.metadata.withLabels({foo: "bar"})
}
