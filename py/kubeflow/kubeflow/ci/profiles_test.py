"""Test profiles custom resource.

This file tests Profile custom resource creation and deletion.
Creation:
  Reads a profile.yaml file and creates profile using
  create_cluster_custom_object verifies Profile, namespace, serviceAccounts,
  rolebindings are available.
  Profile, namespace are with same names
  ServiceAccounts: "default-editor" and "default-viewer" are created
  Rolebindings: 'kubeflow-admin', 'kubeflow-edit', 'kubeflow-view'
                are present in the namespace

Deletion:
  Using delete_cluster_custom_object, delete profile
  verifies Profile and namespace no longer exist.
  For this ApiException is expected.

It is an integration test as it depends on having access to
a Kubeflow cluster with the custom resource test installed.

We use the pytest framework because
  1. It can output results in junit format for prow/gubernator
  2. It has good support for configuring tests using command line arguments
    (https://docs.pytest.org/en/latest/example/simple.html)
Python Path Requirements:
  kubeflow/testing/py - https://github.com/kubeflow/testing/tree/master/py
    * Provides utilities for testing

Manually running the test
  1. Configure your KUBECONFIG file to point to the desired cluster
"""

import logging
import time

import pytest
import yaml
from kubeflow.testing import util
from kubernetes import client as k8s_client
from kubernetes.client.rest import ApiException
from kubernetes.config import kube_config
from retrying import retry

GROUP = "kubeflow.org"
PLURAL = "profiles"
KIND = "Profile"
VERSION = "v1beta1"

logging.basicConfig(level=logging.INFO,
                    format=('%(levelname)s|%(asctime)s'
                            '|%(pathname)s|%(lineno)d| %(message)s'),
                    datefmt='%Y-%m-%dT%H:%M:%S',
                    )
logging.getLogger().setLevel(logging.INFO)


def deleteProfile(api_client, group, version, name):
    k8s_co = k8s_client.CustomObjectsApi(api_client)
    resp = k8s_co.delete_cluster_custom_object(
        group=group,
        version=version,
        plural=PLURAL,
        name=name,
        body=k8s_client.V1DeleteOptions(),
        grace_period_seconds=0)  # zero means delete immediately
    logging.info("Profile deleted:\n%s", yaml.safe_dump(resp))
    time.sleep(20)


def verifyProfileDeletion(api_client, group, version, name):
    k8s_co = k8s_client.CustomObjectsApi(api_client)
    status = '\"status\":\"Failure\",\"message\":'
    with pytest.raises(ApiException) as e:
        resp = k8s_co.get_cluster_custom_object(
            group=group,
            version=version,
            plural=PLURAL,
            name=name)
        logging.info(resp)
    logging.info("Expected exception %s\n", str(e.value))
    excMsg = '{0}\"{1}.{2} \\\"{3}\\\" not found\"'.format(
        status, PLURAL, GROUP, name)
    assert excMsg in str(e.value)

    coreV1 = k8s_client.CoreV1Api(api_client)
    with pytest.raises(ApiException) as e:
        resp = coreV1.read_namespace(name)
        logging.info(resp)
    logging.info("Expected exception %s\n", str(e.value))
    excMsg = '{0}\"{1} \\\"{2}\\\" not found\"'.format(
        status, 'namespaces', name)
    time.sleep(30)
    assert excMsg in str(e.value)


def verifyRolebindings(api_client, name):
    rbacV1 = k8s_client.RbacAuthorizationV1Api(api_client)
    rolebindingsList = rbacV1.list_namespaced_role_binding(
        namespace=name, watch=False)
    rb_dict = {}
    for i in rolebindingsList.items:
        rb_dict[i.role_ref.name] = i.metadata.name

    if {'kubeflow-admin', 'kubeflow-edit', 'kubeflow-view'} <= rb_dict.keys():
        logging.info("all default rolebindings are present\n")
    else:
        msg = "Default rolebindings {0}, {1}, {2} not found\n {3}".format(
            'kubeflow-admin', 'kubeflow-edit', 'kubeflow-view',
            rolebindingsList)
        logging.error(msg)
        raise RuntimeError(msg)


