import datetime
import logging
import os
<<<<<<< HEAD
import tempfile
=======
import subprocess
import requests
>>>>>>> b550a275... Improve logging in kfctl with go binary
import uuid
from retrying import retry

import datetime
import tempfile
import pytest

from kubeflow.testing import util

# We need to use retry builds because when building in the test cluster
# we see intermittent failures pulling dependencies
@retry(stop_max_attempt_number=7)
def build(build_dir):
  util.run(["make", "build-kfctl"], cwd=build_dir)

def test_build_kfctl_go(app_path, project):
  if not app_path:
    logging.info("--app_path not specified")
    stamp = datetime.datetime.now().strftime("%H%M")
    app_path = os.path.join(tempfile.gettempdir(),
                            "kfctl-{0}-{1}".format(stamp,
                                                   uuid.uuid4().hex[0:4]))
  logging.info("Using app path %s", app_path)
  this_dir = os.path.dirname(__file__)
  root = os.path.abspath(os.path.join(this_dir, "..", ".."))
  build_dir = os.path.join(root, "bootstrap")
  build(build_dir)

  kfctl_path = os.path.join(build_dir, "bin", "kfctl")

  # We don't want the password to show up in the logs because the logs
  # are public. So we use subprocess and not util.run
  subprocess.check_call([kfctl_path, "init", app_path, "-V", "--platform=gcp",
                         "--use_basic_auth", "--skip-init-gcp-project",
                         "--project=" + project,
                         "--basic_auth_username=kf-test-user",
                         "--basic_auth_password=" + uuid.uuid4().hex])

  util.run([kfctl_path, "generate", "-V", "all", ],
            cwd=app_path)

  util.run([kfctl_path, "apply", "-V", "all"], cwd=app_path)

if __name__ == "__main__":
  logging.basicConfig(level=logging.INFO,
                      format=('%(levelname)s|%(asctime)s'
                              '|%(pathname)s|%(lineno)d| %(message)s'),
                      datefmt='%Y-%m-%dT%H:%M:%S',
                      )
  logging.getLogger().setLevel(logging.INFO)
  pytest.main()
