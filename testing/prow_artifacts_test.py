import json
import os
import unittest
import mock
from testing import prow_artifacts
import tempfile

from google.cloud import storage  # pylint: disable=no-name-in-module

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

    actual = prow_artifacts.create_started()

    self.assertEquals(expected, json.loads(actual))

  @mock.patch("testing.prow_artifacts.time.time")
  def testCreateFinished(self, mock_time):  # pylint: disable=no-self-use
    """Test create finished job."""
    mock_time.return_value = 1000

    expected = {
        "timestamp": 1000,
        "result": "FAILED",
        "metadata": {},
    }

    actual = prow_artifacts.create_finished(False)

    self.assertEquals(expected, json.loads(actual))

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

  def testCreateSymlink(self):
    gcs_client = mock.MagicMock(spec=storage.Client)
    mock_bucket = mock.MagicMock(spec=storage.Bucket)
    gcs_client.get_bucket.return_value = mock_bucket
    mock_blob = mock.MagicMock(spec=storage.Blob)
    mock_bucket.blob.return_value = mock_blob
    # We can't add the decorator the instance method because that would
    # interfere with creating gcs_client since storage.Client would then
    # point to the mock and not the actual class.
    with mock.patch("testing.prow_artifacts.storage.Client") as mock_client:
      mock_client.return_value = gcs_client

      os.environ["REPO_OWNER"] = "fake_org"
      os.environ["REPO_NAME"] = "fake_name"
      os.environ["PULL_NUMBER"] = "72"
      os.environ["BUILD_NUMBER"] = "100"
      os.environ["PULL_PULL_SHA"] = "123abc"
      os.environ["JOB_NAME"] = "kubeflow-presubmit"

      args = ["--artifacts_dir=/tmp/some/dir", "create_pr_symlink",
              "--bucket=some-bucket"]
      prow_artifacts.main(args)

      mock_blob.upload_from_string.assert_called_once_with(
        "gs://some-bucket/pr-logs/pull/fake_org_fake_name/72"
        "/kubeflow-presubmit/100")

if __name__ == "__main__":
  unittest.main()
