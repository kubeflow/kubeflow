import logging
import os

import pytest
from kubeflow.testing import util
from retrying import retry


# retry 4 times, waiting 3 minutes between retries
@retry(stop_max_attempt_number=4, wait_fixed=180000)
def run_with_retries(*args, **kwargs):
    util.run(*args, **kwargs)


def build_kfctl_go():
    """build the kfctl go binary and return the path for the same.

    Args:
      None

    Return:
      kfctl_path (str): Path where kfctl go binary has been built.
                        will be Kubeflow/kubeflow/bootstrap/bin/kfctl
    """
    this_dir = os.path.dirname(__file__)
    root = os.path.abspath(os.path.join(this_dir, "..", ".."))
    build_dir = os.path.join(root, "bootstrap")
    # We need to use retry builds because when building in the test cluster
    # we see intermittent failures pulling dependencies
    run_with_retries(["make", "build-kfctl"], cwd=build_dir)
    kfctl_path = os.path.join(build_dir, "bin", "kfctl")
    return kfctl_path


def test_build_kfctl_go():
    """Test building of kfctl go.

    """
    # Need to activate account for scopes.
    if os.getenv("GOOGLE_APPLICATION_CREDENTIALS"):
        util.run([
            "gcloud", "auth", "activate-service-account",
            "--key-file=" + os.environ["GOOGLE_APPLICATION_CREDENTIALS"]
        ])

    kfctl_path = build_kfctl_go()
    logging.info("kfctl go binary path %s", kfctl_path)


if __name__ == "__main__":
    logging.basicConfig(
        level=logging.INFO,
        format=('%(levelname)s|%(asctime)s'
                '|%(pathname)s|%(lineno)d| %(message)s'),
        datefmt='%Y-%m-%dT%H:%M:%S',
    )
    logging.getLogger().setLevel(logging.INFO)
    pytest.main()
