#!/usr/bin/env python3

import os
import logging
from googleapiclient import discovery
from oauth2client.client import GoogleCredentials
from kubeflow.testing import util


def must_getenv(name):
    value = os.getenv(name)
    if not name:
        logging.fatal("Environment variable %s is not set", name)
        raise ValueError()
    return value


if __name__ == "__main__":

    util.run([
        "gcloud", "auth", "activate-service-account", "--key-file",
        must_getenv("GOOGLE_APPLICATION_CREDENTIALS")
    ])

    cluster_name = "kfctl-arr-" + must_getenv("REPO_NAME") + "-" + must_getenv("BUILD_ID")
    credentials = GoogleCredentials.get_application_default()
    service = discovery.build('container', 'v1', credentials=credentials, cache_discovery=False)
    util.delete_cluster(service, cluster_name, "kubeflow-ci", "us-central1-a")