import unittest

from apps.common import status


class TestStatusFromContainerState(unittest.TestCase):
    """Test the different cases of status from containerState"""

    def test_terminating_container_state(self):
        container_state = {"status": {"containerState": {"terminating": {}}}}

        self.assertEqual(
            status.get_status_from_container_state(container_state),
            (None, None))

    def test_ready_container_state(self):
        container_state = {"status": {"containerState": {"running": {}}}}

        self.assertEqual(
            status.get_status_from_container_state(container_state),
            (None, None))

    def test_no_message_container_state(self):
        container_state = {
            "status": {
                "containerState": {
                    "waiting": {
                        "reason": "PodInitializing",
                    }
                }
            }
        }

        self.assertEqual(
            status.get_status_from_container_state(container_state),
            ("warning",
             "PodInitializing: No available message for container state."))


class TestStatusFromConditions(unittest.TestCase):
    """Test the different cases of status from conditions"""

    def test_no_conditions(self):
        conditions = {}

        self.assertEqual(status.get_status_from_conditions(conditions),
                         (None, None))

    def test_no_reason_conditions(self):
        conditions = {
            "status": {
                "conditions": [{
                    "status": "True",
                    "type": "Initialized",
                }]
            }
        }

        self.assertEqual(status.get_status_from_conditions(conditions),
                         (None, None))

    def test_conditions_with_reason_and_message(self):
        conditions = {
            "status": {
                "conditions": [{
                    "status": "False",
                    "type": "Warning",
                    "reason": "FailedScheduling",
                    "message": "0/1 nodes are available."
                }]
            }
        }

        self.assertEqual(
            status.get_status_from_conditions(conditions),
            ("warning", "FailedScheduling: 0/1 nodes are available."))

    def test_conditions_with_reason_no_message(self):
        conditions = {
            "status": {
                "conditions": [{
                    "status": "False",
                    "type": "Ready",
                    "reason": "PodFailed",
                }]
            }
        }

        self.assertEqual(status.get_status_from_conditions(conditions),
                         ("warning", "PodFailed: No available message."))
