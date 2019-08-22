# Gatekeeper and Kubeflow

[Gatekeeper](https://github.com/open-policy-agent/gatekeeper) is a validating webhook for Kubernetes that enforces CRD-based access control policies.
In Kubeflow, we use Gatekeeper to restrict controllers to their own namespaces. The details can be found [here](https://bit.ly/2yJeU5u).

## Installation

1. Follow the instructions [here](https://github.com/open-policy-agent/gatekeeper#deploying-a-release-using-prebuilt-image) to install Gatekeeper controller.

1. Apply the constraint template in this directory:
```
kubectl apply -f constraint-template.yaml
```

## Configuration

1. In order to configure contraints for your controllers, edit the `ns-required-annotations.yaml` file.
```yaml
    # Fill in the service account name
    usernames: ["system:serviceaccount:(NAMESPACE):(SERVICEACCOUNT)"]
    # Replace with your own labels
    annotations: ["kubeflow-admins", "kubeflow-users"]
```
  * Under `usernames`, enter the names of the service accounts used to deploy Kubeflow resources.
  * Under `annotations`, enter your own label names.

2. Deploy the constraint:
```
kubectl apply -f ns-required-annotations.yaml
```

## Usage

The constraint is now enabled. You can test that the constraint is working by creating a namespace without the required labels:
```yaml
apiVersion: v1
kind: Namespace
metadata:
  name: kubeflow
```

Then try to create any resource under this namespace using one of the restricted users' credentials. This should result in an access violation:

```
Missing labels for user SERVICEACCOUNT namespace kubeflow: Required one of labels: ["kubeflow-admins", "kubeflow-users"] Actual labels: None
```

Now add the required labels to the namespace:
```yaml
apiVersion: v1
kind: Namespace
metadata:
  name: kubeflow
  annotations:
    category: kubeflow-admins
```

Then try to create the same source again, and it should work.
