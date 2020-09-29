from . import storage_api


# @auth.needs_authorization("list", "storage.k8s.io", "v1", "storageclasses")
# NOTE(kimwnasptd): This function is only used from the backend in order to
# determine if a default StorageClass is set. Currently, the role aggregation
# does not use a ClusterRoleBinding, thus we can't currently give this
# permission to a user. The backend does not expose any endpoint that would
# allow an unauthorized user to list the storage classes using this function.
def list_storageclasses():
    return storage_api.list_storage_class()
