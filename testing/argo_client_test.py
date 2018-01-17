from __future__ import print_function

import unittest

from testing import argo_client
from kubernetes import client as k8s_client
import mock
import os
import yaml
from py import util

class ArgoClientTest(unittest.TestCase):
  def setUp(self):
    self.test_dir = os.path.join(os.path.dirname(__file__), "test-data")

  def test_wait_for_workflow(self):
    api_client = mock.MagicMock(spec=k8s_client.ApiClient)

    with open(os.path.join(self.test_dir, "successful_workflow.yaml")) as hf:
      response = yaml.load(hf)

    api_client.call_api.return_value = response
    result = argo_client.wait_for_workflow(api_client, "some-namespace", "some-set")
    self.assertIsNotNone(result)

if __name__ == "__main__":
  unittest.main()