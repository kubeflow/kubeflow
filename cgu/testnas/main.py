import kubernetes
from kubernetes.client.rest import ApiException
from pprint import pprint
import sys

#load kube config for cluster
kubernetes.config.load_kube_config('config')

# create an instance of the API class for PV/PVC
api_instance = kubernetes.client.CoreV1Api()

try:
    pvcname = sys.argv[2]
    namespace = sys.argv[1]
    api_response = api_instance.read_namespaced_persistent_volume_claim(pvcname, namespace)
    pprint(api_response)
    # get the pv from the pvc
    pvname = api_response.spec.volume_name
    print(pvname)
    # get the pv details
    pv_response = api_instance.read_persistent_volume(pvname)
    pprint(pv_response)
    # get the path of nfs from the pv
    path = pv_response.spec.nfs.path
    print(path)
    # get the host of nfs from the pv
    host = pv_response.spec.nfs.server
    print(host)
    # get the pod name

except ApiException as e:
    print("Exception when calling AppsV1Api->read_namespaced_persistent_volume_claim: %s\n" % e)

