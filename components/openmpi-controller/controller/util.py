# -*- coding: utf-8 -*-
from kubernetes.client.rest import ApiException
from retrying import retry
from subprocess import Popen, PIPE

RETRY_MAX_ATTEMPTS = 5
RETRY_BACKOFF_MS = 1000
POLL_BACKOFF_MS = 10000

api_retry = retry(
    stop_max_attempt_number=RETRY_MAX_ATTEMPTS,
    wait_exponential_multiplier=RETRY_BACKOFF_MS,
    retry_on_exception=lambda e: isinstance(e, ApiException))


class S3Exception(Exception):
  pass


def log(msg):
  print(msg, flush=True)


def long_poll(poll_fn, timeout_secs=None):

  @retry(
      stop_max_delay=timeout_secs * 1000 if timeout_secs else None,
      wait_fixed=POLL_BACKOFF_MS,
      retry_on_exception=lambda _: False,
      retry_on_result=lambda result: not result)
  def poll_wrapper():
    return poll_fn()

  return poll_wrapper()


def exec_command(command):
  process = Popen(
      command, stdin=None, stdout=PIPE, stderr=PIPE, shell=True, close_fds=True)
  stdout, stderr = process.communicate()
  return process.returncode, stdout, stderr


@retry(
    stop_max_attempt_number=RETRY_MAX_ATTEMPTS,
    wait_exponential_multiplier=RETRY_BACKOFF_MS,
    retry_on_exception=lambda e: isinstance(e, S3Exception))
def s3_copy(copy_from, copy_to):
  exit_code, stdout, stderr = exec_command(
      f'aws s3 cp --recursive "{copy_from}" "{copy_to}"')
  if exit_code != 0:
    raise S3Exception(f's3 copy failed with exit code '
                      '{exit_code}:\nstdout:{stdout}\nstderr:{stderr}')
