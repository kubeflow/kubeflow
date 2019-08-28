import logging
import os
import shutil
import tempfile
import unittest

from kubeflow.kubeflow.ci import application_util
from kubeflow.kubeflow.ci import update_jupyter_web_app

import yaml


class ApplicationUttilTest(unittest.TestCase):
  def test_set_image(self):
    """Verify that we can set the image"""
    temp_dir = tempfile.mkdtemp()
    this_dir = os.path.dirname(__file__)
    test_app = os.path.join(this_dir, "test_data", "test_app")
    logging.info("Copying %s to %s", test_app, temp_dir)
    app_dir = os.path.join(temp_dir, "test_app")
    shutil.copytree(test_app, app_dir)

    kustomize_file = os.path.join(app_dir, "kustomization.yaml")
    image_name = update_jupyter_web_app.JUPYTER_WEB_APP_IMAGE_NAME
    new_image = "gcr.io/newrepo/newwebapp:1.0"
    application_util.set_kustomize_image(kustomize_file, image_name, new_image)

    with open(os.path.join(app_dir, "kustomization.yaml")) as hf:
      new_config = yaml.load(hf)

    self.assertEqual(new_config["images"][0]["newName"],
                     "gcr.io/newrepo/newwebapp")
    self.assertEqual(new_config["images"][0]["newTag"], "1.0")

if __name__ == "__main__":
  logging.getLogger().setLevel(logging.INFO)
  unittest.main()