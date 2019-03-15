import pytest

def pytest_addoption(parser):
  parser.addoption(
      "--app_path", action="store", default="",
      help="Path where the KF application should be stored")

  parser.addoption(
      "--kfctl_path", action="store", default="",
      help="Path to kfctl.")

  parser.addoption(
      "--project", action="store", default="kubeflow-ci-deployment",
      help="GCP project to deploy Kubeflow to")

@pytest.fixture
def app_path(request):
  return request.config.getoption("--app_path")

@pytest.fixture
def kfctl_path(request):
  return request.config.getoption("--kfctl_path")

@pytest.fixture
def project(request):
  return request.config.getoption("--project")