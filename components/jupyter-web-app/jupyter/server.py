import json
from kubernetes import client
from jupyter.utils import load_file


APISERVER = "https://kubernetes.default"
CACERT = "/run/secrets/kubernetes.io/serviceaccount/ca.crt"
SA = "/run/secrets/kubernetes.io/serviceaccount/token"


def parse_error(e):
    try:
        err = json.loads(e.body)['message']
    except:
        err = str(e)

    return err


def create_client_config(apiserver=APISERVER, ca_cert=CACERT):
    # By default, use JWT Tokens
    conf = client.Configuration()
    conf.api_key_prefix['authorization'] = 'Bearer'
    conf.api_key['authorization'] = load_file(SA)
    conf.host = apiserver
    conf.ssl_ca_cert = ca_cert
    return conf


def get_namespaces():
    conf = create_client_config()
    api = client.ApiClient(configuration=conf)
    v1 = client.CoreV1Api(api)

    nmsps = v1.list_namespace()
    return [ns.metadata.name for ns in nmsps.items]


def get_notebooks(ns):
    conf = create_client_config()
    api = client.ApiClient(configuration=conf)
    v1 = client.CustomObjectsApi(api)

    notebooks = v1.list_namespaced_custom_object("kubeflow.org", "v1alpha1",
                                                 ns, "notebooks")
    return [nb['metadata']['name'] for nb in notebooks['items']]


def delete_notebook(nb, ns):
    conf = create_client_config()
    api = client.ApiClient(configuration=conf)
    v1 = client.CustomObjectsApi(api)

    body = client.V1DeleteOptions()
    return v1.delete_namespaced_custom_object("kubeflow.org", "v1alpha1", ns,
                                              "notebooks", nb, body)


def create_notebook(body):
    conf = create_client_config()
    api = client.ApiClient(configuration=conf)
    v1 = client.CustomObjectsApi(api)

    ns = body['metadata']['namespace']
    return v1.create_namespaced_custom_object("kubeflow.org", "v1alpha1",
                                              ns, "notebooks", body)


def create_pvc(body):
    conf = create_client_config()
    api = client.ApiClient(configuration=conf)
    v1 = client.CoreV1Api(api)

    ns = body['metadata']['namespace']
    return v1.create_namespaced_persistent_volume_claim(ns, body)
