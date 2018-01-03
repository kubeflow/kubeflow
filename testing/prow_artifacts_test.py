import json
import os
import unittest
import mock
from testing import prow_artifacts
import tempfile

class TestProw(unittest.TestCase):
  @mock.patch("testing.prow_artifacts.time.time")
  def testCreateStartedPresubmit(self, mock_time):  # pylint: disable=no-self-use
    """Test create started for presubmit job."""
    mock_time.return_value = 1000

    os.environ["REPO_OWNER"] = "fake_org"
    os.environ["REPO_NAME"] = "fake_name"
    os.environ["PULL_PULL_SHA"] = "123abc"
    expected = {
        "timestamp": 1000,
        "repos": {
            "fake_org/fake_name": "123abc",
        },
    }

    temp_dir = tempfile.mkdtemp(prefix="tmpTestProwTestCreateStartedPresubmit.")
    args = ["--artifacts_dir=" + temp_dir, "create_started"]
    prow_artifacts.main(args)

    expected_path = os.path.join(temp_dir, "started.json")
    with open(expected_path) as hf:
      actual = json.load(hf)

    self.assertEquals(expected, actual)

  @mock.patch("testing.prow_artifacts.time.time")
  def testCreateFinished(self, mock_time):  # pylint: disable=no-self-use
    """Test create finished job."""
    mock_time.return_value = 1000

    expected = {
        "timestamp": 1000,
        "result": "SUCCESS",
        "metadata": {},
    }

    temp_dir = tempfile.mkdtemp(prefix="tmpTestProwTestCreateFinished.")
    args = ["--artifacts_dir=" + temp_dir, "create_finished"]
    prow_artifacts.main(args)

    expected_path = os.path.join(temp_dir, "finished.json")
    with open(expected_path) as hf:
      actual = json.load(hf)

    self.assertEquals(expected, actual)

  @mock.patch("testing.prow_artifacts.util.run")
  def testCopyArtifactsPresubmit(self, mock_run):  # pylint: disable=no-self-use
    """Test copy artifacts to GCS."""

    os.environ["REPO_OWNER"] = "fake_org"
    os.environ["REPO_NAME"] = "fake_name"
    os.environ["PULL_NUMBER"] = "72"
    os.environ["BUILD_NUMBER"] = "100"
    os.environ["PULL_PULL_SHA"] = "123abc"
    os.environ["JOB_NAME"] = "kubeflow-presubmit"

    temp_dir = tempfile.mkdtemp(prefix="tmpTestProwTestCreateFinished.")
    args = ["--artifacts_dir=/tmp/some/dir", "copy_artifacts",
            "--bucket=some_bucket"]
    prow_artifacts.main(args)

    mock_run.assert_called_once_with(
      ["gsutil", "-m", "rsync", "-r", "/tmp/some/dir",
       "gs://some_bucket/pr-logs/pull/fake_org_fake_name/72/kubeflow-presubmit"
       "/100"],
    )

if __name__ == "__main__":
  unittest.main()