def verifyServiceAccounts(api_client, name):
    # Verify if serviceAccount's "default-editor" and "default-viewer" are
    # created in the 'name' namespace
    DEFAULT_EDITOR = "default-editor"
    DEFAULT_VIEWER = "default-viewer"
    foundDefEditor = False
    foundDefViewer = False

    coreV1 = k8s_client.CoreV1Api(api_client)
    saList = coreV1.list_namespaced_service_account(
        namespace=name, watch=False)
    for i in saList.items:
        saName = i.metadata.name
        if saName == DEFAULT_EDITOR:
            foundDefEditor = True
        elif saName == DEFAULT_VIEWER:
            foundDefViewer = True
        else:
            logging.info("found additional service account: %s\n", saName)
    if (not foundDefEditor) or (not foundDefViewer):
        msg = "Missing default service accounts {0}, {1}\n {2}".format(
            DEFAULT_EDITOR, DEFAULT_VIEWER, saList)
        logging.error(msg)
        raise RuntimeError(msg)


def verifyNamespaceCreation(api_client, name):
    # Verifies the namespace is created with profile 'name' specified.
    coreV1 = k8s_client.CoreV1Api(api_client)
    retry_read_namespace = retry(
        wait_exponential_multiplier=1000,
        wait_exponential_max=60000,  # 60 sec max
    )(coreV1.read_namespace)
    resp = retry_read_namespace(name)
    logging.info("found namespace: %s", resp)


def verifyProfileCreation(api_client, group, version, name):
    k8s_co = k8s_client.CustomObjectsApi(api_client)
    retry_read_profile = retry(
        wait_exponential_multiplier=1000,
        wait_exponential_max=60000,  # 60 sec max
    )(k8s_co.get_cluster_custom_object)
    resp = retry_read_profile(
        group=group,
        version=version,
        plural=PLURAL,
        name=name)
    logging.info(resp)


def createProfile(api_client, profileTestYamlFile):
    # The name of the profile, also the namespace's name.
    name = 'kubeflow-user1'

    with open(profileTestYamlFile) as params:
        wf_result = yaml.load(params)
        group, version = wf_result['apiVersion'].split('/')
        name = wf_result['metadata']['name']
        k8s_co = k8s_client.CustomObjectsApi(api_client)
        resp = k8s_co.create_cluster_custom_object(
            group=group,
            version=version,
            plural=PLURAL,
            body=wf_result)
        logging.info("Profile created:\n%s", yaml.safe_dump(resp))
    # Profiles status can be one of Succeeded, Failed, Unknown
    # TODO: check if status comes by using callbacks.
    time.sleep(20)
    return group, version, name


def test_profiles(
        record_xml_attribute,
        profileFile="test_data/profile_v1beta1_profile.yaml"):
    util.set_pytest_junit(record_xml_attribute, "test_profile_e2e")
    util.maybe_activate_service_account()
    # util.load_kube_config appears to hang on python3
    kube_config.load_kube_config()
    api_client = k8s_client.ApiClient()
    profileYamlFile = profileFile

    # Profile Creation
    group, version, name = createProfile(api_client, profileYamlFile)
    verifyProfileCreation(api_client, group, version, name)
    verifyNamespaceCreation(api_client, name)
    verifyServiceAccounts(api_client, name)
    verifyRolebindings(api_client, name)

    # Profile deletion
    deleteProfile(api_client, group, version, name)
    verifyProfileDeletion(api_client, group, version, name)


if __name__ == "__main__":
    logging.basicConfig(level=logging.INFO,
                        format=('%(levelname)s|%(asctime)s'
                                '|%(pathname)s|%(lineno)d| %(message)s'),
                        datefmt='%Y-%m-%dT%H:%M:%S',
                        )
    logging.getLogger().setLevel(logging.INFO)
    pytest.main()
