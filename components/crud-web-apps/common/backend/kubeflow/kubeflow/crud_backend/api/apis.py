from kubernetes import client, config
from kubernetes.config import ConfigException

try:
    config.load_incluster_config()
except ConfigException:
    config.load_kube_config()

# Create the Apis
v1_core = client.Core_v1Api()
custom_api = client.Custom_objectsApi()
storage_api = client.StorageV1Api()
