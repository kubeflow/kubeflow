import copy
import unittest

from apps.common import volumes
from kubernetes import client
from werkzeug import exceptions

PVC_NAME = "workspace_volume"

NEW_API_VOLUME = {
    "name": "workspace-volume",
    "mount": "/home/jovyan",
    "newPvc": {
        "metadata": {
            "name": PVC_NAME,
        },
        "spec": {
            "accessModes": ["ReadWriteOnce"],
            "resources": {
                "requests": {
                    "storage": "5Gi",
                },
            },
        },
    },
}

EXISTING_API_VOLUME = {
    "name": "workspace-volume",
    "mount": "/home/jovyan",
    "existingSource": {
        "persistentVolumeClaim": {
            "claimName": PVC_NAME,
        },
    },
}


class TestVolumeFormatChecking(unittest.TestCase):
    """Test the functionality of the check_volume_format function."""

    def setUp(self):
        """Create existing and new API Volume objects."""
        self.api_volume = copy.deepcopy(NEW_API_VOLUME)
        self.api_volume[volumes.EXISTING_SOURCE] = {}

    def test_both_new_pvc_and_existing_source(self):
        """Raise an exception if both newPvc and existingSource are found."""
        with self.assertRaises(exceptions.BadRequest):
            volumes.check_volume_format(self.api_volume)

    def test_missing_both_new_pvc_and_existing_source(self):
        """Raise an exception if no newPvc or existingSource is found."""
        del self.api_volume[volumes.NEW_PVC]
        del self.api_volume[volumes.EXISTING_SOURCE]
        with self.assertRaises(exceptions.BadRequest):
            volumes.check_volume_format(self.api_volume)

    def test_missing_mount(self):
        """Raise an error if no mount is found."""
        del self.api_volume[volumes.MOUNT]
        with self.assertRaises(exceptions.BadRequest):
            volumes.check_volume_format(self.api_volume)


class TestGetVolumeName(unittest.TestCase):
    """Test the functionality of the get_volume_name function."""

    def setUp(self):
        """Create existing and new API Volume objects."""
        self.api_volume_new = copy.deepcopy(NEW_API_VOLUME)
        self.api_volume_existing = copy.deepcopy(EXISTING_API_VOLUME)

    def test_should_not_work_on_new_pvc(self):
        """Return the name of the PVC, if one is provided."""
        with self.assertRaises(exceptions.BadRequest):
            volumes.get_volume_name(self.api_volume_new)

    def test_get_name_of_pvc(self):
        """Return the name of the PVC, if one is provided."""
        self.assertEqual(volumes.get_volume_name(self.api_volume_existing),
                         PVC_NAME)

    def test_non_pvc_source_name(self):
        """Return a generic name in case of non-pvc source."""
        del self.api_volume_existing["existingSource"]["persistentVolumeClaim"]

        self.api_volume_existing["nfs"] = {"address": "127.0.0.1"}
        volume_name = volumes.get_volume_name(self.api_volume_existing)
        self.assertIn("existing-source-volume", volume_name)


class TestGetPodVolume(unittest.TestCase):
    """Test the functionality of the get_pod_volume function."""

    def setUp(self):
        """Create existing and new API Volume objects."""
        self.api_volume_new = copy.deepcopy(NEW_API_VOLUME)
        self.api_volume_existing = copy.deepcopy(EXISTING_API_VOLUME)

    def test_use_pvc_name_in_volume_source(self):
        """Use the PVC name and PVC source, when a PVC is provided."""
        pvc = client.V1PersistentVolumeClaim(
            metadata=client.V1ObjectMeta(name=PVC_NAME),
        )

        v1_volume = volumes.get_pod_volume(self.api_volume_existing, pvc)
        self.assertDictEqual(v1_volume, {
            "name": PVC_NAME,
            "persistentVolumeClaim": {
                "claimName": PVC_NAME,
            },
        })
