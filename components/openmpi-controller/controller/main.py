from argparse import ArgumentParser
from pathlib import Path
from time import sleep

from kubernetes import client, config
from kubernetes.client.rest import ApiException
from kubernetes.config.config_exception import ConfigException

SIG_DIR = '.openmpi-controller'
SIG_TERM = f'{SIG_DIR}/term.sig'
POD_MASTER = 'openmpi-master'
POLL_STATUS_INTERVAL = 10
TERMINATED_PHASES = ('Succeeded', 'Failed')


def main():
    parser = ArgumentParser()
    parser.add_argument('--namespace', type=str, required=True)
    args = parser.parse_args()

    Path(SIG_DIR).mkdir()

    try:
        try:
            config.load_incluster_config()
        except ConfigException:
            config.load_kube_config()

        api = client.CoreV1Api()
        wait_master_terminated(api, args.namespace)
    finally:
        Path(SIG_TERM).touch()
        log('controller terminated')


def wait_master_terminated(api, namespace):
    while True:
        sleep(POLL_STATUS_INTERVAL)

        try:
            pod = api.read_namespaced_pod(POD_MASTER, namespace)
        except ApiException as e:
            if e.status == 404:
                log(f'{POD_MASTER} not found')
                continue
            raise

        phase = pod.status.phase
        log(f'{POD_MASTER} is in "{phase}" phase')
        if phase in TERMINATED_PHASES:
            return


def log(msg):
    print(msg, flush=True)


if __name__ == '__main__':
    main()
