# -*- coding: utf-8 -*-
import os
from kubernetes import client, config
from kubernetes.config.config_exception import ConfigException
from pathlib import Path

from util import log, api_retry, long_poll, s3_copy

SIG_DIR = '.openmpi-controller'
SIGCONT = f'{SIG_DIR}/SIGCONT'
SIGTERM = f'{SIG_DIR}/SIGTERM'
PHASE_SUCCEEDED = 'Succeeded'
PHASE_FAILED = 'Failed'
NVIDIA_VERSION_PATH = '/proc/driver/nvidia/version'


class Controller:
  """
  Controller is a sidecar container that extends the "main" container
  (openmpi-job). It communicates with the main container using a shared volume
  mounted at the working directory. It communicates with the master pod using
  kubernetes API.
  """

  def __init__(self, namespace, master, num_gpus, timeout_secs,
               download_data_from, download_data_to, upload_data_from,
               upload_data_to):
    self.namespace = namespace
    self.master = master
    self.num_gpus = num_gpus
    self.timeout_secs = timeout_secs
    self.download_data_from = download_data_from
    self.download_data_to = download_data_to
    self.upload_data_from = upload_data_from
    self.upload_data_to = upload_data_to
    self._validate_args()
    Path(SIG_DIR).mkdir()

  def __enter__(self):
    log('controller entered')
    try:
      config.load_incluster_config()
    except ConfigException:
      config.load_kube_config()

    self.api = client.CoreV1Api()
    return self

  def __exit__(self, exc_type, exc_val, exc_tb):
    log('controller exited')
    Path(SIGTERM).touch()

  def wait_ready(self):
    if self.num_gpus > 0:
      self._wait_nvidia_driver_present()
    self._download_data()
    Path(SIGCONT).touch()

  def wait_done(self):
    self._wait_master_terminated()
    self._upload_data()

  def _validate_args(self):
    if (self.download_data_from and
        self.download_data_to) or (self.upload_data_from and
                                   self.upload_data_to):
      if not os.environ.get('AWS_ACCESS_KEY_ID'):
        raise ValueError('AWS_ACCESS_KEY_ID not set')

      if not os.environ.get('AWS_SECRET_ACCESS_KEY'):
        raise ValueError('AWS_SECRET_ACCESS_KEY not set')

  def _wait_nvidia_driver_present(self):
    log('waiting for nvidia driver to be installed')
    long_poll(self._poll_nvidia_driver_version, timeout_secs=self.timeout_secs)

  def _wait_master_terminated(self):
    log('waiting for master to terminate')
    long_poll(self._poll_master_phase)

  def _poll_nvidia_driver_version(self):
    # Driver installer is expected to be installed externally.
    # See https://cloud.google.com/kubernetes-engine/docs/concepts/gpus#installing_drivers for GCP instructions.  # noqa: E501
    version_path = Path(NVIDIA_VERSION_PATH)
    if not version_path.exists():
      log(f'nvidia driver not found')
      return None
    version = version_path.read_text()
    log(f'nvidia version: {version}')
    return version

  def _poll_master_phase(self):
    phase = self._query_master_phase()
    log(f'{self.master} is in "{phase}" phase')
    if phase not in (PHASE_SUCCEEDED, PHASE_FAILED):
      return None
    return phase

  @api_retry
  def _query_master_phase(self):
    pod = self.api.read_namespaced_pod(self.master, self.namespace)
    return pod.status.phase

  def _download_data(self):
    if self.download_data_from and self.download_data_to:
      Path(self.download_data_to).mkdir(exist_ok=True)
      log(f'downloading data from {self.download_data_from} to '
          '{self.download_data_to}')
      s3_copy(self.download_data_from, self.download_data_to)

  def _upload_data(self):
    if self.upload_data_from and self.upload_data_to:
      if Path(self.upload_data_from).exists():
        log(f'uploading data from {self.upload_data_from} to '
            '{self.upload_data_to}')
        s3_copy(self.upload_data_from, self.upload_data_to)
