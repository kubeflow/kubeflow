local application = import "kubeflow/application/application.libsonnet";

local params = {
  name: "application",
};
local env = {
  namespace:: "test-kf-001",
};

local instance = application.new(env, params);

/*
std.assertEqual(
  instance.applicationCRD,
) &&

std.assertEqual(
  instance.application,
)
*/
