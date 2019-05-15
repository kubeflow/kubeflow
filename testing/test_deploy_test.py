# -*- coding: utf-8 -*-
import tempfile
import unittest
import yaml

from testing import test_deploy


class TestDeploy(unittest.TestCase):

  def testModifyMinikubeConfig(self):
    """Test modeify_minikube_config"""

    config_path = None
    with tempfile.NamedTemporaryFile(delete=False) as hf:
      config_path = hf.name
      hf.write("""apiVersion: v1
clusters:
- cluster:
    certificate-authority: /home/jlewi/.minikube/ca.crt
    server: https://10.240.0.18:8443
  name: minikube
contexts:
- context:
    cluster: minikube
    user: minikube
  name: minikube
current-context: minikube
kind: Config
preferences: {}
users:
- name: minikube
  user:
    as-user-extra: {}
    client-certificate: /home/jlewi/.minikube/client.crt
    client-key: /home/jlewi/.minikube/client.key
""")

    test_deploy.modify_minikube_config(config_path, "/test/.minikube")

    # Load the output.
    with open(config_path) as hf:
      config = yaml.load(hf)

    expected = {
        "apiVersion":
        "v1",
        "clusters": [{
            "cluster": {
                "certificate-authority": "/test/.minikube/ca.crt",
                "server": "https://10.240.0.18:8443"
            },
            "name": "minikube"
        }],
        "contexts": [{
            "context": {
                "cluster": "minikube",
                "user": "minikube"
            },
            "name": "minikube"
        }],
        "current-context":
        "minikube",
        "kind":
        "Config",
        "preferences": {},
        "users": [{
            "name": "minikube",
            "user": {
                "as-user-extra": {},
                "client-certificate": "/test/.minikube/client.crt",
                "client-key": "/test/.minikube/client.key"
            }
        }]
    }

    self.assertDictEqual(expected, config)


if __name__ == "__main__":
  unittest.main()
