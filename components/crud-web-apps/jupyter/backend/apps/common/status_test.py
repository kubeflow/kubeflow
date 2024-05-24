import unittest

from apps.common import status


class TestStatusFromContainerState(unittest.TestCase):
    """Test the different cases of status from containerState"""

    def test_terminating_container_state(self):
        container_state = {
            "status": {
                "containerState": {
                    "terminating": {}
                }
            }
        }

        self.assertEqual(
            status.get_status_from_container_state(container_state),
            (None, None)
        )

    def test_ready_container_state(self):
        container_state = {
            "status": {
                "containerState": {
                    "running": {}
                }
            }
        }

        self.assertEqual(
            status.get_status_from_container_state(container_state),
            (None, None)
        )

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
             "PodInitializing: No available message for container state.")
        )
