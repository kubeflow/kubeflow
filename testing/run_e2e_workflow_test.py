import json
import os
import unittest
import mock
from testing import run_e2e_workflow
import tempfile

from google.cloud import storage  # pylint: disable=no-name-in-module

class TestRunE2eWorkflow(unittest.TestCase):
  @mock.patch("testing.run_e2e_workflow.upload_file_to_gcs")
  @mock.patch("testing.run_e2e_workflow.upload_to_gcs")
  @mock.patch("testing.run_e2e_workflow.util.load_kube_config")
  @mock.patch("testing.run_e2e_workflow.argo_client.wait_for_workflow")
  @mock.patch("testing.run_e2e_workflow.util.configure_kubectl")
  @mock.patch("testing.run_e2e_workflow.util.run")
  def testMainPresubmit(self, mock_run, mock_configure, mock_wait, *unused_mocks):  # pylint: disable=no-self-use
    """Test create started for presubmit job."""

    os.environ["REPO_OWNER"] = "fake_org"
    os.environ["REPO_NAME"] = "fake_name"
    os.environ["PULL_NUMBER"] = "77"
    os.environ["PULL_PULL_SHA"] = "123abc"
    os.environ["JOB_NAME"] = "kubeflow-presubmit"
    os.environ["JOB_TYPE"] = "presubmit"
    os.environ["BUILD_NUMBER"] = "1234"

    args = ["--project=some-project", "--cluster=some-cluster",
            "--zone=us-east1-d", "--bucket=some-bucket"]
    run_e2e_workflow.main(args)

    mock_configure.assert_called_once_with("some-project", "us-east1-d",
                                           "some-cluster",)
    self.assertItemsEqual(
      ["ks", "param", "set", "workflows", "name"],
      mock_run.call_args_list[0][0][0][:-1])
    # Workflow name will have some random salt at the end.
    self.assertRegexpMatches(mock_run.call_args_list[0][0][0][-1],
                             "kubeflow-presubmit-77-[0-9a-z]{4}")

    self.assertItemsEqual(
      ["ks", "param", "set", "workflows", "prow_env",
       "BUILD_NUMBER=1234,JOB_NAME=kubeflow-presubmit,JOB_TYPE=presubmit"
       ",PULL_NUMBER=77,PULL_PULL_SHA=123abc,REPO_NAME=fake_name"
       ",REPO_OWNER=fake_org"],
      mock_run.call_args_list[1][0][0])

    self.assertItemsEqual(
      ["ks", "param", "set", "workflows", "namespace",
       "kubeflow-test-infra"],
      mock_run.call_args_list[2][0][0])

    self.assertItemsEqual(
      ["ks", "param", "set", "workflows", "bucket", "some-bucket"],
      mock_run.call_args_list[3][0][0])

    self.assertItemsEqual(
      ["ks", "show", "prow", "-c", "workflows"],
      mock_run.call_args_list[4][0][0])

    self.assertItemsEqual(
      ["ks", "apply", "prow", "-c", "workflows"],
      mock_run.call_args_list[5][0][0])


if __name__ == "__main__":
  unittest.main()
