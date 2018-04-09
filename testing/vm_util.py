"""Utilities for working with VMs as part of our tests."""

import datetime
import logging
import os
import subprocess
import time
import uuid

from kubeflow.testing import util

# TODO(jlewi): Should we move this to kubeflow/testing

def wait_for_vm(project, zone, vm, timeout=datetime.timedelta(minutes=5),
                polling_interval=datetime.timedelta(seconds=10)):
  """Wait for the VM to be ready. This is measured by trying to ssh into the VM.

    timeout: A datetime.timedelta expressing the amount of time to wait before
      giving up.
    polling_interval: A datetime.timedelta to represent the amount of time to
      wait between requests polling for the operation status.
  Raises:
    TimeoutError: if we timeout waiting for the operation to complete.
  """
  endtime = datetime.datetime.now() + timeout
  while True:
    try:
      util.run(["gcloud", "compute", "--project=" + project, "ssh",
                "--zone=" + zone, vm, "--", "echo hello world"])
      logging.info("VM is ready")
      return
    except subprocess.CalledProcessError:
      pass
    
    if datetime.datetime.now() > endtime:
      raise util.TimeoutError("Timed out waiting for VM to be sshable.")
    time.sleep(polling_interval.total_seconds())
     
def execute(project, zone, vm, commands):
  """Execute the supplied commands on the VM."""
  util.run(["gcloud", "compute", "--project=" + project, "ssh",
            "--zone=" + zone, vm, "--", " && ".join(commands)])
           
def execute_script(project, zone, vm, script):
  """Execute the specified script on the VM."""

  target_path = os.path.join("/tmp", os.path.basename(script) + "." + uuid.uuid4().hex[0:4])
  
  target = "{0}:{1}".format(vm, target_path)
  logging.info("Copying %s to %s", script, target)
  util.run(["gcloud", "compute", "--project=" + project, "scp",
            script, target, "--zone=" + zone])
  
  util.run(["gcloud", "compute", "--project=" + project, "ssh",
            "--zone=" + zone, vm, "--", "chmod a+rx " + target_path + " && " + target_path])  