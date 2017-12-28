## Permissions

User or service account deploying Kubeflow needs sufficient permissions to create the roles that are created as part of a Kubeflow deployment. For example you may need to run

```
kubectl create clusterrolebinding default-admin --clusterrole=cluster-admin --user=user@gmail.com
```

## GitHub tokens

You need to use a GitHub token with ksonnet otherwise the test quickly runs into GitHub API limits.

TODO(jlewi): We should create a GitHub bot account to use with our tests and then create API tokens for that bot.

## Managing namespaces

All namespaces created for the tests should be labeled with `app=kubeflow-e2e-test`. 

This can be used to manually delete old namespaces that weren't properly garbage collected.
