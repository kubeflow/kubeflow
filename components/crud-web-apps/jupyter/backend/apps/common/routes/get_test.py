from dataclasses import dataclass
from unittest import TestCase

from .get import read_pod_defaults


@dataclass
class Lister:
    _data: dict

    def list_poddefaults(self, namespace):
        return self._data[namespace]


class TestListPodDefaults(TestCase):

    def test_read_pod_defaults(self):

        namespaces = {
            "foo": {
                "items": [{
                    "metadata": {
                        "name": "add-foo"
                    },
                    "spec": {
                        "desc": "apply foo",
                        "selector": {
                            "matchLabels": {
                                "foo": "true",
                            }
                        }
                    }
                }, {
                    "metadata": {
                        "name": "add-bar",
                    },
                    "spec": {
                        "desc": "apply bar",
                        "selector": {
                            "matchLabels": {
                                "bar": "true",
                            }
                        }
                    }
                }]
            }
        }

        content = read_pod_defaults("foo", client=Lister(namespaces))
        self.assertEqual(content, [
            {
                "label": "foo",
                "desc": "apply foo",
                "metadata": {
                    "name": "add-foo"
                },
                "spec": {
                    "desc": "apply foo",
                    "selector": {
                        "matchLabels": {
                            "foo": "true",
                        }
                    }
                }
            }, {
                "label": "bar",
                "desc": "apply bar",
                "metadata": {
                    "name": "add-bar",
                },
                "spec": {
                    "desc": "apply bar",
                    "selector": {
                        "matchLabels": {
                            "bar": "true",
                        }
                    }
                }
            }
        ])

    def test_read_pod_defaults_defaults_to_name_for_description(self):
        pod_defaults = {
            "foo": {
                "items": [{
                    "metadata": {
                        "name": "add-bar",
                    },
                    "spec": {
                        "selector": {
                            "matchLabels": {
                                "bar": "true",
                            }
                        }
                    }
                }]
            }
        }

        content = read_pod_defaults("foo", client=Lister(pod_defaults))
        self.assertEqual(content, [{
                "label": "bar",
                "desc": "add-bar",
                "metadata": {
                    "name": "add-bar",
                },
                "spec": {
                    "selector": {
                        "matchLabels": {
                            "bar": "true",
                        }
                    }
                }
            }])

    def test_read_pod_defaults_ignores_pod_defaults_without_match_labels(self):
        pod_defaults = {
            "foo": {
                "items": [{
                    "metadata": {
                        "name": "add-env",
                    },
                    "spec": {
                        "selector": {
                            "matchExpressions": [
                                {"key": "notebook-name", "operator": "Exists"}
                            ]
                        },
                        "env": [{
                            "name": "PIP_CONFIG_FILE",
                            "value": "/var/run/example.org/pip.conf",
                        }]
                    }
                }, {
                    "metadata": {
                        "name": "add-bar",
                    },
                    "spec": {
                        "selector": {
                            "matchLabels": {
                                "bar": "true",
                            }
                        },
                        "env": [{
                            "name": "BAR",
                            "value": "bar",
                        }]
                    }
                }, {
                    "metadata": {
                        "name": "append-volume",
                    },
                    "spec": {
                        "selector": {
                            "matchLabels": {}
                        },
                        "volumes": [{
                            "name": "shm",
                            "emptyDir": {},
                        }]
                    }
                }]
            }
        }

        content = read_pod_defaults("foo", client=Lister(pod_defaults))
        self.assertEqual(content, [{
            "label": "bar",
            "desc": "add-bar",
            "metadata": {
                "name": "add-bar",
            },
            "spec": {
                "selector": {
                    "matchLabels": {
                        "bar": "true",
                    }
                },
                "env": [{
                    "name": "BAR",
                    "value": "bar",
                }]
            }
        }])
