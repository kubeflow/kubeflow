import pytest

def pytest_addoption(parser):
  parser.addoption(
      "--app_path", action="store", default="",
      help="Path where the KF application should be stored")

  parser.addoption(
      "--kfctl_path", action="store", default="",
      help="Path to kfctl.")

  parser.addoption(
      "--namespace", action="store", default="kubeflow",
      help="Namespace to use.")

  parser.addoption(
      "--project", action="store", default="kubeflow-ci-deployment",
      help="GCP project to deploy Kubeflow to")

  parser.addoption(
      "--use_basic_auth", action="store", default="False",
      help="Use basic auth.")

@pytest.fixture
def app_path(request):
  return request.config.getoption("--app_path")

@pytest.fixture
def kfctl_path(request):
  return request.config.getoption("--kfctl_path")

@pytest.fixture
def namespace(request):
  return request.config.getoption("--namespace")

@pytest.fixture
def project(request):
  return request.config.getoption("--project")

@pytest.fixture
def use_basic_auth(request):
  value = request.config.getoption("--use_basic_auth").lower()

  if value in ["t", "true"]:
    return True
  else:
    return False