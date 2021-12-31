import yaml
import logging

log = logging.getLogger(__name__)

def load_param_yaml(f, **kwargs):
    """
    f: file path

    Load a yaml file and convert it to a python dict. The yaml might have some
    `{var}` values which the user will have to format. For this we first read
    the yaml file and replace these variables and then convert the generated
    string to a dict via the yaml module.
    """
    c = None
    try:
        with open(f, "r") as yaml_file:
            c = yaml_file.read().format(**kwargs)
    except IOError:
        log.error("Error opening: %s", f)
        return None

    try:
        contents = yaml.safe_load(c)
        if contents is None:
            # YAML exists but is empty
            return {}
        else:
            # YAML exists and is not empty
            return contents
    except yaml.YAMLError:
        return None


my_info = load_param_yaml("kafka_ephemeral.yaml", name="name", namespace="namespace")
print()