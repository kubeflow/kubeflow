from pathlib import Path
from time import sleep

from kubernetes import client, config
from kubernetes.client.rest import ApiException
from kubernetes.config.config_exception import ConfigException
from retrying import retry

SIG_DIR = '.openmpi-controller'
SIG_TERM = f'{SIG_DIR}/term.sig'
POLL_STATUS_INTERVAL = 10
TERMINATED_PHASES = ('Succeeded', 'Failed')


class Controller:
    """
    Controller is a sidecar container that extends the "main" container (openmpi-job).
    It communicates with the main container using a shared volume mounted at the working directory.
    Right before it finishes its work, it creates a semaphore file "term.sig" to signal the main container to terminate.
    """

    def __init__(self, namespace, master):
        self.namespace = namespace
        self.master = master
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
        Path(SIG_TERM).touch()

    def wait_master_terminated(self):
        while True:
            phase = self._get_master_phase()
            log(f'{self.master} is in "{phase}" phase')
            if phase in TERMINATED_PHASES:
                break

            sleep(POLL_STATUS_INTERVAL)

    @retry(stop_max_attempt_number=5,
           wait_exponential_multiplier=1000,
           retry_on_exception=lambda e: isinstance(e, ApiException))
    def _get_master_phase(self):
        pod = self.api.read_namespaced_pod(self.master, self.namespace)
        return pod.status.phase


def log(msg):
    print(msg, flush=True)
