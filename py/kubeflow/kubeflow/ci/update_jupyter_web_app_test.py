from kubeflow.kubeflow.ci import update_jupyter_web_app
import unittest

class WebAppUpdaterTest(unittest.TestCase):

  def test_replace_parameters(self):
    lines = """// @optionalParam image string gcr.io/old The old image
// @optionalParam istioNamespace string istio-system The namespace where Istio is installed

local iap = import "kubeflow/gcp/iap.libsonnet";
"""
    lines = lines.split("\n")

    updater = update_jupyter_web_app.WebAppUpdater()
    newLines = updater._replace_parameters(lines, {"image": "new/image"})

    actual = "\n".join(newLines)
    expected ="""// @optionalParam image string new/image The old image
// @optionalParam istioNamespace string istio-system The namespace where Istio is installed

local iap = import "kubeflow/gcp/iap.libsonnet";
"""
    self.assertEquals(expected, actual)


if __name__ == "__main__":
  unittest.main()