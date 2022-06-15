from kubeflow.kubeflow.crud_backend import api, helpers


def parse_secret(secret):
    """
    secret: client.V1Secret

    Process the Secret and format it as the UI expects it.
    """
    
    parsed_secret = {
        "name": secret.metadata.name,
        "namespace": secret.metadata.namespace,
        "labels": secret.metadata.labels,
        "annotations": secret.metadata.annotations,
        "type": secret.type,
        "age": {
            "uptime": helpers.get_uptime(secret.metadata.creation_timestamp),
            "timestamp": secret.metadata.creation_timestamp.strftime(
                "%d/%m/%Y, %H:%M:%S"
            ),
        },
        "data": secret.data,
    }

    return parsed_secret


def get_pods_using_secret(secret, namespace):
    """
    Return a list of Pods that are using the given Secret
    """
    pods = api.list_pods(namespace)
    mounted_pods = []

    for pod in pods.items:
        secrets = get_pod_secrets(pod)
        if secret in secrets:
            mounted_pods.append(pod)

    return mounted_pods


def get_pod_secrets(pod):
    """
    Return a list of Secret name that the given Pod
    is using. If it doesn't use any, then an empty list will
    be returned.
    """
    secrets = []
    if not pod.spec.secrets:
        return []

    sts = pod.spec.secrets
    for st in sts:
        # Check if the volume is a secret
        if not st.persistent_volume_claim:
            continue

        secrets.append(vol.persistent_volume_claim.claim_name)

    return secrets
