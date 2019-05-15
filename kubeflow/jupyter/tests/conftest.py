# -*- coding: utf-8 -*-
import pytest


def pytest_addoption(parser):
  parser.addoption(
      "--namespace", action="store", default="", help="namespace  to use")

  parser.addoption(
      "--env",
      action="store",
      default="jupytertest",
      help="ksonnet environment")


@pytest.fixture
def namespace(request):
  return request.config.getoption("--namespace")


@pytest.fixture
def env(request):
  return request.config.getoption("--env")
