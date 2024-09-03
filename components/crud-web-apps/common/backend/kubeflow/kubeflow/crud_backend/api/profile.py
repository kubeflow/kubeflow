from kubernetes.config.config_exception import ConfigException
from . import custom_api

def get_all_profiles():
  # get cluster custom object profiles
  profile_list = custom_api.list_cluster_custom_object(
    group="kubeflow.org",
    version="v1beta1",
    plural="profiles",
  )
  return profile_list


def get_profile(profile_name):
  # get cluster custom object profile
  print("profile_name: ", profile_name)
  try:
    profile = custom_api.get_cluster_custom_object(
      group="kubeflow.org",
      version="v1beta1",
      plural="profiles",
      name=profile_name
    )
    return profile
  except:
    return None


