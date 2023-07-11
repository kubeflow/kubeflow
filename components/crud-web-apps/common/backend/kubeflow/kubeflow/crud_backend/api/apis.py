from kubernetes import client, config
from kubernetes.config import ConfigException

try:
    config.load_incluster_config()
except ConfigException:
    config.load_kube_config()

# Create the Apis
v1_core = client.CoreV1Api()
custom_api = client.CustomObjectsApi()
storage_api = client.StorageV1Api()
