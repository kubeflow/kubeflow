import os
from kubeflow.testing import util

kind_sc_patch = '{"metadata": {"annotations":{"storageclass.kubernetes.io/is-default-class":"true"}}}'

def download_kind_binary():
    uname = os.uname().sysname
    util.run("curl", "-Lo", "./kind", "https://github.com/kubernetes-sigs/kind/"
                "releases/download/v0.5.0/kind-"+uname+"-amd64")
    util.run("chmod", "+x", "./kind")
    kind_path = os.getcwd() + "/kubernetes-in-docker"
    util.run("mv", "./kind", kind_path)
    return kind_path

def switch_storage_class():
  util.run("kubectl", "delete", "sc", "standard")
  util.run("kubectl", "apply", "-f", kind_sc_path)
  util.run("kubectl", "patch", "sc", "local-path", "-p", kind_sc_patch)
